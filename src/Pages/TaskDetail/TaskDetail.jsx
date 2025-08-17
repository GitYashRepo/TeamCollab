"use client"

import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchTasks, updateTask } from "../../ReduxSlice/TaskSlice/TaskSlice.js"
import { addComment, fetchComments } from "../../ReduxSlice/CommentSlice/CommentSlice.js"
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
    MenuItem,
    Select,
    Paper,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import SaveIcon from "@mui/icons-material/Save"
import CommentIcon from "@mui/icons-material/Comment"
import SendIcon from "@mui/icons-material/Send"
import TaskIcon from "@mui/icons-material/Task"
import PersonIcon from "@mui/icons-material/Person"
import EditIcon from "@mui/icons-material/Edit"

const FuturisticCard = styled(Card)(({ theme }) => ({
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(226, 232, 240, 0.3)",
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.1)",
    },
}))

const SectionHeader = styled(Typography)(({ theme }) => ({
    background: "linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 700,
    fontSize: "1.5rem",
    marginBottom: "16px",
}))

const SaveButton = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    padding: "10px 24px",
    fontWeight: 600,
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
    "&:hover": {
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)",
        transform: "translateY(-1px)",
    },
}))

const CommentBubble = styled(Paper)(({ theme }) => ({
    padding: "16px",
    borderRadius: 16,
    background: "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)",
    border: "1px solid rgba(226, 232, 240, 0.5)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        transform: "translateY(-1px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    },
}))

