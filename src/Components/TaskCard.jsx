"use client"

import { useNavigate } from "react-router-dom"
import { Card, CardActionArea, CardContent, Chip, Stack, Typography, Button, Box, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ScheduleIcon from "@mui/icons-material/Schedule"
import PersonIcon from "@mui/icons-material/Person"
import EditIcon from "@mui/icons-material/Edit"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import CheckIcon from "@mui/icons-material/Check"

const FuturisticTaskCard = styled(Card)(({ theme }) => ({
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(226, 232, 240, 0.3)",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    position: "relative",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.3)",
    },
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

const StatusChip = styled(Chip)(({ theme, status }) => ({
    borderRadius: 20,
    fontWeight: 600,
    padding: "4px 8px",
    background:
        status === "completed"
            ? "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)"
            : "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
    color: status === "completed" ? "#16a34a" : "#ea580c",
    border: `1px solid ${status === "completed" ? "rgba(34, 197, 94, 0.2)" : "rgba(251, 146, 60, 0.2)"}`,
}))

const ActionButton = styled(Button)(({ theme, variant }) => ({
    borderRadius: 12,
    textTransform: "none",
    fontWeight: 600,
    padding: "8px 20px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    ...(variant === "complete" && {
        background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)",
        color: "#16a34a",
        border: "1px solid rgba(34, 197, 94, 0.2)",
        "&:hover": {
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.2) 100%)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 20px rgba(34, 197, 94, 0.2)",
        },
    }),
    ...(variant === "pending" && {
        background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
        color: "#ea580c",
        border: "1px solid rgba(251, 146, 60, 0.2)",
        "&:hover": {
            background: "linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 20px rgba(251, 146, 60, 0.2)",
        },
    }),
}))

export default function TaskCard({ task, onToggleStatus }) {
    const navigate = useNavigate()
    const isCompleted = task.status === "completed"

    return (
        <FuturisticTaskCard>
            <CardActionArea onClick={() => navigate(`/tasks/${task._id}`)}>
                <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: "#1e293b",
                                flex: 1,
                                mr: 2,
                                lineHeight: 1.3,
                            }}
                        >
                            {task.title}
                        </Typography>
                        <StatusChip
                            icon={isCompleted ? <CheckCircleIcon /> : <ScheduleIcon />}
                            label={isCompleted ? "Completed" : "Pending"}
                            status={task.status}
                            size="small"
                        />
                    </Stack>

                    {task.description && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#64748b",
                                mb: 2,
                                lineHeight: 1.5,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {task.description}
                        </Typography>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            background: "rgba(248, 250, 252, 0.8)",
                            border: "1px solid rgba(226, 232, 240, 0.5)",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <PersonIcon sx={{ fontSize: 16, color: "#3b82f6" }} />
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500 }}>
                                Assigned: {task.assignedTo?.email || task.assignedTo || "—"}
                            </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                            •
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500 }}>
                            By: {task.createdBy?.email || "—"}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

            <Box sx={{ p: 2, pt: 0, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <ActionButton
                    size="small"
                    onClick={onToggleStatus}
                    variant={isCompleted ? "pending" : "complete"}
                    startIcon={isCompleted ? <PlayArrowIcon /> : <CheckIcon />}
                >
                    {isCompleted ? "Mark Pending" : "Mark Completed"}
                </ActionButton>
                <IconButton
                    size="small"
                    onClick={() => navigate(`/tasks/${task._id}`)}
                    sx={{
                        color: "#3b82f6",
                        "&:hover": {
                            background: "rgba(59, 130, 246, 0.1)",
                            transform: "scale(1.1)",
                        },
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
            </Box>
        </FuturisticTaskCard>
    )
}
