"use client"

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks, setFilter, createTask, updateTask } from "../../ReduxSlice/TaskSlice/TaskSlice"
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    Paper,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import TaskCard from "../../Components/TaskCard.jsx"
import AddIcon from "@mui/icons-material/Add"
import FilterListIcon from "@mui/icons-material/FilterList"
import TaskIcon from "@mui/icons-material/Task"
import PersonIcon from "@mui/icons-material/Person"

const FuturisticCard = styled(Card)(({ theme }) => ({
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(226, 232, 240, 0.3)",
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.1)",
    },
}))

const GradientHeader = styled(Typography)(({ theme }) => ({
    background: "linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: "-0.025em",
    marginBottom: "8px",
}))

const FilterChip = styled(Chip)(({ theme, active }) => ({
    borderRadius: 20,
    fontWeight: 600,
    padding: "4px 8px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: active ? "2px solid #3b82f6" : "2px solid rgba(226, 232, 240, 0.6)",
    background: active
        ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)"
        : "rgba(255, 255, 255, 0.8)",
    color: active ? "#3b82f6" : "#64748b",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
    },
}))

const CreateButton = styled(Button)(({ theme }) => ({
    borderRadius: 16,
    padding: "12px 32px",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
    "&:hover": {
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
        transform: "translateY(-2px)",
    },
}))

export default function DashboardPage() {
    const dispatch = useDispatch()
    const { items, status, error, filter } = useSelector((s) => s.tasks)
    const { user } = useSelector((s) => s.auth)

    useEffect(() => {
        dispatch(fetchTasks(filter))
    }, [dispatch, filter])

    const [form, setForm] = useState({
        title: "",
        description: "",
        assignedTo: "",
        status: "pending",
    })

    const onCreate = (e) => {
        e.preventDefault()
        if (!form.title.trim()) return
        dispatch(createTask(form)).then(() => setForm({ title: "", description: "", assignedTo: "", status: "pending" }))
    }

    const filtered = useMemo(() => items, [items])

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 4, textAlign: "center" }}>
                <GradientHeader variant="h4">Task Management Hub</GradientHeader>
                <Typography variant="h6" sx={{ color: "#64748b", fontWeight: 400 }}>
                    Welcome back, <strong>{user?.name}</strong> • {user?.email}
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <FuturisticCard>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                <AddIcon sx={{ color: "#3b82f6", mr: 1, fontSize: 28 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                                    Create New Task
                                </Typography>
                            </Box>
                            <Box component="form" onSubmit={onCreate}>
                                <TextField
                                    label="Task Title"
                                    fullWidth
                                    required
                                    value={form.title}
                                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                    sx={{ mb: 3 }}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={form.description}
                                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    label="Assign To (User ID or Email)"
                                    fullWidth
                                    value={form.assignedTo}
                                    onChange={(e) => setForm((f) => ({ ...f, assignedTo: e.target.value }))}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        startAdornment: <PersonIcon sx={{ color: "#64748b", mr: 1 }} />,
                                    }}
                                />
                                <Select
                                    fullWidth
                                    value={form.status}
                                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                                    sx={{ mb: 3 }}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </Select>
                                <CreateButton type="submit" variant="contained" fullWidth startIcon={<AddIcon />}>
                                    Create Task
                                </CreateButton>
                            </Box>
                        </CardContent>
                    </FuturisticCard>

                    <FuturisticCard sx={{ mt: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <FilterListIcon sx={{ color: "#3b82f6", mr: 1, fontSize: 24 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                                    Filter Tasks
                                </Typography>
                            </Box>
                            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                {["all", "pending", "completed"].map((f) => (
                                    <FilterChip
                                        key={f}
                                        label={f.charAt(0).toUpperCase() + f.slice(1)}
                                        active={filter === f}
                                        onClick={() => dispatch(setFilter(f))}
                                    />
                                ))}
                            </Stack>
                        </CardContent>
                    </FuturisticCard>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <TaskIcon sx={{ color: "#3b82f6", mr: 2, fontSize: 32 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e293b" }}>
                            Your Tasks
                        </Typography>
                        <Chip
                            label={`${filtered.length} tasks`}
                            sx={{
                                ml: 2,
                                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                                color: "#3b82f6",
                                fontWeight: 600,
                            }}
                        />
                    </Box>

                    {status === "failed" && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 3,
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Grid container spacing={3}>
                        {filtered.map((t) => (
                            <Grid key={t._id} item xs={12}>
                                <TaskCard
                                    task={t}
                                    onToggleStatus={() => {
                                        const next = t.status === "completed" ? "pending" : "completed"
                                        dispatch(updateTask({ id: t._id, updates: { status: next } }))
                                    }}
                                />
                            </Grid>
                        ))}
                        {status === "loading" && (
                            <Grid item xs={12}>
                                <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
                                    <Typography sx={{ color: "#64748b" }}>Loading tasks...</Typography>
                                </Paper>
                            </Grid>
                        )}
                        {status === "succeeded" && filtered.length === 0 && (
                            <Grid item xs={12}>
                                <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
                                    <TaskIcon sx={{ fontSize: 48, color: "#cbd5e1", mb: 2 }} />
                                    <Typography variant="h6" sx={{ color: "#64748b", mb: 1 }}>
                                        No tasks found
                                    </Typography>
                                    <Typography sx={{ color: "#94a3b8" }}>Create your first task to get started!</Typography>
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
