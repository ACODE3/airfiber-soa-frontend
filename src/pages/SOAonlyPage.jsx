import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StatementView from "../components/soa/StatementView";

const API_URL = import.meta.env.VITE_API_URL;

// Public, no login. There is no search box: the URL itself is the key.
// Customers open their personal link (e.g. /main/IM-435/DELMUNDO) and the
// statement loads. Access is gated server-side by the secret token in the URL.
function SOAonlyPage() {
  const { cno, stoken } = useParams();

  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(cno && stoken));

  const lookup = useCallback(async (accountNo, token) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/search-client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cno: accountNo, stoken: token }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment and open your link again."
          );
        }
        if (response.status === 404) {
          throw new Error(
            "This statement link is invalid or has expired. Please use the latest link AIRFIBER sent you."
          );
        }
        throw new Error(
          data.message ||
            "Something went wrong loading your statement. Please try again shortly."
        );
      }

      setClient(data);
    } catch (err) {
      setClient(null);
      setError(
        err.message ||
          "Something went wrong loading your statement. Please try again shortly."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (cno && stoken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      lookup(cno, stoken);
    }
  }, [cno, stoken, lookup]);

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {!cno || !stoken ? (
          <Notice
            title="Open your statement link"
            body="This page opens from the personal link AIRFIBER sends you (it looks like /main/YOUR-ACCOUNT/CODE). Please use that link to view your Statement of Account."
          />
        ) : loading ? (
          <Notice title="Loading your statement…" body="One moment." />
        ) : error ? (
          <Notice title="Statement unavailable" body={error} tone="error" />
        ) : client ? (
          <StatementView client={client} />
        ) : null}
      </div>
    </div>
  );
}

function Notice({ title, body, tone = "info" }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm ${
        tone === "error" ? "border-red-200" : "border-slate-200"
      }`}
    >
      <p className="text-sm font-semibold tracking-wide text-blue-600">
        AIRFIBER · Statement of Account
      </p>
      <h1 className="mt-1 text-xl font-bold text-slate-900">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{body}</p>
    </div>
  );
}

export default SOAonlyPage;
