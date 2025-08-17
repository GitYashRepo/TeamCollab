import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavBar from './Components/Navbar.jsx';
import LoginPage from './Pages/Login/Login.jsx';
import SignupPage from './Pages/Signup/Signup.jsx';
import DashboardPage from './Pages/Dashboard/Dashboard.jsx';
import TaskDetailsPage from './Pages/TaskDetail/TaskDetail.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    const location = useLocation();
    return (
        <>
            <CssBaseline />
            <ScrollToTop />
            <NavBar />
            <Container maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/tasks/:id" element={<TaskDetailsPage />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes >
            </Container>
        </>
    )
}

export default App;
