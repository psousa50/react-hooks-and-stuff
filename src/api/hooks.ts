import { useContext, useEffect } from "react"
import { EnvironmentContext } from "../Environment"
import { useDispatch, useSelector } from "react-redux"
import { onGetTodosStart, onGetTodosError, onGetTodosSuccess } from "../state/todSlice"
import { pipe } from "fp-ts/lib/pipeable"
import { task } from "fp-ts/lib/Task"
import { RootState } from "../state/rootReducer"
import { fold } from "fp-ts/lib/TaskEither"

export const useFetchTodos = () => {
  const { toDoApi } = useContext(EnvironmentContext)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = async () => {
      dispatch(onGetTodosStart())
      return await pipe(
        toDoApi.getAll(),
        fold(
          error => {
            dispatch(onGetTodosError(error.message))
            return task.of(undefined)
          },
          toDos => {
            dispatch(onGetTodosSuccess(toDos))
            return task.of(undefined)
          },
        ),
      )()
    }
    fetch()
  }, [dispatch, toDoApi])

  const { toDos, loading, error } = useSelector((state: RootState) => state.toDos)
  return { toDos, loading, error }
}
