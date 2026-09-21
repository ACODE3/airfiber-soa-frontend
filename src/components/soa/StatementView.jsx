import { useMemo, useState } from "react";

// ---------------------------------------------------------------------------
// formatting helpers (display only - the stored keys/values never change)
// ---------------------------------------------------------------------------
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-07" -> "Jul 2026". Also tolerates the legacy "2026_July" shape.
function monthLabel(key) {
  const num = /^(\d{4})[-_](\d{1,2})$/.exec(key);
  if (num) return `${MONTHS[Number(num[2]) - 1] || num[2]} ${num[1]}`;
  const word = /^(\d{4})[-_]([A-Za-z]+)$/.exec(key);
  if (word) return `${word[2].slice(0, 3)} ${word[1]}`;
  return key;
}

function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// "1198" -> "₱1,198"; "0" -> "₱0"; "" -> null; "NEW MAY" -> "NEW MAY"
function peso(value) {
  const raw = String(value ?? "").trim();
  if (raw === "") return null;
  const n = Number(raw.replace(/[₱,\s]/g, ""));
  if (!Number.isFinite(n)) return raw;
  return `₱${n.toLocaleString("en-PH", { maximumFractionDigits: 2 })}`;
}

function ordinal(value) {
  const n = Number(String(value).trim());
  if (!Number.isFinite(n)) return String(value);
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

function hasActivity(billing) {
  return (
    String(billing?.amountPaid ?? "").trim() !== "" ||
    String(billing?.datePaid ?? "").trim() !== ""
  );
}

// ---------------------------------------------------------------------------
function InfoTile({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-semibold text-slate-800">{value || "—"}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
export default function StatementView({ client }) {
  const [showAll, setShowAll] = useState(false);
  const thisMonth = currentMonthKey();

  const allRows = useMemo(() => {
    return Object.entries(client.billings || {})
      .map(([key, billing]) => ({ key, billing }))
      .sort((a, b) => (a.key < b.key ? -1 : 1));
  }, [client.billings]);

  // Hide the run of empty months before the first real payment. The current
  // month and anything after it always stays visible.
  const collapsedRows = useMemo(() => {
    const firstActive = allRows.findIndex((r) => hasActivity(r.billing));
    const currentIdx = allRows.findIndex((r) => r.key >= thisMonth);
    const candidates = [firstActive, currentIdx].filter((i) => i !== -1);
    const cut = candidates.length ? Math.min(...candidates) : 0;
    return allRows.slice(Math.max(cut, 0));
  }, [allRows, thisMonth]);

  const rows = showAll ? allRows : collapsedRows;
  const hiddenCount = allRows.length - collapsedRows.length;
  const canToggle = hiddenCount > 0;
  const dueText = peso(client.thisMonthDue);
  const generated = new Date().toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-5">
      {/* header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-blue-600">
          AIRFIBER · Statement of Account
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          {client.name || client.cno}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Account {client.cno} · Generated {generated}
        </p>
      </div>

      {/* amount due - the one number this page exists for */}
      <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm">
        <p className="text-sm font-medium text-blue-100">
          Amount due this month
        </p>
        <p className="mt-1 text-4xl font-bold tracking-tight">
          {dueText ?? "—"}
        </p>
        {String(client.due || "").trim() !== "" && (
          <p className="mt-1 text-sm text-blue-100">
            Due on the {ordinal(client.due)} of each month
          </p>
        )}
      </div>

      {/* account details */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <InfoTile label="Account no." value={client.cno} />
        <InfoTile label="Plan" value={client.plan} />
        <InfoTile label="Install date" value={client.insDate} />
        <InfoTile label="Facebook name" value={client.fbName} />
        <InfoTile label="Cellphone" value={client.cellphone} />
        <InfoTile label="GCash code" value={client.gcashCode} />
      </div>

      {/* billing history */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Billing history
          </h2>
          {canToggle && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              {showAll
                ? "Hide empty months"
                : `Show all months (${hiddenCount} hidden)`}
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Month</th>
                <th className="px-5 py-3 text-right">Amount paid</th>
                <th className="px-5 py-3">Date paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-8 text-center text-slate-400"
                  >
                    No billing history yet.
                  </td>
                </tr>
              ) : (
                rows.map(({ key, billing }) => {
                  const isCurrent = key === thisMonth;
                  const amount = peso(billing.amountPaid);
                  const date = String(billing.datePaid ?? "").trim();
                  return (
                    <tr
                      key={key}
                      className={isCurrent ? "bg-blue-50" : undefined}
                    >
                      <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                        {monthLabel(key)}
                        {isCurrent && (
                          <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                            current
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums text-slate-700">
                        {amount ?? <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        {date || <span className="text-slate-300">—</span>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        Amounts and dates are shown exactly as recorded. Questions about your
        bill? Message the AIRFIBER page.
      </p>
    </div>
  );
}
