import React, { ComponentType } from "react"
import { EnvironmentContext, Environment } from "../Environment"
import { Provider } from "react-redux"
import { createStore } from "../state/store"
import { render } from "@testing-library/react"
import { createMemoryHistory, History } from "history"
import { Router, Route } from "react-router-dom"

export const withEnvAndStore = <P extends {}>(Component: ComponentType<P>, env: Environment) => (props: P) => {
  const store = createStore()

  return (
    <EnvironmentContext.Provider value={env}>
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    </EnvironmentContext.Provider>
  )
}

type Options<T> = { route?: string; history?: History<T> }
export function withRouter<T extends {}>(
  ui: React.ReactElement,
  { route = "/", history = createMemoryHistory<T>({ initialEntries: [route] }) }: Options<T> = {},
) {
  const Wrapper: React.FC = ({ children }) => <Router history={history}>{children}</Router>
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  }
}
