import React from "react"
import { Home } from "./Home"
import { ToDo } from "./ToDo"
import { EnvironmentContext, environment } from "../Environment"
import { Provider } from "react-redux"
import { store } from "../state/store"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const App: React.FC = () => (
  <EnvironmentContext.Provider value={environment}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/todo">
            <ToDo />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </EnvironmentContext.Provider>
)

export default App
