import convict from "convict"

export interface AppConfig {
  mongodb: {
    uri: string
  }
  nodeEnv: string
  port: number
}

export const appConfig = convict<AppConfig>({
  mongodb: {
    uri: {
      default: "mongodb://localhost:27017/ToDo",
      doc: "",
      env: "MONGODB_URI",
      format: "url",
    },
  },
  nodeEnv: {
    default: "development",
    doc: "Running in an environment, or on a developer machine? Mainly used to decide log structure etc",
    env: "NODE_ENV",
    format: ["production", "development", "test"],
  },
  port: {
    default: 3000,
    doc: "",
    env: "PORT",
    format: "port",
  },
})

export const isDev = (c: AppConfig) => c.nodeEnv === "development"
