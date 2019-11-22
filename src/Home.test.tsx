import "@testing-library/jest-dom/extend-expect"
import React, { ComponentType } from "react"
import { render, wait } from "@testing-library/react"
import { EnvironmentContext, Environment } from "./Environment"
import { Home } from "./Home"
import { Provider } from "react-redux"
import { store } from "./state/store"
import { ToDo } from "./api/api"
import { actionOf, actionErrorOf } from "./api/actions"

const withEnvAndStore = <P extends {}>(Component: ComponentType<P>, env: Environment) => (props: P) => (
  <EnvironmentContext.Provider value={env}>
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  </EnvironmentContext.Provider>
)

describe("Home", () => {
  it("display all Todos", async () => {
    const toDo1: ToDo = {
      id: 1,
      userId: 3,
      title: "Some Title 1",
      completed: false,
    }
    const toDo2: ToDo = {
      id: 2,
      userId: 3,
      title: "Some Title 2",
      completed: false,
    }

    const toDoApiForTest = {
      getAll: () => actionOf([toDo1, toDo2]),
    }
    const env = {
      toDoApi: toDoApiForTest,
    } as any

    const WrappedHome = withEnvAndStore(Home, env)
    const { getByText } = render(<WrappedHome />)

    expect(getByText("Loading...")).toBeInTheDocument()

    await wait(() => getByText("Some Title 1"))
    expect(getByText("Some Title 2")).toBeInTheDocument()
  })

  it("display an error message on failing to fetch ToDos", async () => {
    const errMsg = "some error"
    const toDoApiForTest = {
      getAll: () => actionErrorOf(new Error(errMsg)),
    }
    const env = {
      toDoApi: toDoApiForTest,
    } as any

    const WrappedHome = withEnvAndStore(Home, env)
    const { getByText } = render(<WrappedHome />)

    await wait(() => getByText(RegExp(errMsg)))
  })
})
