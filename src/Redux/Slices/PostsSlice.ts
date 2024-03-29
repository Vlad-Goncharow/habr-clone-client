import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { PostType } from '../../Types/PostType';

interface PostState {
  posts:{
    items:PostType[] | [],
    length:Number,
    loading:Boolean
  }
}

const initialState:PostState = {
  posts:{
    items:[],
    length: 0,
    loading:true
  }
}

export const fetchCustomPosts = createAsyncThunk('posts/fetchCustomPosts', async (params: any, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(params)
    return data
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue('При получении постов произошла ошибка!');
  }
})


const PostSlice = createSlice({
  name:'posts',
  initialState,
  reducers:{
    addPostFavorite: (state,action) => {
      state.posts.items = state.posts.items.map((post:PostType) => {
        if(post._id === action.payload){
          return {
            ...post,
            favorites: Number(post.favorites) + 1
          }
        } else {
          return post
        }
      })
    },
    removePostFavorite: (state,action) => {
      state.posts.items = state.posts.items.map((post:PostType) => {
        if(post._id === action.payload){
          return {
            ...post,
            favorites: Number(post.favorites) - 1
          }
        } else {
          return post
        }
      })
    }
  },
  extraReducers:(builder) => {
    //load posts
    builder.addCase(fetchCustomPosts.pending, (state, action) => {
      state.posts.loading = true
    })
    builder.addCase(fetchCustomPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload.posts
      state.posts.length = action.payload.length
      state.posts.loading = false
    })
  }
})


export const { addPostFavorite,removePostFavorite } = PostSlice.actions;

export default PostSlice.reducer;