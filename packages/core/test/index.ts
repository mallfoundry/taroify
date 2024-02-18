export function sleep(time: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export * from "./event"
