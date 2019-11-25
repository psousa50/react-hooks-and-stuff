import { configureStore, Action } from "redux-starter-kit"
import { ThunkAction } from "redux-thunk"
import { rootReducer, RootState } from "./rootReducer"

export const createStore = () => configureStore({ reducer: rootReducer })

export const store = createStore()

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
