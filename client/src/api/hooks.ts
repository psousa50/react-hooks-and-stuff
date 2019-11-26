import { useContext, useEffect } from "react"
import { EnvironmentContext } from "../Environment"
import { useDispatch, useSelector } from "react-redux"
import {
  onGetToDosStart,
  onGetToDosError,
  onGetToDosSuccess,
  onGetToDoStart,
  onGetToDoError,
  onGetToDoSuccess,
} from "../state/toDosSlice"
import { pipe } from "fp-ts/lib/pipeable"
import { task } from "fp-ts/lib/Task"
import { RootState } from "../state/rootReducer"
import { fold } from "fp-ts/lib/TaskEither"

export const useFetchToDos = () => {
  const { toDoApi } = useContext(EnvironmentContext)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = async () => {
      dispatch(onGetToDosStart())
      return await pipe(
        toDoApi.getAll(),
        fold(
          error => {
            dispatch(onGetToDosError(error.message))
            return task.of(undefined)
          },
          toDos => {
            dispatch(onGetToDosSuccess(toDos))
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

export const useFetchToDo = (id: number) => {
  const { toDoApi } = useContext(EnvironmentContext)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = async () => {
      dispatch(onGetToDoStart())
      return await pipe(
        toDoApi.getOne(id),
        fold(
          error => {
            dispatch(onGetToDoError(error.message))
            return task.of(undefined)
          },
          toDo => {
            dispatch(onGetToDoSuccess(toDo))
            return task.of(undefined)
          },
        ),
      )()
    }
    fetch()
  }, [dispatch, toDoApi, id])

  const { toDo, loading, error } = useSelector((state: RootState) => state.toDos)
  return { toDo, loading, error }
}
