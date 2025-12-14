import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  // Not logged in
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Role-based protection (admin)
    if (role && decoded.role !== role) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  } catch (error) {
    // Invalid / expired token
    localStorage.removeItem("token");
    return <Navigate to="/auth" replace />;
  }
};

export default ProtectedRoute;
