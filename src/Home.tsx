import React from "react"
import { useFetchTodos } from "./api/hooks"

export const Home: React.FC = () => {
  const { toDos, loading, error } = useFetchTodos()

  return error ? (
    <div>{`Error: ${error}`}</div>
  ) : loading ? (
    <div>{"Loading..."}</div>
  ) : (
    <div>
      <h1>{"TO DOs"}</h1>
      {toDos.map(todo => (
        <div key={todo.id}>
          <div>{todo.title}</div>
        </div>
      ))}
    </div>
  )
}
