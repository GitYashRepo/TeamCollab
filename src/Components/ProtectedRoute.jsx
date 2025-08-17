import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
    const token = useSelector(s => s.auth.token)
    const loc = useLocation()
    if (!token) return <Navigate to="/login" replace state={{ from: loc }} />
    return <Outlet />
}
