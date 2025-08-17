import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../ReduxSlice/AuthSlice/AuthSlice'
import tasksReducer from '../ReduxSlice/TaskSlice/TaskSlice'
import commentsReducer from '../ReduxSlice/CommentSlice/CommentSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    comments: commentsReducer,
  },
})

export default store
