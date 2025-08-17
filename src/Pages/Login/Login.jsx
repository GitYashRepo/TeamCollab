"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../ReduxSlice/AuthSlice/AuthSlice.js"
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom"
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    TextField,
    Typography,
    Link,
    Paper,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import LoginIcon from "@mui/icons-material/Login"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"

const FuturisticLoginCard = styled(Card)(({ theme }) => ({
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(226, 232, 240, 0.3)",
    borderRadius: 24,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    },
}))

const GradientTitle = styled(Typography)(({ theme }) => ({
    background: "linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "8px",
}))

const LoginButton = styled(Button)(({ theme }) => ({
    borderRadius: 16,
    padding: "14px 32px",
    fontSize: "1.1rem",
    fontWeight: 600,
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
        transform: "translateY(-2px)",
    },
    "&:disabled": {
        background: "rgba(148, 163, 184, 0.3)",
        boxShadow: "none",
    },
}))

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { status, error, token } = useSelector((s) => s.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/dashboard"

    useEffect(() => {
        if (token) navigate(from, { replace: true })
    }, [token])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ email, password }))
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "70vh",
                py: 4,
            }}
        >
            <FuturisticLoginCard sx={{ width: 480, maxWidth: "95%" }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Box
                            sx={{
                                display: "inline-flex",
                                p: 2,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                                mb: 2,
                            }}
                        >
                            <LoginIcon sx={{ fontSize: 32, color: "#3b82f6" }} />
                        </Box>
                        <GradientTitle variant="h4">Welcome Back</GradientTitle>
                        <Typography variant="body1" sx={{ color: "#64748b" }}>
                            Sign in to your account to continue
                        </Typography>
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 3,
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                background: "rgba(254, 242, 242, 0.8)",
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={onSubmit}>
                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                startAdornment: <EmailIcon sx={{ color: "#64748b", mr: 1 }} />,
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 4 }}
                            InputProps={{
                                startAdornment: <LockIcon sx={{ color: "#64748b", mr: 1 }} />,
                            }}
                        />
                        <LoginButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={status === "loading"}
                            startIcon={status === "loading" ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                        >
                            {status === "loading" ? "Signing In..." : "Sign In"}
                        </LoginButton>
                    </Box>

                    <Paper
                        sx={{
                            mt: 3,
                            p: 2,
                            textAlign: "center",
                            background: "rgba(248, 250, 252, 0.8)",
                            border: "1px solid rgba(226, 232, 240, 0.5)",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                            Don't have an account?{" "}
                            <Link
                                component={RouterLink}
                                to="/signup"
                                sx={{
                                    color: "#3b82f6",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                Create Account
                            </Link>
                        </Typography>
                    </Paper>
                </CardContent>
            </FuturisticLoginCard>
        </Box>
    )
}
