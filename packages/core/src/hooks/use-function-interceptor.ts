import * as FakePromise from "promise"
import { isPromise } from "../utils/promisify"

export type FunctionInterceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void

export default function useFunctionInterceptor(interceptor?: FunctionInterceptor) {
  return (...args: any) =>
    new FakePromise<void>((resolve, reject) => {
      if (interceptor) {
        const result = interceptor.apply(null, args)
        if (isPromise(result)) {
          result
            .then((value) => {
              if (value) {
                resolve()
              } else {
                reject()
              }
            })
            .catch(reject)
        } else if (result) {
          resolve()
        } else {
          reject()
        }
      } else {
        resolve()
      }
    })
}
