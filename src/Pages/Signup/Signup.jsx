"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../ReduxSlice/AuthSlice/AuthSlice.js"
import { useNavigate, Link as RouterLink } from "react-router-dom"
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
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import PersonIcon from "@mui/icons-material/Person"

const FuturisticSignupCard = styled(Card)(({ theme }) => ({
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
        background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
    },
}))

const GradientTitle = styled(Typography)(({ theme }) => ({
    background: "linear-gradient(135deg, #1e293b 0%, #8b5cf6 50%, #06b6d4 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "8px",
}))

const SignupButton = styled(Button)(({ theme }) => ({
    borderRadius: 16,
    padding: "14px 32px",
    fontSize: "1.1rem",
    fontWeight: 600,
    background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
    boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        background: "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
        boxShadow: "0 12px 40px rgba(139, 92, 246, 0.4)",
        transform: "translateY(-2px)",
    },
    "&:disabled": {
        background: "rgba(148, 163, 184, 0.3)",
        boxShadow: "none",
    },
}))

export default function SignupPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { status, error, token } = useSelector((s) => s.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (token) navigate("/dashboard", { replace: true })
    }, [token])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(signup({ name, email, password }))
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
            <FuturisticSignupCard sx={{ width: 520, maxWidth: "95%" }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Box
                            sx={{
                                display: "inline-flex",
                                p: 2,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)",
                                mb: 2,
                            }}
                        >
                            <PersonAddIcon sx={{ fontSize: 32, color: "#8b5cf6" }} />
                        </Box>
                        <GradientTitle variant="h4">Join Team Collab</GradientTitle>
                        <Typography variant="body1" sx={{ color: "#64748b" }}>
                            Create your account to start collaborating
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
                            label="Full Name"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                startAdornment: <PersonIcon sx={{ color: "#64748b", mr: 1 }} />,
                            }}
                        />
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
                        <SignupButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={status === "loading"}
                            startIcon={status === "loading" ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                        >
                            {status === "loading" ? "Creating Account..." : "Create Account"}
                        </SignupButton>
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
                            Already have an account?{" "}
                            <Link
                                component={RouterLink}
                                to="/login"
                                sx={{
                                    color: "#8b5cf6",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Paper>
                </CardContent>
            </FuturisticSignupCard>
        </Box>
    )
}
