import React from "react"
import { Provider } from "react-redux"
import { createStore, Store } from "../src/state/store"
import { render } from "@testing-library/react"
import { createMemoryHistory, History } from "history"
import { Router, Route } from "react-router-dom"
import { actionOf } from "../src/common/actions"
import { Environment, EnvironmentContext } from "../src/Environment"

const defaultEnvironment = {
  toDoApi: {
    getAll: jest.fn(() => actionOf(undefined)),
    getOne: jest.fn(() => actionOf(undefined)),
  },
} as any

type WrapperRenderOptions = {
  environment?: Environment
  route?: string
  path?: string
  history?: History
  store?: Store
}

export const buildTestWrapper = ({
  environment = defaultEnvironment,
  route = "/",
  path = "/",
  history = createMemoryHistory({ initialEntries: [route] }),
  store = createStore(),
}: WrapperRenderOptions): React.FC => ({ children }) => (
  <EnvironmentContext.Provider value={environment}>
    <Provider store={store}>
      <Router history={history}>
        <Route path={path}>{children}</Route>
      </Router>
    </Provider>
  </EnvironmentContext.Provider>
)

export const renderWithTestWrapper = (
  ui: React.ReactElement,
  {
    environment = defaultEnvironment,
    route = "/",
    path = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    store = createStore(),
  }: WrapperRenderOptions,
) => {
  const Wrapper = buildTestWrapper({ environment, route, path, history, store })
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  }
}
