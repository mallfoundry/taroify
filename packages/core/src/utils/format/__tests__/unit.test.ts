import { unitToPx } from "../unit"

describe("Unit", () => {
  // The default button contains prefix--contained --medium --default
  it("10px should be 10", () => {
    const unit = unitToPx("10px")
    expect(unit).toBe(10)
  })
})
