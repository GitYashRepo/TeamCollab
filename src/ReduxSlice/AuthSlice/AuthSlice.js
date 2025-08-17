import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/axios.js'

const tokenKey = 'auth_token'
const userKey = 'auth_user'

const initialState = {
  user: JSON.parse(localStorage.getItem(userKey) || 'null'),
  token: localStorage.getItem(tokenKey) || null,
  status: 'idle',
  error: null,
}

export const signup = createAsyncThunk('auth/signup', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/signup', payload)
    return data
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Signup failed' })
  }
})

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', payload)
    return data
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Login failed' })
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { getState }) => {
  // backend logout is optional; clear client state regardless
  try {
    await api.post('/auth/logout')
  } catch (_) {}
  return true
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (s) => { s.status = 'loading'; s.error = null })
      .addCase(signup.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.user = a.payload.user
        s.token = a.payload.token
        localStorage.setItem(tokenKey, a.payload.token)
        localStorage.setItem(userKey, JSON.stringify(a.payload.user))
      })
      .addCase(signup.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload?.message || a.error.message })

      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null })
      .addCase(login.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.user = a.payload.user
        s.token = a.payload.token
        localStorage.setItem(tokenKey, a.payload.token)
        localStorage.setItem(userKey, JSON.stringify(a.payload.user))
      })
      .addCase(login.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload?.message || a.error.message })

      .addCase(logout.fulfilled, (s) => {
        s.user = null
        s.token = null
        s.status = 'idle'
        localStorage.removeItem(tokenKey)
        localStorage.removeItem(userKey)
      })
  }
})

export default authSlice.reducer
