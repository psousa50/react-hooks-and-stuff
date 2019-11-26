import React from "react"
import { toDoApi, ToDoApi } from "./api/domain"

export interface Environment {
  toDoApi: ToDoApi
}

export const environment: Environment = {
  toDoApi,
}

export const EnvironmentContext = React.createContext(environment)
