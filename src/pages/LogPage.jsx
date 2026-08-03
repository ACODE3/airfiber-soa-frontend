import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Handles button event
  async function handleSubmit(event) {
  event.preventDefault();

  setMessage("");
  setIsLoading(true);

  try {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    sessionStorage.setItem("token", data.token);

    setMessage("Login successful");
      navigate("/admin");
  } catch (error) {
    console.error("Login failed:", error);
    setMessage(error.message);
  } finally {
    setIsLoading(false);
  }
}


// =====================================================================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-200">
      <form
        onSubmit={handleSubmit}
        className="w-80 rounded-md bg-white/80 p-6"
      >
        <h1 className="mb-4 text-2xl font-bold text-blue-600">
          AirFiber Admin Login
        </h1>

        <label>Username</label>

        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mb-4 mt-1 w-full border p-2"
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mb-4 mt-1 w-full border p-2"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className="mt-3 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default LogPage;