import { Navigate, Outlet } from "react-router-dom";

// TODO: replace with actual implementation
const useUser = () => {
  return { user: { id: 1 } };
};

export default function ProtectedRoute() {
  const { user } = useUser();

  if (user === null) {
    return <Navigate to="/auth/signin" />;
  }

  return <Outlet />;
}
