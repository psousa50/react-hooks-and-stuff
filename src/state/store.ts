import { configureStore, Action } from "redux-starter-kit"
import { ThunkAction } from "redux-thunk"
import { rootReducer, RootState } from "./rootReducer"

export const store = configureStore({ reducer: rootReducer })

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
