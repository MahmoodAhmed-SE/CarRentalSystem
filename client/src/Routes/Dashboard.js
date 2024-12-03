import CompanyDashboard from "../Components/CompanyDashboard";
import UserDashboard from "../Components/UserDashboard";
import { useAuth } from "../Providers/AuthProvider";

const Dashboard = () => {
  const { auth } = useAuth();

  return auth.user ? <UserDashboard /> : <CompanyDashboard />;
};

export default Dashboard;
