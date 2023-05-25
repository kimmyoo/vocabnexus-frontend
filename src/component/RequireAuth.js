import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const RequireAuth = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.user
            ? <Outlet />
            // the user is trying to outlet
            // but he is not authorized 
            // in history replace where they are going to login
            // later after login user will be directed back to original location
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth