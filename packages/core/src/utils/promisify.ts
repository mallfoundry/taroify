import * as _ from "lodash"

export function isPromise<T = any>(val: any): val is Promise<T> {
  return _.isObjectLike(val) && _.isFunction((val as Promise<T>).then) && _.isFunction(val.catch)
}

export function fulfillPromise(promise: PromiseLike<any>) {
  if (isPromise(promise)) {
    promise?.then(
      () => {},
      () => {},
    )
  }
}
