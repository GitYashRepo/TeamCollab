"use client"

import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import { useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { styled } from "@mui/material/styles"
import NavBar from "./Components/Navbar.jsx"
import LoginPage from "./Pages/Login/Login.jsx"
import SignupPage from "./Pages/Signup/Signup.jsx"
import DashboardPage from "./Pages/Dashboard/Dashboard.jsx"
import TaskDetailsPage from "./Pages/TaskDetail/TaskDetail.jsx"
import ProtectedRoute from "./Components/ProtectedRoute.jsx"

const futuristicTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#3b82f6",
            light: "#60a5fa",
            dark: "#1d4ed8",
        },
        secondary: {
            main: "#8b5cf6",
            light: "#a78bfa",
            dark: "#7c3aed",
        },
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
        text: {
            primary: "#1e293b",
            secondary: "#64748b",
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 700,
            letterSpacing: "-0.025em",
        },
        h5: {
            fontWeight: 600,
            letterSpacing: "-0.025em",
        },
        h6: {
            fontWeight: 600,
            letterSpacing: "-0.025em",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: "1px solid rgba(226, 232, 240, 0.6)",
                    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.08)",
                        transform: "translateY(-2px)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "10px 24px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                },
                contained: {
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)",
                        transform: "translateY(-1px)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 12,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3b82f6",
                            },
                        },
                        "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3b82f6",
                                borderWidth: 2,
                            },
                        },
                    },
                },
            },
        },
    },
})

const FuturisticBackground = styled("div")({
    minHeight: "100vh",
    background: `
        linear-gradient(135deg, #ffffff 0%, #f8fafc 100%),
        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)
    `,
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
    },
})

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

function App() {
    const location = useLocation()
    return (
        <ThemeProvider theme={futuristicTheme}>
            <CssBaseline />
            <FuturisticBackground>
                <ScrollToTop />
                <NavBar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 6, position: "relative", zIndex: 1 }}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/tasks/:id" element={<TaskDetailsPage />} />
                        </Route>

                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </Container>
            </FuturisticBackground>
        </ThemeProvider>
    )
}

export default App
