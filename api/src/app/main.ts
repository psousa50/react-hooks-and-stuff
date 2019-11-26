import express, { Express } from "express"
import { pipe } from "fp-ts/lib/pipeable"
import { chain, fromTaskEither, map } from "fp-ts/lib/ReaderTaskEither"
import { tryCatch } from "fp-ts/lib/TaskEither"
import { Server } from "http"
import { Action, ask } from "../common/actions"
import { logDebug } from "../common/debug"
import { router as v1Router } from "./routes/v1/router"

import { ErrorRequestHandler, RequestHandler } from "express"

export const errorRequestHandler: ErrorRequestHandler = (_, __, res) => res.sendStatus(500)

export const notFoundHandler: RequestHandler = (_, res) => res.sendStatus(404)

export const createApp: Action<void, Express> = () =>
  pipe(
    ask(),
    map(environment => {
      const app: Express = express()
      app.use("/api/v1", v1Router(environment))
      app.all("*", notFoundHandler)
      app.use(errorRequestHandler)

      return app
    }),
  )

export const runServer: Action<Express, Server> = app =>
  pipe(
    ask(),
    chain(env =>
      fromTaskEither(
        tryCatch(
          () =>
            new Promise<Server>((resolve, reject) => {
              try {
                const port = process.env.PORT || env.config.port
                const server: Server = app.listen(port, () => {
                  logDebug(`Server started, listening at ${port}...`)
                  return resolve(server)
                })
                server.on("checkContinue", (__, res) => {
                  res.writeContinue()
                })
                server.once("error", (err: Error) => {
                  return reject(err)
                })
              } catch (err) {
                reject(err)
              }
            }),
          (e: any) => e,
        ),
      ),
    ),
  )

export const expressApp = pipe(createApp(), chain(runServer))
