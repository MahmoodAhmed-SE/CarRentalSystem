import { useAuth } from "../Providers/AuthProvider";

const Header = () => {
    const {logout} = useAuth();

    return (
        <header>
            Car Rental System - <button onClick={() => logout()}>logout</button>
        </header>
    );
}



export default Header;