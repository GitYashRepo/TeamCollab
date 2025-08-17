import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, setFilter, createTask, updateTask } from '../../ReduxSlice/TaskSlice/TaskSlice'
import {
    Alert, Box, Button, Card, CardContent, Chip, Divider, Grid, MenuItem,
    Select, Stack, TextField, Typography
} from '@mui/material'
import TaskCard from '../../Components/TaskCard.jsx'

export default function DashboardPage() {
    const dispatch = useDispatch()
    const { items, status, error, filter } = useSelector(s => s.tasks)
    const { user } = useSelector(s => s.auth)

    useEffect(() => { dispatch(fetchTasks(filter)) }, [dispatch, filter])

    const [form, setForm] = useState({
        title: '', description: '', assignedTo: '', status: 'pending'
    })

    const onCreate = (e) => {
        e.preventDefault()
        if (!form.title.trim()) return
        dispatch(createTask(form)).then(() => setForm({ title: '', description: '', assignedTo: '', status: 'pending' }))
    }

    const filtered = useMemo(() => items, [items])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 1 }}>Create New Task</Typography>
                        <Box component="form" onSubmit={onCreate}>
                            <TextField label="Title" fullWidth required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} sx={{ mb: 2 }} />
                            <TextField label="Description" fullWidth multiline minRows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} sx={{ mb: 2 }} />
                            <TextField label="Assign To (User ID or Email)" fullWidth value={form.assignedTo} onChange={e => setForm(f => ({ ...f, assignedTo: e.target.value }))} sx={{ mb: 2 }} />
                            <Select fullWidth value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} sx={{ mb: 2 }}>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                            <Button type="submit" variant="contained" fullWidth>Create</Button>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 1 }}>Filters</Typography>
                        <Stack direction="row" spacing={1}>
                            {['all', 'pending', 'completed'].map(f => (
                                <Chip key={f} label={f} color={filter === f ? 'primary' : 'default'} onClick={() => dispatch(setFilter(f))} />
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={8}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="h6">My Tasks</Typography>
                    <Typography variant="body2">Logged in as: <strong>{user?.email}</strong></Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                {status === 'failed' && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Grid container spacing={2}>
                    {filtered.map(t => (
                        <Grid key={t._id} item xs={12}>
                            <TaskCard task={t} onToggleStatus={() => {
                                const next = t.status === 'completed' ? 'pending' : 'completed'
                                dispatch(updateTask({ id: t._id, updates: { status: next } }))
                            }} />
                        </Grid>
                    ))}
                    {status === 'loading' && <Grid item xs={12}><Typography>Loading…</Typography></Grid>}
                    {status === 'succeeded' && filtered.length === 0 && <Grid item xs={12}><Typography>No tasks yet.</Typography></Grid>}
                </Grid>
            </Grid>
        </Grid>
    )
}
