export default function StampBadge({ status }) {
  const config = {
    pending: { label: "Pending Review", color: "text-gold-deep border-gold-deep" },
    approved: { label: "Approved", color: "text-green-700 border-green-700" },
    denied: { label: "Denied", color: "text-rust border-rust" },
  }[status];

  if (!config) return null;

  return (
    <span
      className={`stamp inline-block px-3 py-1 font-display text-xs font-semibold uppercase tracking-widest2 ${config.color}`}
    >
      {config.label}
    </span>
  );
}
