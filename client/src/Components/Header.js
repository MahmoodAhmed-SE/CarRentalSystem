import { useAuth } from "../Providers/AuthProvider";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="row" style={{backgroundColor: "#f5f5f5"}}>
      <div className="col-md-6">
        <h1 className="display-6">Car Rental System </h1>
      </div>
      <div className="col-md-6 text-end p-2">
        <button className="btn btn-danger" onClick={() => logout()}>
          logout
        </button>
      </div>
    </header>
  );
};

export default Header;
