import React from "react"
import { useFetchToDo } from "../api/hooks"
import { useParams } from "react-router"

export const ToDo: React.FC = () => {
  const { id } = useParams()

  const { toDo, loading } = useFetchToDo(parseInt(id!))

  return !toDo || loading ? (
    <div>{"Loading..."}</div>
  ) : (
    <div>
      <h2>{"ToDo"}</h2>
      <div>{toDo.title}</div>
    </div>
  )
}
