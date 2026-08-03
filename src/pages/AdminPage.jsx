import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState(
    "Checking admin access..."
  );
  const [statusType, setStatusType] = useState("info");
  const [loadingAction, setLoadingAction] = useState("");

  function getToken() {
    return sessionStorage.getItem("token");
  }

  async function sendSyncRequest(
    endpoint,
    actionName,
    loadingMessage,
    fallbackMessage
  ) {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    setLoadingAction(actionName);
    setStatusType("info");
    setStatusMessage(loadingMessage);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || fallbackMessage);
      }

      setStatusType("success");
      setStatusMessage(data.message || fallbackMessage);
    } catch (error) {
      console.error(`${actionName} error:`, error);

      setStatusType("error");
      setStatusMessage(error.message || "Something went wrong.");
    } finally {
      setLoadingAction("");
    }
  }

  function handleManualSync() {
    sendSyncRequest(
      "/api/manual/sync-clients",
      "manual",
      "Running manual client sync...",
      "Manual synchronization completed."
    );
  }

  function handleStartAutomaticSync() {
    sendSyncRequest(
      "/api/automatic/sync-clients",
      "start",
      "Starting automatic synchronization...",
      "Automatic synchronization started."
    );
  }

  function handleStopAutomaticSync() {
    sendSyncRequest(
      "/api/automatic/sync-clients/stop",
      "stop",
      "Stopping automatic synchronization...",
      "Automatic synchronization stopped."
    );
  }

  function handleDestroyAutomaticSync() {
    sendSyncRequest(
      "/api/automatic/sync-clients/destroy",
      "destroy",
      "Destroying automatic synchronization task...",
      "Automatic synchronization task destroyed."
    );
  }

  useEffect(() => {
    async function checkAdmin() {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Access denied.");
        }

        setUser(data.user);
        setStatusType("success");
        setStatusMessage(data.message || "Admin access confirmed.");
      } catch (error) {
        console.error("Admin verification error:", error);

        if (response.status === 401 || response.status === 403) {
                sessionStorage.removeItem("token");
                navigate("/login");
                return;
              }

              if (!response.ok) {
                throw new Error(data.message || "Server error.");
              }
      }
    }

    checkAdmin();
  }, [navigate]);

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  const statusStyles = {
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  const isLoading = loadingAction !== "";

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Page</h1>

      {user && (
        <div className="mb-4 rounded border p-4">
          <p>User ID: {user.id}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <div
        className={`mb-4 rounded p-3 ${
          statusStyles[statusType] || statusStyles.info
        }`}
      >
        <p className="font-semibold">System Log</p>
        <p>{statusMessage}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleManualSync}
          disabled={isLoading}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loadingAction === "manual" ? "Syncing..." : "Manual Sync"}
        </button>

        <button
          type="button"
          onClick={handleStartAutomaticSync}
          disabled={isLoading}
          className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loadingAction === "start" ? "Starting..." : "Start Automatic"}
        </button>

        <button
          type="button"
          onClick={handleStopAutomaticSync}
          disabled={isLoading}
          className="rounded bg-yellow-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loadingAction === "stop" ? "Stopping..." : "Stop Automatic"}
        </button>

        <button
          type="button"
          onClick={handleDestroyAutomaticSync}
          disabled={isLoading}
          className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loadingAction === "destroy" ? "Destroying..." : "Destroy Task"}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="rounded bg-gray-700 px-4 py-2 text-white disabled:opacity-50"
        >
          Logout
        </button>
      </div>
    </main>
  );
}

export default AdminPage;