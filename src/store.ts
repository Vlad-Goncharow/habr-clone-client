import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './Redux/Slices/AuthSlice'
import ErrorModalSlice from './Redux/Slices/ErrorModalSlice';
import PostSlice from './Redux/Slices/PostSlice';
import PostsSlice from './Redux/Slices/PostsSlice'

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    posts: PostsSlice,
    errorModal: ErrorModalSlice,
    post: PostSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;