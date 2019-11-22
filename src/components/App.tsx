import React from "react"
import { Home } from "./Home"
import { EnvironmentContext, environment } from "../Environment"
import { Provider } from "react-redux"
import { store } from "../state/store"

const App: React.FC = () => (
  <EnvironmentContext.Provider value={environment}>
    <Provider store={store}>
      <Home />
    </Provider>
  </EnvironmentContext.Provider>
)

export default App
