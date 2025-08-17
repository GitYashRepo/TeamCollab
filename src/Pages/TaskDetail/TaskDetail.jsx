import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchTasks, updateTask } from '../../ReduxSlice/TaskSlice/TaskSlice.js'
import { addComment, fetchComments } from '../../ReduxSlice/CommentSlice/CommentSlice.js'
import {
    Alert, Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, TextField, Typography, MenuItem, Select
} from '@mui/material'

export default function TaskDetailsPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { items } = useSelector(s => s.tasks)
    const { byTask } = useSelector(s => s.comments)

    const task = useMemo(() => items.find(t => t._id === id), [items, id])

    useEffect(() => {
        if (!task) dispatch(fetchTasks('all'))
    }, [task])

    useEffect(() => {
        dispatch(fetchComments(id))
    }, [id])

    const [edit, setEdit] = useState(() => ({
        title: task?.title || '',
        description: task?.description || '',
        assignedTo: task.assignedTo?.email || task.assignedTo?._id || '',
        status: task?.status || 'pending',
    }))

    useEffect(() => {
        if (task) setEdit({
            title: task.title || '',
            description: task.description || '',
            assignedTo: task.assignedTo?.email || task.assignedTo?._id || '',
            status: task.status || 'pending',
        })
    }, [task])

    const onSave = () => {
        dispatch(updateTask({ id, updates: { ...edit, assignedTo: edit.assignedTo } }))
      }

    const commentsState = byTask[id] || { items: [], status: 'idle', error: null }
    const [text, setText] = useState('')
    const add = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        dispatch(addComment({ taskId: id, text }))
        setText('')
    }

    if (!task) return <Typography>Loading task…</Typography>

    return (
        <Grid container spacing={3}>
            <Grid item size={{ xs: 12, md: 7 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>Task Details</Typography>
                        <Stack spacing={2}>
                            <TextField label="Title" fullWidth value={edit.title} onChange={e => setEdit(s => ({ ...s, title: e.target.value }))} />
                            <TextField label="Description" fullWidth multiline minRows={3} value={edit.description} onChange={e => setEdit(s => ({ ...s, description: e.target.value }))} />
                            <TextField label="Assign To (User ID or Email)" fullWidth value={edit.assignedTo} onChange={e => setEdit(s => ({ ...s, assignedTo: e.target.value }))} />
                            <Select fullWidth value={edit.status} onChange={e => setEdit(s => ({ ...s, status: e.target.value }))}>
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                            <Stack direction="row" gap={1}>
                                <Chip label={edit.status} color={edit.status === 'completed' ? 'success' : 'warning'} />
                                <Button variant="contained" onClick={onSave}>Save</Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={5}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Comments</Typography>
                        <Divider sx={{ my: 2 }} />
                        {commentsState.status === 'failed' && <Alert severity="error" sx={{ mb: 2 }}>{commentsState.error}</Alert>}
                        <Stack spacing={2} sx={{ mb: 2 }}>
                            {commentsState.items.map(c => (
                                <Box key={c._id} sx={{ p: 1.5, borderRadius: 1, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                                    <Typography variant="body2">{c.text}</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        by {c.userId?.email || c.userId?.toString() || 'unknown'}
                                    </Typography>
                                </Box>
                            ))}
                            {commentsState.status === 'loading' && <Typography>Loading comments…</Typography>}
                            {commentsState.status === 'succeeded' && commentsState.items.length === 0 && <Typography>No comments yet.</Typography>}
                        </Stack>
                        <Box component="form" onSubmit={add}>
                            <TextField label="Add a comment" fullWidth multiline minRows={2} value={text} onChange={e => setText(e.target.value)} sx={{ mb: 2 }} />
                            <Button type="submit" variant="contained">Comment</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
