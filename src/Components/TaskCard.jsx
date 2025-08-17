import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, CardContent, Chip, Stack, Typography, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ScheduleIcon from '@mui/icons-material/Schedule'

export default function TaskCard({ task, onToggleStatus }) {
    const navigate = useNavigate()
    const isCompleted = task.status === 'completed'

    return (
        <Card variant="outlined">
            <CardActionArea onClick={() => navigate(`/tasks/${task._id}`)}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{task.title}</Typography>
                        <Chip
                            icon={isCompleted ? <CheckCircleIcon /> : <ScheduleIcon />}
                            label={isCompleted ? 'Completed' : 'Pending'}
                            color={isCompleted ? 'success' : 'warning'}
                            variant="filled"
                        />
                    </Stack>
                    {task.description && (
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                            {task.description}
                        </Typography>
                    )}
                    <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        Assigned To: {task.assignedTo?.email || task.assignedTo || '—'} • Created By: {task.createdBy?.email || '—'}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Stack direction="row" spacing={1} sx={{ p: 1, pt: 0, justifyContent: 'flex-end' }}>
                <Button size="small" onClick={onToggleStatus}>{isCompleted ? 'Mark Pending' : 'Mark Completed'}</Button>
            </Stack>
        </Card>
    )
}
