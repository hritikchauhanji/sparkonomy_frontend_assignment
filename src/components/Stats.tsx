import { useAppSelector } from "../store/hooks";

function Stats() {
  // const { totalEarnings, paymentAwaited, paymentOverdue } = useAppSelector(
  //   (state) => state.dashboard.stats
  // );

  const filter = useAppSelector((state) => state.dashboard.filter);
  const statsByFilter = useAppSelector(
    (state) => state.dashboard.statsByFilter
  );

  // Fallback if no stats exist for current filter
  const { totalEarnings, paymentAwaited, paymentOverdue } = statsByFilter[
    filter
  ] || { totalEarnings: 0, paymentAwaited: 0, paymentOverdue: 0 };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6 w-full md:grid-cols-3">
      {/* Total Earnings */}
      <div className="bg-white rounded-2xl p-4 border-2 border-light_gray col-span-2 md:col-span-1">
        <p className="text-sm font-medium font-roboto text-sparko-dark-gray">
          Total Earnings
        </p>
        <p className="text-xl text-primary font-semibold font-roboto">
          ${totalEarnings.toLocaleString()}
        </p>
      </div>

      {/* Payment Awaited */}
      <div className="bg-white rounded-2xl p-4 border-2 border-light_gray">
        <p className="text-sm font-roboto font-medium text-sparko-dark-gray">
          Payment Awaited
        </p>
        <p className="text-xl text-primary font-semibold font-roboto">
          ${paymentAwaited.toLocaleString()}
        </p>
      </div>

      {/* Payment Overdue */}
      <div className="bg-white rounded-2xl p-4 border-2 border-light_gray">
        <p className="text-sm font-roboto font-medium text-sparko-dark-gray">
          Payment Overdue
        </p>
        <p className="text-xl text-primary font-semibold font-roboto">
          ${paymentOverdue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default Stats;
