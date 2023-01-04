import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import {UserType} from '../../Types/UserType'
import axios from '../../axios'
import { FormLogin, FormRegister } from '../../Types/FormValues';
import { HabType } from '../../Types/HabType';
import { PostType } from '../../Types/PostType';

interface MyKnowErrorsItem{
  location: String
  msg: String
  param: String
  value: String
}

interface AuthState {
  user:{
    auth:UserType | null
    loading:Boolean,
    error:MyKnowErrorsItem[] | []
  }
}

const initialState:AuthState = {
  user:{
    auth:null,
    loading:true,
    error:[]
  }
}

export const fetchAuth = createAsyncThunk('auth/fetchAuth',
  async () => {
    const {data} = await axios.get<UserType>('/auth/refresh')
    return data
  }
)

export const fetchRegister = createAsyncThunk('auth/fetchRegister', 
  async (params:FormRegister, {rejectWithValue}) => {
   try {
      const {data} = await axios.post<UserType>('/auth/register',params)
      return data
    } catch(err:any){
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
   }
  } 
)

export const fetchLogin = createAsyncThunk('auth/fetchLogin', 
  async (params:FormLogin,{rejectWithValue}) => {
    try {
      const {data} = await axios.post<UserType>('/auth/login',params)
      return data 
    } catch(err:any){
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

export const fetchLogout = createAsyncThunk('auth/fetchLogout', 
  async () => {
    try {
      const {data} = await axios.post('/auth/logout')
      localStorage.removeItem('token')
      return data 
    } catch(e) {

    }
  }
)

export const fetchHabSubscribe = createAsyncThunk('user/fetchHabSubscribe', 
  async (params:HabType,{rejectWithValue}) => {
    try {
      const {data} = await axios.post(`/hab/${params._id}/subscribe`)
      return data 
    } catch(err:any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

export const fetchHabUnSubscribe = createAsyncThunk('user/fetchHabUnSubscribe', 
  async (params:HabType,{rejectWithValue}) => {
    try {
      const {data} = await axios.post(`/hab/${params._id}/unSubscribe`)
      return data 
    } catch(err:any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

export const fetchPostAddFavorite = createAsyncThunk('user/fetchPostAddFavorite', 
  async (params:PostType,{rejectWithValue}) => {
    try {
      const { data } = await axios.post(`/post/addFavorite/${params._id}`)
      return data 
    } catch(err:any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

export const fetchPostRemoveFavorite = createAsyncThunk('user/fetchPostRemoveFavorite', 
  async (params:PostType,{rejectWithValue}) => {
    try {
      const { data } = await axios.post(`/post/removeFavorite/${params._id}`)
      return data 
    } catch(err:any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

export const fetchUpdateUser = createAsyncThunk('user/fetchUpdateUser',
  async (params: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/user/update`, params)
      return data
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

export const fetchUserSubscribe = createAsyncThunk('user/fetchUserSubscribe',
  async (params:any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/user/${params?._id}/subscribe`)
      return data
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

export const fetchUserUnSubscribe = createAsyncThunk('user/fetchUserUnSubscribe',
  async (params: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/user/${params?._id}/unSubscribe`)
      return data
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
)

const AuthSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    // ======== register
    builder.addCase(fetchRegister.pending, (state) => {
      state.user.loading = true
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      if(action.payload){
        state.user.loading = false
        state.user.auth = action.payload
      }
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.user.loading = false
      state.user.auth = null
    })
    // ======== login
    builder.addCase(fetchLogin.pending, (state) => {
      state.user.loading = true
    })
    builder.addCase(fetchLogin.fulfilled, (state,action) => {
      if(action.payload){
        state.user.loading = false
        state.user.auth = action.payload
      }
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.user.loading = false
      state.user.auth = null
    })
    // ======== refresh
    builder.addCase(fetchAuth.pending, (state) => {
      state.user.loading = true
    })
    builder.addCase(fetchAuth.fulfilled, (state,action) => {
      if(action.payload){
        state.user.loading = false
        state.user.auth = action.payload
      }
    })
    builder.addCase(fetchAuth.rejected, (state) => {
      state.user.loading = false
      state.user.auth = null
    })
    //logout
    builder.addCase(fetchLogout.fulfilled, (state,action) => {
      if(action.payload.success === true){
        state.user.loading = false
        state.user.auth = null
      }
    })
    //hab subscribe
    builder.addCase(fetchHabSubscribe.fulfilled, (state,action) => {
      if(action.payload && state.user.auth !== null){
        state.user.auth = {
          ...state.user.auth,
          habSubscribers:[...state.user.auth.habSubscribers,action.payload]
        }
      }
    })
    //unSubscribe
    builder.addCase(fetchHabUnSubscribe.fulfilled, (state,action) => {
      if(action.payload && state.user.auth !== null){
        state.user.auth = {
          ...state.user.auth,
          habSubscribers:state.user.auth.habSubscribers.filter(el => el !== action.payload)
        }
      }
    })
    //post add favorite
    builder.addCase(fetchPostAddFavorite.fulfilled, (state,action) => {
      if(action.payload && state.user.auth !== null){
        state.user.auth = {
          ...state.user.auth,
          favoritesPosts:[...state.user.auth.favoritesPosts,action.payload]
        }
      }
    })
    //post remove favorite
    builder.addCase(fetchPostRemoveFavorite.fulfilled, (state,action) => {
      if(action.payload && state.user.auth !== null){
        state.user.auth = {
          ...state.user.auth,
          favoritesPosts:state.user.auth.favoritesPosts.filter(el => el !== action.payload)
        }
      }
    })
    //post remove favorite
    builder.addCase(fetchUpdateUser.fulfilled, (state,action) => {
      if(action.payload && state.user.auth !== null){
        state.user.auth = {
          ...state.user.auth,
          description: action.payload.description,
          fullName: action.payload.fullName,
          gender: action.payload.gender,
          dayOfBirth: action.payload.dayOfBirth,
          yearOfBirth: action.payload.yearOfBirth,
          monthOfBirth: action.payload.monthOfBirth,
          country: action.payload.country,
        }
      }
    })
    // ======== user sub
    builder.addCase(fetchUserSubscribe.fulfilled, (state, action) => {
      if (action.payload && state.user.auth !== null) {
        state.user.auth = {
          ...state.user.auth,
          userSubscriptions: [...state.user.auth.userSubscriptions, action.payload]
        }
      }
    })
    //unSubscribe
    builder.addCase(fetchUserUnSubscribe.fulfilled, (state, action) => {
      if (action.payload && state.user.auth !== null) {
        state.user.auth = {
          ...state.user.auth,
          userSubscriptions: state.user.auth.userSubscriptions.filter(el => el !== action.payload)
        }
      }
    })
  },
})


export const { } = AuthSlice.actions;

export default AuthSlice.reducer;