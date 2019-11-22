import { left, right } from "fp-ts/lib/Either"
import { TaskEither, fromEither, tryCatch, chain } from "fp-ts/lib/TaskEither"

export type ActionResult<R = void> = TaskEither<Error, R>
export type Action<I = void, R = void> = (i: I) => ActionResult<R>

export const actionOf = <T>(v: T): ActionResult<T> => fromEither(right(v))
export function actionErrorOf<R>(error: Error): ActionResult<R> {
  return fromEither(left<Error, R>(error))
}

export const toAction = <R = void>(lazyPromise: () => Promise<R>) => tryCatch(lazyPromise, error => error as Error)

export const chainLogTE = <I, R>(m: string, action: Action<I, R>) =>
  chain((v: I) => {
    console.log(`${m}=>`, v)
    return action(v)
  })
