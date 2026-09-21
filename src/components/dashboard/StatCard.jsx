import Icon from "./Icon";

const ACCENTS = {
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
  green: "bg-green-50 text-green-600",
};

// Modern admin-style stat card: tinted icon tile, big value, muted label.
export default function StatCard({ label, value, icon, accent = "blue", hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <span
        className={`grid h-11 w-11 place-items-center rounded-xl ${
          ACCENTS[accent] || ACCENTS.blue
        }`}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>

      <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>

      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
