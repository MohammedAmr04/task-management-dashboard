// ProtectedRoute.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { Spin } from "antd";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isLoading)
    return (
      <div>
        <Spin size="large" fullscreen />
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const roles: string[] = user?.["http://localhost:5173/roles"] || [];
  const hasAccess =
    !allowedRoles || roles.some((role) => allowedRoles.includes(role));

  return hasAccess ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
