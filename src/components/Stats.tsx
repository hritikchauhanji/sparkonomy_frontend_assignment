import { useAppSelector } from "../store/hooks";

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const statItems = [
  { key: "totalEarnings", label: "Total Earnings" },
  { key: "paymentAwaited", label: "Payment Awaited" },
  { key: "paymentOverdue", label: "Payment Overdue" },
] as const;

function Stats() {
  const { filter, statsByFilter, stats, loading } = useAppSelector(
    (state) => state.dashboard
  );

  const data = statsByFilter[filter] ?? stats;

  if (loading || !data) {
    return (
      <div className="grid grid-cols-2 gap-4 mb-6 w-full md:grid-cols-3 animate-pulse">
        {statItems.map((item) => (
          <div
            key={item.key}
            className="bg-white rounded-2xl p-4 border-2 border-light_gray h-20"
          >
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-6 w-full md:grid-cols-3">
      {statItems.map(({ key, label }) => (
        <div
          key={key}
          className={`bg-white rounded-2xl p-4 border-2 border-light_gray ${
            key === "totalEarnings" ? "col-span-2 md:col-span-1" : ""
          }`}
        >
          <p className="text-sm font-medium text-sparko-dark-gray">{label}</p>
          <p
            className={`text-xl font-semibold ${
              key === "totalEarnings" ? "text-primary" : "text-primary"
            }`}
          >
            {formatCurrency(data[key])}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Stats;
