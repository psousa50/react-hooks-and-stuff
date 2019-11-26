import "@testing-library/jest-dom/extend-expect"
import { actionOf } from "../common/actions"
import React from "react"
import { ToDo } from "./ToDo"
import { wait } from "@testing-library/react"
import { renderWithTestWrapper } from "../../test/helpers"

describe("ToDo", () => {
  it("Renders a ToDo", async () => {
    const toDo = {
      id: 1,
      userId: 3,
      title: "Some Title",
      completed: false,
    }

    const toDoApiStub = {
      getOne: jest.fn(() => actionOf(toDo)),
    }
    const environment = {
      toDoApi: toDoApiStub,
    } as any

    const { getByText } = renderWithTestWrapper(<ToDo />, { environment, route: `/todo/${toDo.id}`, path: "/todo/:id" })

    expect(toDoApiStub.getOne).toHaveBeenCalledWith(toDo.id)

    expect(getByText("Loading...")).toBeInTheDocument()

    await wait(() => expect(getByText("Some Title")).toBeInTheDocument())
  })
})
