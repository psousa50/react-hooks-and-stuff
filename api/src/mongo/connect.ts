import { TaskEither } from "fp-ts/lib/TaskEither"
import { MongoClient } from "mongodb"
import { promiseToTaskEither, ServiceError } from "../common/actions"

export const connect = (mongoDbUri: string): TaskEither<ServiceError, MongoClient> =>
  promiseToTaskEither(() =>
    MongoClient.connect(mongoDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  )
