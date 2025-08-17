import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../ReduxSlice/AuthSlice/AuthSlice.js'

export default function NavBar() {
    const { user, token } = useSelector(s => s.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await dispatch(logout())
        navigate('/login', { replace: true })
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <RouterLink to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Team Collab
                    </RouterLink>
                </Typography>
                {token ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2">{user?.name}</Typography>
                        <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                        <Button color="inherit" component={RouterLink} to="/signup">Sign up</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}
