import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/axios.js'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  filter: 'all', // 'all' | 'pending' | 'completed'
}

export const fetchTasks = createAsyncThunk('tasks/fetch', async (status, { rejectWithValue }) => {
  try {
    const query = status && status !== 'all' ? `?status=${status}` : ''
    const { data } = await api.get(`/tasks${query}`)
    return data
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Failed to fetch tasks' })
  }
})

export const createTask = createAsyncThunk('tasks/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/tasks', payload)
    return data
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Failed to create task' })
  }
})

export const updateTask = createAsyncThunk('tasks/update', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/tasks/${id}`, updates)
    return data
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Failed to update task' })
  }
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => { s.status = 'loading'; s.error = null })
      .addCase(fetchTasks.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
      .addCase(fetchTasks.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload?.message || a.error.message })

      .addCase(createTask.fulfilled, (s, a) => { s.items.unshift(a.payload) })

      .addCase(updateTask.fulfilled, (s, a) => {
        const idx = s.items.findIndex(t => t._id === a.payload._id)
        if (idx !== -1) s.items[idx] = a.payload
      })
  }
})

export const { setFilter } = tasksSlice.actions
export default tasksSlice.reducer
