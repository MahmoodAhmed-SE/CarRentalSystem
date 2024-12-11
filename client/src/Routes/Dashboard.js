import Header from "../Components/Header";
import UserDashboard from "../Components/UserDashboard";
import CompanyDashboard from "../Components/CompanyDashboard";
import Footer from "../Components/Footer";
import { useAuth } from "../Providers/AuthProvider";

const Dashboard = () => {
  const { auth } = useAuth();

  let content;
  if (auth.user) {
    content = <UserDashboard />;
  } else if (auth.company) {
    content = <CompanyDashboard />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Header />
      </div>

      <div className="row">{content}</div>

      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
