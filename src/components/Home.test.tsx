import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { wait, fireEvent } from "@testing-library/react"
import { Home } from "./Home"
import { ToDo } from "../api/domain"
import { actionOf, actionErrorOf } from "../common/actions"
import { renderWithTestWrapper } from "../test/helpers"
import { act } from "react-dom/test-utils"

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
    const environment = {
      toDoApi: toDoApiStub,
    } as any

    const { getByText } = renderWithTestWrapper(<Home />, { environment })

    expect(getByText("Loading...")).toBeInTheDocument()

    await wait(() => getByText("Some Title 1"))
    expect(getByText("Some Title 2")).toBeInTheDocument()
  })

  it("display an error message on failing to fetch ToDos", async () => {
    const errMsg = "some error"
    const toDoApiStub = {
      getAll: () => actionErrorOf(new Error(errMsg)),
    }
    const environment = {
      toDoApi: toDoApiStub,
    } as any

    const { getByText } = renderWithTestWrapper(<Home />, { environment })

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
    const environment = {
      toDoApi: toDoApiStub,
    } as any
    const { getByText, history } = renderWithTestWrapper(<Home />, {
      environment,
      route: `/todo/${toDo.id}`,
      path: "/todo/:id",
    })

    await wait(() => getByText("Some Title"))

    act(() => {
      fireEvent.click(getByText(/Show/i))
    })

    expect(history.location.pathname).toBe(`/todo/${toDo.id}`)
  })
})
