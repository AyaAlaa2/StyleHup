import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
