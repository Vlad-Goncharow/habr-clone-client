import { createSlice } from '@reduxjs/toolkit';

interface ErrorState {
  text:String
  isOpen:boolean
}

const initialState:ErrorState = {
  text:'',
  isOpen:false
}

const ErrorModalSlice = createSlice({
  name:'errorModal',
  initialState,
  reducers:{
    openModal:(state,action) => {
      state.isOpen = true
      state.text = action.payload
    },
    closeModal:(state) => {
      state.isOpen = false
      state.text = ''
    }
  },
})


export const { openModal,closeModal} = ErrorModalSlice.actions;

export default ErrorModalSlice.reducer;