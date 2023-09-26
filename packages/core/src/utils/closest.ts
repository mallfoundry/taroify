export const closest = (arr: number[], target: number) =>
  arr.reduce((pre, cur) => (Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur))
