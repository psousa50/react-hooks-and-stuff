import { createSlice, PayloadAction } from "redux-starter-kit"
import { ToDo } from "../api/domain"

interface ToDoState {
  toDos: ToDo[]
  loading: boolean
  error: string | undefined
}

const initialState: ToDoState = {
  toDos: [],
  loading: false,
  error: undefined,
}

const toDoSlice = createSlice({
  name: "ToDo",
  initialState,
  reducers: {
    onGetTodosStart: state => {
      state.loading = true
    },
    onGetTodosSuccess: (state, action: PayloadAction<ToDo[]>) => {
      state.toDos = action.payload
      state.loading = false
    },
    onGetTodosError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { onGetTodosStart, onGetTodosSuccess, onGetTodosError } = toDoSlice.actions

export const reducer = toDoSlice.reducer
