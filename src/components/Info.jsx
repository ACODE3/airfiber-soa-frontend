function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800">{value || "-"}</p>
    </div>
  );
}

export default Info;