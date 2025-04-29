import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios/instance';

// API(GET) for fetch task 
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response =  await axiosInstance.get("tasks")
  const data = await response.data;
  console.log(data)
  return data;
})

// API(POST) for create task
export const createTask = createAsyncThunk("tasks/createTask", async () => {
  const URL = "http://localhost:8000/api/tasks"
  const METADATA = {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({ title: "Warning", description: "IB" })}
  const response = await fetch(URL, METADATA)
  const data = response.json();
  console.log(data)
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {tasks: [], status: "idle", error: null,},
  reducers: {addTask : (state, action) => {state.tasks.push(action.payload);}},
  extraReducers: (builder) => {builder.addCase(fetchTasks.pending, (state) => {state.status = "loading";}).addCase(fetchTasks.fulfilled, (state, action) => {state.status = "succeeded"; state.tasks = action.payload;}).addCase(fetchTasks.rejected, (state, action) => {state.status = "failed"; state.error = action.error.message;});}
})

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;