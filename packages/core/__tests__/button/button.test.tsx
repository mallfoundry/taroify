import * as React from "react"
import { create } from "react-test-renderer"
import Button from "../../src/button/button"

describe("Button", () => {
  it("show", () => {
    const component = create(<Button />)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
