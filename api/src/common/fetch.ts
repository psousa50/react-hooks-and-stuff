import axios, { AxiosRequestConfig } from "axios"
import { promiseToAction } from "./actions"

type FetchConfig = AxiosRequestConfig & {
  url: string
}
export const fetchAction = <T>(config: FetchConfig) => promiseToAction(() => axios.get<T>(config.url, config))

export type FetchAction = typeof fetchAction
