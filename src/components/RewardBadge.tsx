export function RewardBadge({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
      <div className="text-2xl">{icon}</div>
      <p className="mt-1 text-xs font-bold text-slate-500">{label}</p>
      <p className="text-sm font-black text-slate-900">{value}</p>
    </div>
  );
}
