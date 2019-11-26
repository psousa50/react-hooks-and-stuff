import { configureStore } from "redux-starter-kit"
import { rootReducer } from "./rootReducer"

export const createStore = () => configureStore({ reducer: rootReducer })

export const store = createStore()

export type Store = typeof store
