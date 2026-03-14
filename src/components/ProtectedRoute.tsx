import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    //Om ingen användare är inloggad, omdirigera till login-sidan
    if (!user) {
        return <Navigate to="/login" replace />
    }

    //Om användare finns, visa childkomponenterna
    return <>{children}</>
}

export default ProtectedRoute