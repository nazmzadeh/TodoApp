import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IToDo } from '../interfaces/types';

const initialState:IToDo[]=[];

const todoSlice=createSlice({
  name:"todos",
  initialState,
  reducers:{
    add:(state,action:PayloadAction<IToDo>)=>{
        const newTodo=action.payload
        state.push(newTodo)
    },
    remove:(state,action:PayloadAction<string>)=>{
       return  state.filter((todo)=>todo.id!==action.payload)
    },
    removeAll:(state)=>{
      return state=[];
    }
  }
})

export default todoSlice.reducer;
export const {add,remove,removeAll}=todoSlice.actions;