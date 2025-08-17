import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../ReduxSlice/AuthSlice/AuthSlice.js'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, CircularProgress, TextField, Typography, Link } from '@mui/material'

export default function SignupPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { status, error, token } = useSelector(s => s.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (token) navigate('/dashboard', { replace: true })
    }, [token])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(signup({ name, email, password }))
    }

    return (
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
            <Card sx={{ width: 480, maxWidth: '95%' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>Create account</Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <Box component="form" onSubmit={onSubmit}>
                        <TextField label="Name" fullWidth required value={name} onChange={e => setName(e.target.value)} sx={{ mb: 2 }} />
                        <TextField label="Email" type="email" fullWidth required value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
                        <TextField label="Password" type="password" fullWidth required value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
                        <Button type="submit" fullWidth variant="contained" disabled={status === 'loading'}>
                            {status === 'loading' ? <CircularProgress size={22} /> : 'Sign up'}
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Already have an account? <Link component={RouterLink} to="/login">Login</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
