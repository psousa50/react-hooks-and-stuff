import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ToDo } from "../api/domain"

interface ToDoState {
  toDos: ToDo[]
  toDo: ToDo | undefined
  loading: boolean
  error: string | undefined
}

const initialState: ToDoState = {
  toDos: [],
  toDo: undefined,
  loading: false,
  error: undefined,
}

const toDoSlice = createSlice({
  name: "ToDos",
  initialState,
  reducers: {
    onGetToDosStart: state => {
      state.loading = true
    },
    onGetToDosSuccess: (state, action: PayloadAction<ToDo[]>) => {
      state.toDos = action.payload
      state.loading = false
    },
    onGetToDosError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    onGetToDoStart: state => {
      state.loading = true
    },
    onGetToDoSuccess: (state, action: PayloadAction<ToDo>) => {
      state.toDo = action.payload
      state.loading = false
    },
    onGetToDoError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  onGetToDosStart,
  onGetToDosSuccess,
  onGetToDosError,
  onGetToDoStart,
  onGetToDoSuccess,
  onGetToDoError,
} = toDoSlice.actions

export const reducer = toDoSlice.reducer
