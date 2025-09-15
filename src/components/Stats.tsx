import { useAppSelector } from "../store/hooks";

function Stats() {
  const { filter, statsByFilter, stats, loading } = useAppSelector(
    (state) => state.dashboard
  );

  const data = statsByFilter[filter] ?? stats;

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 mb-6 w-full md:grid-cols-3 animate-pulse">
        {["Total Earnings", "Payment Awaited", "Payment Overdue"].map(
          (label) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 border-2 border-light_gray h-20"
            >
              <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-6 w-full md:grid-cols-3">
      <div className="bg-white rounded-2xl p-4 border-2 border-light_gray col-span-2 md:col-span-1">
        <p className="text-sm font-medium text-sparko-dark-gray">
          Total Earnings
        </p>
        <p className="text-xl text-primary font-semibold">
          ${data.totalEarnings.toLocaleString()}
        </p>
      </div>
      <div className="bg-white rounded-2xl p-4 border-2 border-light_gray">
        <p className="text-sm font-medium text-sparko-dark-gray">
          Payment Awaited
        </p>
        <p className="text-xl text-primary font-semibold">
          ${data.paymentAwaited.toLocaleString()}
        </p>
      </div>
      <div className="bg-white rounded-2xl p-4 border-2 border-light_gray">
        <p className="text-sm font-medium text-sparko-dark-gray">
          Payment Overdue
        </p>
        <p className="text-xl text-primary font-semibold">
          ${data.paymentOverdue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default Stats;
