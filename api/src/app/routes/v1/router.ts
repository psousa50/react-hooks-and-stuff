import { Response, Router } from "express"
import { right } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/pipeable"
import { bimap, run } from "fp-ts/lib/ReaderTaskEither"
import { task } from "fp-ts/lib/Task"
import { ErrorCodes, ServiceError } from "../../../common/actions"
import { Environment } from "../../../common/environment"

const errorHandler = (res: Response) => (error: ServiceError) => {
  res.sendStatus(error.dependencyError ? (error.errorCode === ErrorCodes.NOT_FOUND ? 404 : 502) : 400)
}

const okHandler = (res: Response) => (responseBody: any) => {
  res.contentType("application/json")
  res.status(200)
  res.json(responseBody)
}

export const router = (env: Environment) =>
  Router().get("/todos", async (_, res) => {
    await run(
      pipe(() => task.of(right("Hello")), bimap(errorHandler(res), okHandler(res))),
      env,
    )
  })
