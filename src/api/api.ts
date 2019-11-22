import { pipe } from "fp-ts/lib/pipeable"
import axios, { AxiosResponse } from "axios"
import { ActionResult, toAction, actionOf, actionErrorOf } from "./actions"
import { chain, map } from "fp-ts/lib/TaskEither"

export interface ToDo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const mapResponse = <T>(response: AxiosResponse<T>): ActionResult<T> =>
  response.status < 300 ? actionOf(response.data) : actionErrorOf(new Error(response.statusText))

export interface ToDoApi {
  getOne: (id: number) => ActionResult<ToDo>
  getAll: () => ActionResult<ToDo[]>
}

export const toDoApi: ToDoApi = {
  getOne: id =>
    pipe(
      toAction(() => axios.get<ToDo>(`https://jsonplaceholder.typicode.com/todos/${id}`)),
      chain(mapResponse),
    ),

  getAll: () =>
    pipe(
      toAction(() => axios.get<ToDo[]>(`https://jsonplaceholder.typicode.com/todos`)),
      chain(mapResponse),
      map(td => td.slice(0, 10)),
    ),
}
