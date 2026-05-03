import DashboardOverviewStatus from "../../component/Main/Home/DashboardOverviewStatus";
import GrouthAndSubscriptionOverview from "../../component/Main/Home/GrouthAndSubscriptionOverview";
import RecentSubscription from "../../component/Main/Home/RecentSubscription";

const DashboardHome = () => {
  return (
    <section>
      <DashboardOverviewStatus />
      <GrouthAndSubscriptionOverview />
      <RecentSubscription />
    </section>
  );
};

export default DashboardHome;
