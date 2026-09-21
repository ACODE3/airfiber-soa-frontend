import { useCallback, useEffect, useRef, useState } from "react";

import StatCard from "../../components/dashboard/StatCard";
import Icon from "../../components/dashboard/Icon";
import { apiGet, apiPost } from "../../lib/api";

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
function relativeTime(value) {
  if (!value) return "never";
  const diff = Date.now() - new Date(value).getTime();
  if (diff < 0) return "just now";
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function fmtDuration(ms) {
  if (ms == null) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function fmtDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

const RUN_STATUS_BADGE = {
  running: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
};

function RunStatusBadge({ status }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        RUN_STATUS_BADGE[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// page
// ---------------------------------------------------------------------------
export default function SoaSyncPage() {
  const [status, setStatus] = useState(null);
  const [runs, setRuns] = useState([]);
  const [loadError, setLoadError] = useState("");

  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [syncError, setSyncError] = useState("");

  const [autoBusy, setAutoBusy] = useState(false);
  const [autoError, setAutoError] = useState("");

  // client preview
  const [query, setQuery] = useState("");
  const [clients, setClients] = useState([]);
  const [searching, setSearching] = useState(false);
  const [expanded, setExpanded] = useState(null); // { cno, client, loading }

  const pollRef = useRef(null);

  const refresh = useCallback(async () => {
    const [statusRes, runsRes] = await Promise.all([
      apiGet("/api/soa/status"),
      apiGet("/api/soa/runs?limit=15"),
    ]);
    setStatus(statusRes);
    setRuns(runsRes.runs || []);
    return statusRes;
  }, []);

  // initial load. `refresh` only sets state after an awaited fetch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh().catch((err) => setLoadError(err.message));
  }, [refresh]);

  // poll while a sync is running (locally triggered or picked up from status)
  const isRunning = syncing || status?.running;
  useEffect(() => {
    if (!isRunning) return undefined;
    pollRef.current = setInterval(() => {
      refresh().catch(() => {});
    }, 3000);
    return () => clearInterval(pollRef.current);
  }, [isRunning, refresh]);

  // debounced client search
  useEffect(() => {
    const handle = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await apiGet(
          `/api/soa/clients?limit=50${query.trim() ? `&q=${encodeURIComponent(query.trim())}` : ""}`
        );
        setClients(res.clients || []);
      } catch {
        setClients([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [query]);

  async function handleSync() {
    setSyncing(true);
    setSyncError("");
    setSyncResult(null);
    try {
      const { run } = await apiPost("/api/soa/sync");
      setSyncResult(run);
      await refresh();
    } catch (err) {
      setSyncError(
        err.status === 409 ? "A sync is already running." : err.message
      );
    } finally {
      setSyncing(false);
    }
  }

  async function handleAuto(action) {
    setAutoBusy(true);
    setAutoError("");
    try {
      await apiPost(`/api/soa/auto/${action}`);
      await refresh();
    } catch (err) {
      setAutoError(err.message);
    } finally {
      setAutoBusy(false);
    }
  }

  async function toggleClient(cno) {
    if (expanded?.cno === cno) {
      setExpanded(null);
      return;
    }
    setExpanded({ cno, client: null, loading: true });
    try {
      const { client } = await apiGet(`/api/soa/clients/${encodeURIComponent(cno)}`);
      setExpanded({ cno, client, loading: false });
    } catch {
      setExpanded({ cno, client: null, loading: false });
    }
  }

  // --- render --------------------------------------------------------------
  if (loadError) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        Could not load the Statement of Account dashboard: {loadError}
      </p>
    );
  }

  if (!status) {
    return <p className="text-sm text-slate-400">Loading…</p>;
  }

  const sheetsReady = status.configured?.sheets;
  const dbReady = status.configured?.db;
  const last = status.lastRun;
  const auto = status.auto || { active: false, cron: "" };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Statement of Account sync
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Syncs client and billing rows from the Google Sheet into MongoDB.
          This data powers the public Statement of Account lookup.
        </p>
      </div>

      {!sheetsReady && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Google Sheets is not configured on the server
          (SPREADSHEET_ID / GOOGLE_CREDENTIALS_BASE64). Syncing is disabled
          until those are set.
        </p>
      )}
      {!dbReady && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          The database connection is not ready yet.
        </p>
      )}

      {/* stat row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Clients in database"
          value={status.totals?.clients ?? 0}
          icon="user"
          accent="blue"
        />
        <StatCard
          label="Last sync"
          value={relativeTime(last?.finishedAt || last?.startedAt)}
          icon="clock"
          accent="violet"
          hint={last ? `${last.trigger}${last.triggeredBy ? ` · ${last.triggeredBy}` : ""}` : undefined}
        />
        <StatCard
          label="Saved (last run)"
          value={last?.saved ?? 0}
          icon="check"
          accent="green"
        />
        <StatCard
          label="Skipped (last run)"
          value={last?.skipped ?? 0}
          icon="document"
          accent="amber"
          hint={last?.errorCount ? `${last.errorCount} errors` : undefined}
        />
      </div>

      {/* actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* manual */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800">Manual sync</h3>
          <p className="mt-1 text-sm text-slate-500">
            Pull the sheet now and upsert every client row.
          </p>

          <button
            onClick={handleSync}
            disabled={!sheetsReady || syncing || status.running}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icon name="progress" className="h-4 w-4" />
            {syncing || status.running ? "Syncing…" : "Run sync now"}
          </button>

          {syncError && (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-700">
              {syncError}
            </p>
          )}

          {syncResult && (
            <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <p className="font-medium text-slate-800">
                {syncResult.status === "success" ? "Sync complete" : "Sync finished with errors"}
              </p>
              <p className="mt-1">
                {syncResult.saved} saved · {syncResult.skipped} skipped ·{" "}
                {syncResult.errorCount} errors · {fmtDuration(syncResult.durationMs)}
              </p>
              {syncResult.staleInDb > 0 && (
                <p className="mt-1 text-xs text-slate-500">
                  {syncResult.staleInDb} client(s) in the database were not in the
                  sheet (left untouched).
                </p>
              )}
              {syncResult.sampleErrors?.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-xs text-red-600">
                  {syncResult.sampleErrors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* automatic */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800">Automatic sync</h3>
          <p className="mt-1 text-sm text-slate-500">
            Runs on a schedule ({auto.cron || "—"}). The setting is remembered
            across server restarts.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                auto.active
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {auto.active ? "Active" : "Stopped"}
            </span>

            {auto.active ? (
              <button
                onClick={() => handleAuto("stop")}
                disabled={autoBusy}
                className="rounded-lg bg-slate-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={() => handleAuto("start")}
                disabled={autoBusy || !sheetsReady}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Start
              </button>
            )}
          </div>

          {autoError && (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-700">
              {autoError}
            </p>
          )}
        </div>
      </div>

      {/* recent runs */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-800">Sync history</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Started</th>
                <th className="px-4 py-3">Trigger</th>
                <th className="px-4 py-3">By</th>
                <th className="px-4 py-3">Saved</th>
                <th className="px-4 py-3">Skipped</th>
                <th className="px-4 py-3">Errors</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {runs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    No syncs yet.
                  </td>
                </tr>
              ) : (
                runs.map((run) => (
                  <tr key={run._id}>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {fmtDateTime(run.startedAt)}
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600">
                      {run.trigger}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {run.triggeredBy || "—"}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {run.saved ?? 0}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {run.skipped ?? 0}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {run.errorCount ?? 0}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {fmtDuration(run.durationMs)}
                    </td>
                    <td className="px-4 py-3">
                      <RunStatusBadge status={run.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* client preview */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-800">
          Client preview
        </h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by account number or name…"
          className="mb-3 w-full max-w-sm rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Name</th>
                <th className="hidden px-4 py-3 sm:table-cell">Plan</th>
                <th className="px-4 py-3">This month due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {searching && clients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                    Searching…
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                    No clients{query.trim() ? " match that search" : " synced yet"}.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <ClientRow
                    key={client.cno}
                    client={client}
                    expanded={expanded?.cno === client.cno ? expanded : null}
                    onToggle={() => toggleClient(client.cno)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// client row + its expandable billing table
// ---------------------------------------------------------------------------
function ClientRow({ client, expanded, onToggle }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer transition hover:bg-slate-50"
      >
        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">
          {client.cno}
        </td>
        <td className="px-4 py-3 text-slate-600">{client.name || "—"}</td>
        <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
          {client.plan || "—"}
        </td>
        <td className="px-4 py-3 text-slate-600">{client.thisMonthDue || "—"}</td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={4} className="bg-slate-50 px-4 py-4">
            {expanded.loading ? (
              <p className="text-sm text-slate-400">Loading billing history…</p>
            ) : !expanded.client ? (
              <p className="text-sm text-red-600">Could not load this client.</p>
            ) : (
              <BillingHistory client={expanded.client} />
            )}
          </td>
        </tr>
      )}
    </>
  );
}

function BillingHistory({ client }) {
  const entries = Object.entries(client.billings || {}).sort(([a], [b]) =>
    a < b ? 1 : -1
  );

  return (
    <div>
      <div className="mb-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
        <span>
          <span className="text-slate-400">Cellphone: </span>
          {client.cellphone || "—"}
        </span>
        <span>
          <span className="text-slate-400">Install date: </span>
          {client.insDate || "—"}
        </span>
        <span>
          <span className="text-slate-400">GCash code: </span>
          {client.gcashCode || "—"}
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-slate-400">No billing history.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-100 text-left text-xs font-semibold text-slate-600">
              <tr>
                <th className="px-3 py-2">Month</th>
                <th className="px-3 py-2">Amount paid</th>
                <th className="px-3 py-2">Date paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.map(([month, billing]) => (
                <tr key={month}>
                  <td className="px-3 py-2 text-slate-600">{month}</td>
                  <td className="px-3 py-2 text-slate-600">
                    {billing.amountPaid || "—"}
                  </td>
                  <td className="px-3 py-2 text-slate-600">
                    {billing.datePaid || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
