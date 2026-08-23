import Info from "./Info";

function ClientCard({ client }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">{client.name}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Info label="CNO" value={client.cno} />
        <Info label="Plan" value={client.plan} />
        <Info label="Install Date" value={client.insDate} />
        <Info label="FB Name" value={client.fbName} />
        <Info label="Cellphone" value={client.cellphone} />
        <Info label="This Month Due" value={client.thisMonthDue} />
      </div>

      <h3 className="mt-8 mb-3 text-lg font-bold text-slate-800">
        Billing History
      </h3>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                Month
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                Amount Paid
              </th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                Date Paid
              </th>
            </tr>
          </thead>

          <tbody>
            {client.billings &&
              Object.entries(client.billings).map(([monthKey, billing]) => (
                <tr key={monthKey} className="border-t">
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {monthKey}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {billing.amountPaid || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {billing.datePaid || "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientCard;