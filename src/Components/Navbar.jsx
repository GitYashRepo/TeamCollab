"use client"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../ReduxSlice/AuthSlice/AuthSlice.js"
import { styled } from "@mui/material/styles"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import DashboardIcon from "@mui/icons-material/Dashboard"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"

const FuturisticAppBar = styled(AppBar)(({ theme }) => ({
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(226, 232, 240, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
    color: "#1e293b",
}))

const LogoText = styled(Typography)(({ theme }) => ({
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    fontSize: "1.5rem",
    letterSpacing: "0.5px",
}))

const FuturisticButton = styled(Button)(({ theme }) => ({
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 600,
    padding: "8px 20px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    color: "#3b82f6",
    "&:hover": {
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
        borderColor: "#3b82f6",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)",
    },
}))

const UserChip = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    color: "#1e293b",
}))

export default function NavBar() {
    const { user, token } = useSelector((s) => s.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await dispatch(logout())
        navigate("/login", { replace: true })
    }

    return (
        <FuturisticAppBar position="static" elevation={0}>
            <Toolbar sx={{ py: 1 }}>
                <LogoText variant="h6" sx={{ flexGrow: 1 }}>
                    <RouterLink to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
                        ✦ Team Collab
                    </RouterLink>
                </LogoText>
                {token ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <UserChip>
                            <AccountCircleIcon sx={{ fontSize: 20, color: "#3b82f6" }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {user?.name}
                            </Typography>
                        </UserChip>
                        <FuturisticButton startIcon={<DashboardIcon />} onClick={() => navigate("/dashboard")}>
                            Dashboard
                        </FuturisticButton>
                        <FuturisticButton
                            startIcon={<LogoutIcon />}
                            onClick={handleLogout}
                            sx={{
                                color: "#ef4444",
                                borderColor: "rgba(239, 68, 68, 0.2)",
                                "&:hover": {
                                    background: "rgba(239, 68, 68, 0.1)",
                                    borderColor: "#ef4444",
                                    boxShadow: "0 4px 20px rgba(239, 68, 68, 0.2)",
                                },
                            }}
                        >
                            Logout
                        </FuturisticButton>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <FuturisticButton component={RouterLink} to="/login" startIcon={<LoginIcon />}>
                            Login
                        </FuturisticButton>
                        <FuturisticButton component={RouterLink} to="/signup" startIcon={<PersonAddIcon />}>
                            Sign up
                        </FuturisticButton>
                    </Box>
                )}
            </Toolbar>
        </FuturisticAppBar>
    )
}
