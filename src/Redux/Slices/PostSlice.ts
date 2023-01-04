import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { PostType } from '../../Types/PostType';

interface AuthorsState {
  post:{
    data:PostType | null
    loading:Boolean
  }
}

const initialState:AuthorsState = {
  post:{
    data:null,
    loading:true
  }
}

export const fetchtPost = createAsyncThunk('post/fetchtPost', async (params:any,{rejectWithValue}) => {
  try {
      const { data } = await axios.get(`/post/${params.id}`)
      return data 
    } catch(err:any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue('При загрузки произошла ошибка!');
    }
})

export const fetchtAddComment = createAsyncThunk('post/fetchtAddComment', async (params:any,{rejectWithValue}) => {
  try {
      const { data } = await axios.post(`/posts/addComment/${params.id}`, {
        text: params.inputValue,
      })
      return data 
    } catch(err:any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue('При загрузки произошла ошибка!');
    }
})

const PostSlice = createSlice({
  name:'post',
  initialState,
  reducers:{
    addFavorite:(state,action) => {
      if(state.post.data){
        state.post.data = {
          ...state.post.data,
          favorites: Number(state.post.data.favorites) + 1
        }
      }
    },
    removeFavorite:(state,action)=>{
      if(state.post.data){
        state.post.data = {
          ...state.post.data,
          favorites: Number(state.post.data.favorites) - 1
        }
      }
    }
  },
  extraReducers:(builder) => {
    builder.addCase(fetchtPost.pending, (state) => {
      state.post.loading = true
    })
    builder.addCase(fetchtPost.fulfilled, (state,action) => {
      state.post.data = action.payload
      state.post.loading = false
    })
    // ======== add comment
    builder.addCase(fetchtAddComment.fulfilled, (state,action) => {
      if(state.post.data){
        state.post.data = {
          ...state.post.data,
          comments: [...state.post.data.comments,action.payload]
        }
      }
    })
    // ======== add comment
  }
})


export const { addFavorite,removeFavorite } = PostSlice.actions;

export default PostSlice.reducer;