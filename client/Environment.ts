import React from "react"
import { toDoApi, ToDoApi } from "./api/domain"

export interface Environment {
  toDoApi: ToDoApi
}

export const environment = {
  toDoApi,
}

export const EnvironmentContext = React.createContext(environment)
