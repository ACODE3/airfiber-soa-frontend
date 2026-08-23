import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientCard from "../components/ClientCard";

function MainPage() {
  const { cno } = useParams();
  const { stoken } = useParams();

  const [searchCno, setSearchCno] = useState(cno || "");
  const [searchStoken, setSearchStoken] = useState(stoken || "");

  const [client, setClient] = useState(null);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState(
  cno && stoken ? `${cno} ${stoken}` : ""
);


  async function handleSearchClient(cnoToSearch = searchCno, stokenToSearch = searchStoken) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search-client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cno: cnoToSearch,
          stoken: stokenToSearch,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setClient(null);
        setError(data.message || "Client not found");
        return;
      }

      setClient(data);
      setError("");
    } catch (err) {
      setClient(null);
      setError("Something went wrong.");
      console.log(err);
    }
  }

  useEffect(() => {
    if (cno && stoken) {
      setSearchCno(cno);
      setSearchStoken(stoken);
      handleSearchClient(cno, stoken);
    }
  }, [cno, stoken]);

  return (
    <main className="p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold text-slate-800">
            <span class="text-blue-500">AIRFIBER</span> Statement of Account
          </h1>

          <div className="w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const [cnoInput, stokenInput] = searchText.trim().split(/\s+/);

                handleSearchClient(cnoInput, stokenInput);
              }}
              className="flex w-full gap-2"
            >
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter CNO and token"
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-700">
              {error}
            </p>
          )}
        </div>

        {client && <ClientCard client={client} />}
      </div>
    </main>
  );
}

export default MainPage;