export default function TaskDetailsPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { items } = useSelector((s) => s.tasks)
    const { byTask } = useSelector((s) => s.comments)

    const task = useMemo(() => items.find((t) => t._id === id), [items, id])

    useEffect(() => {
        if (!task) dispatch(fetchTasks("all"))
    }, [task])

    useEffect(() => {
        dispatch(fetchComments(id))
    }, [id])

    const [edit, setEdit] = useState(() => ({
        title: task?.title || "",
        description: task?.description || "",
        assignedTo: task.assignedTo?.email || task.assignedTo?._id || "",
        status: task?.status || "pending",
    }))

    useEffect(() => {
        if (task)
            setEdit({
                title: task.title || "",
                description: task.description || "",
                assignedTo: task.assignedTo?.email || task.assignedTo?._id || "",
                status: task.status || "pending",
            })
    }, [task])

    const onSave = () => {
        dispatch(updateTask({ id, updates: { ...edit, assignedTo: edit.assignedTo } }))
    }

    const commentsState = byTask[id] || { items: [], status: "idle", error: null }
    const [text, setText] = useState("")
    const add = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        dispatch(addComment({ taskId: id, text }))
        setText("")
    }

    if (!task)
        return (
            <Box sx={{ textAlign: "center", py: 8 }}>
                <TaskIcon sx={{ fontSize: 64, color: "#cbd5e1", mb: 2 }} />
                <Typography variant="h6" sx={{ color: "#64748b" }}>
                    Loading task details...
                </Typography>
            </Box>
        )

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 4, textAlign: "center" }}>
                <Box
                    sx={{
                        display: "inline-flex",
                        p: 2,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                        mb: 2,
                    }}
                >
                    <EditIcon sx={{ fontSize: 32, color: "#3b82f6" }} />
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        background: "linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 700,
                        mb: 1,
                    }}
                >
                    Task Details
                </Typography>
                <Typography variant="body1" sx={{ color: "#64748b" }}>
                    Edit and manage your task information
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <FuturisticCard>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                <TaskIcon sx={{ color: "#3b82f6", mr: 2, fontSize: 28 }} />
                                <SectionHeader variant="h6">Task Information</SectionHeader>
                            </Box>

                            <Stack spacing={3}>
                                <TextField
                                    label="Task Title"
                                    fullWidth
                                    value={edit.title}
                                    onChange={(e) => setEdit((s) => ({ ...s, title: e.target.value }))}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    value={edit.description}
                                    onChange={(e) => setEdit((s) => ({ ...s, description: e.target.value }))}
                                />
                                <TextField
                                    label="Assign To (User ID or Email)"
                                    fullWidth
                                    value={edit.assignedTo}
                                    onChange={(e) => setEdit((s) => ({ ...s, assignedTo: e.target.value }))}
                                    InputProps={{
                                        startAdornment: <PersonIcon sx={{ color: "#64748b", mr: 1 }} />,
                                    }}
                                />
                                <Select
                                    fullWidth
                                    value={edit.status}
                                    onChange={(e) => setEdit((s) => ({ ...s, status: e.target.value }))}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                </Select>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        p: 3,
                                        borderRadius: 3,
                                        background: "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)",
                                        border: "1px solid rgba(226, 232, 240, 0.5)",
                                    }}
                                >
                                    <Chip
                                        label={edit.status.charAt(0).toUpperCase() + edit.status.slice(1)}
                                        color={edit.status === "completed" ? "success" : "warning"}
                                        sx={{
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            px: 1,
                                        }}
                                    />
                                    <SaveButton variant="contained" onClick={onSave} startIcon={<SaveIcon />}>
                                        Save Changes
                                    </SaveButton>
                                </Box>
                            </Stack>
                        </CardContent>
                    </FuturisticCard>
                </Grid>

                <Grid item xs={12} md={5}>
                    <FuturisticCard>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                <CommentIcon sx={{ color: "#3b82f6", mr: 2, fontSize: 28 }} />
                                <SectionHeader variant="h6">Comments</SectionHeader>
                                <Chip
                                    label={commentsState.items.length}
                                    size="small"
                                    sx={{
                                        ml: 2,
                                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                                        color: "#3b82f6",
                                        fontWeight: 600,
                                    }}
                                />
                            </Box>

                            <Divider sx={{ mb: 3, borderColor: "rgba(226, 232, 240, 0.5)" }} />

                            {commentsState.status === "failed" && (
                                <Alert
                                    severity="error"
                                    sx={{
                                        mb: 3,
                                        borderRadius: 3,
                                        border: "1px solid rgba(239, 68, 68, 0.2)",
                                    }}
                                >
                                    {commentsState.error}
                                </Alert>
                            )}

                            <Stack spacing={3} sx={{ mb: 3, maxHeight: "400px", overflowY: "auto" }}>
                                {commentsState.items.map((c) => (
                                    <CommentBubble key={c._id} elevation={0}>
                                        <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                                            {c.text}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: "#64748b",
                                                fontWeight: 500,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                            }}
                                        >
                                            <PersonIcon sx={{ fontSize: 14 }} />
                                            {c.userId?.email || c.userId?.toString() || "Unknown User"}
                                        </Typography>
                                    </CommentBubble>
                                ))}
                                {commentsState.status === "loading" && (
                                    <Box sx={{ textAlign: "center", py: 2 }}>
                                        <Typography sx={{ color: "#64748b" }}>Loading comments...</Typography>
                                    </Box>
                                )}
                                {commentsState.status === "succeeded" && commentsState.items.length === 0 && (
                                    <Box sx={{ textAlign: "center", py: 4 }}>
                                        <CommentIcon sx={{ fontSize: 48, color: "#cbd5e1", mb: 2 }} />
                                        <Typography variant="h6" sx={{ color: "#64748b", mb: 1 }}>
                                            No comments yet
                                        </Typography>
                                        <Typography sx={{ color: "#94a3b8" }}>Be the first to add a comment!</Typography>
                                    </Box>
                                )}
                            </Stack>

                            <Box component="form" onSubmit={add}>
                                <TextField
                                    label="Add a comment"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    sx={{ mb: 2 }}
                                    placeholder="Share your thoughts..."
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<SendIcon />}
                                    sx={{
                                        borderRadius: 3,
                                        py: 1.5,
                                        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                                        },
                                    }}
                                >
                                    Add Comment
                                </Button>
                            </Box>
                        </CardContent>
                    </FuturisticCard>
                </Grid>
            </Grid>
        </Box>
    )
}
