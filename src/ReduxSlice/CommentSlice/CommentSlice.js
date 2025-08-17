import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/axios.js'

const initialState = {
  byTask: {}, // taskId -> { items, status, error }
}

export const fetchComments = createAsyncThunk('comments/fetch', async (taskId, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/tasks/${taskId}/comments`)
    return { taskId, comments: data }
  } catch (e) {
    return rejectWithValue({ taskId, message: e.response?.data?.message || 'Failed to fetch comments' })
  }
})

export const addComment = createAsyncThunk('comments/add', async ({ taskId, text }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`/tasks/${taskId}/comments`, { text })
    return { taskId, comment: data }
  } catch (e) {
    return rejectWithValue({ taskId, message: e.response?.data?.message || 'Failed to add comment' })
  }
})

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(fetchComments.pending, (s, a) => {
        const id = a.meta.arg
        s.byTask[id] = s.byTask[id] || { items: [], status: 'idle', error: null }
        s.byTask[id].status = 'loading'
      })
      .addCase(fetchComments.fulfilled, (s, a) => {
        const { taskId, comments } = a.payload
        s.byTask[taskId] = { items: comments, status: 'succeeded', error: null }
      })
      .addCase(fetchComments.rejected, (s, a) => {
        const { taskId, message } = a.payload || {}
        s.byTask[taskId] = { items: [], status: 'failed', error: message }
      })
      .addCase(addComment.fulfilled, (s, a) => {
        const { taskId, comment } = a.payload
        s.byTask[taskId] = s.byTask[taskId] || { items: [], status: 'idle', error: null }
        s.byTask[taskId].items.push(comment)
      })
  }
})

export default slice.reducer
