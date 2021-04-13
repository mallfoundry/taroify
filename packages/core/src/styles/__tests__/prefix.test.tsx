import { prefixClassname } from "../index"

const __PREFIX = "taroify-"

describe("Prefix classname", () => {
  it(`should be taroify-test`, () => {
    expect(prefixClassname("test")).toBe(`${__PREFIX}test`)
  })
})
