import { useNavigate } from "react-router-dom";
import DashboardOverviewStatus from "../../component/Main/Home/DashboardOverviewStatus";
import GrouthAndSubscriptionOverview from "../../component/Main/Home/GrouthAndSubscriptionOverview";
import RecentSubscription from "../../component/Main/Home/RecentSubscription";

const DashboardHome = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <section>
      <DashboardOverviewStatus />
      <GrouthAndSubscriptionOverview />
      <RecentSubscription />
    </section>
  );
};

export default DashboardHome;
