import "@testing-library/jest-dom/extend-expect"
import React, { ComponentType } from "react"
import { render, wait, fireEvent } from "@testing-library/react"
import { Home } from "./Home"
import { ToDo } from "../api/domain"
import { actionOf, actionErrorOf } from "../common/actions"
import { withEnvAndStore, withRouter as renderWithRouter } from "../test/helpers"

describe("Home", () => {
  it("display a list of all ToDos", async () => {
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

    const toDoApiStub = {
      getAll: () => actionOf([toDo1, toDo2]),
    }
    const env = {
      toDoApi: toDoApiStub,
    } as any

    const WrappedHome = withEnvAndStore(Home, env)
    const { getByText } = renderWithRouter(<WrappedHome />)

    expect(getByText("Loading...")).toBeInTheDocument()

    await wait(() => getByText("Some Title 1"))
    expect(getByText("Some Title 2")).toBeInTheDocument()
  })

  it("display an error message on failing to fetch ToDos", async () => {
    const errMsg = "some error"
    const toDoApiStub = {
      getAll: () => actionErrorOf(new Error(errMsg)),
    }
    const env = {
      toDoApi: toDoApiStub,
    } as any

    const WrappedHome = withEnvAndStore(Home, env)
    const { getByText } = renderWithRouter(<WrappedHome />)

    await wait(() => getByText(RegExp(errMsg)))
  })

  it("Redirects to ToDo page when a ToDo is clicked", async () => {
    const toDo: ToDo = {
      id: 1,
      userId: 3,
      title: "Some Title",
      completed: false,
    }

    const toDoApiStub = {
      getAll: () => actionOf([toDo]),
    }
    const env = {
      toDoApi: toDoApiStub,
    } as any
    const WrappedHome = withEnvAndStore(Home, env)
    const { getByText, history } = renderWithRouter(<WrappedHome />)

    await wait(() => getByText("Some Title"))

    fireEvent.click(getByText(/Show/i))

    expect(history.location.pathname).toBe("/todo")
  })
})
