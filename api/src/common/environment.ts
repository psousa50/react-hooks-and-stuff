import { pipe } from "fp-ts/lib/pipeable"
import { map } from "fp-ts/lib/TaskEither"
import { MongoClient } from "mongodb"
import { connect } from "../mongo/connect"
import { AppConfig, appConfig } from "./config"
import { FetchAction, fetchAction } from "./fetch"

export type Environment = {
  config: AppConfig
  dbClient: MongoClient
  fetch: FetchAction
}

export const buildEnvironment = () => {
  const config = appConfig.get()

  const mongoUri = process.env.MONGODB_URI || config.mongodb.uri || ""
  return pipe(
    connect(mongoUri),
    map(mongoClient => ({
      config,
      dbClient: mongoClient,
      fetch: fetchAction,
    })),
  )
}
