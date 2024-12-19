import { Navigate } from 'react-router-dom';
import { useAuth } from '../Providers/AuthProvider';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/user-login" />;
}


export default PrivateRoute;