import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { PostType } from '../../Types/PostType';

interface PostState {
  posts:{
    items:PostType[] | [],
    loading:Boolean
  }
}

const initialState:PostState = {
  posts:{
    items:[],
    loading:true
  }
}

export const fetchGetAllPosts = createAsyncThunk('posts/fetchGetAllPosts', async (params:any,{rejectWithValue}) => {
  try {
      const { data } = await axios.get(`/posts/${params.category}/${params.type}`)
      return data 
    } catch(err:any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue('При получении постов произошла ошибка!');
    }
})

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async (params:any,{rejectWithValue}) => {
  try {
    const { data } = await axios.get(`/user/posts/${params.id}`)
    return data 
  } catch(err:any) {
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
    builder.addCase(fetchGetAllPosts.pending, (state,action) => {
      state.posts.loading = true
    })
    builder.addCase(fetchGetAllPosts.fulfilled, (state,action) => {
      state.posts.items = action.payload
      state.posts.loading = false
    })

    builder.addCase(fetchUserPosts.pending, (state,action) => {
      state.posts.loading = true
    })
    builder.addCase(fetchUserPosts.fulfilled, (state,action) => {
      state.posts.items = action.payload
      state.posts.loading = false
    })
  }
})


export const { addPostFavorite,removePostFavorite } = PostSlice.actions;

export default PostSlice.reducer;