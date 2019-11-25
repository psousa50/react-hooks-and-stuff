import axios from "axios"
import { toDoApi } from "./domain"
import { actionOf } from "../common/actions"
import { right, left } from "fp-ts/lib/Either"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("domain", () => {
  describe("getAll", () => {
    it("returns a list of toDos", async () => {
      const toDos = [{ some: "toDo" }]
      mockedAxios.get.mockResolvedValue(Promise.resolve({ status: 200, data: toDos }))

      const result = await toDoApi.getAll()()
      expect(result).toEqual(right(toDos))
    })

    it("returns an error if async call returns an error status", async () => {
      const errorMessage = "Some error"
      mockedAxios.get.mockResolvedValue(Promise.resolve({ status: 400, statusText: errorMessage }))

      const result = await toDoApi.getAll()()
      expect(result).toEqual(left(new Error(errorMessage)))
    })

    it("returns an error if async call fails", async () => {
      const errorMessage = "Some error"
      const error = new Error(errorMessage)
      mockedAxios.get.mockResolvedValue(Promise.reject(error))

      const result = await toDoApi.getAll()()
      expect(result).toEqual(left(error))
    })
  })
})
