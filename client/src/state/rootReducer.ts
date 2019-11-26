import { combineReducers } from "@reduxjs/toolkit"
import { reducer as toDosReducer } from "./toDosSlice"

export const rootReducer = combineReducers({ toDos: toDosReducer })

export type RootState = ReturnType<typeof rootReducer>
