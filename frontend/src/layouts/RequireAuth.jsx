import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const RequireAuth = ({ user, loading }) => {
  if (loading) {
    return <div>Loading...</div>; // or a Loading spinner component
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

RequireAuth.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
