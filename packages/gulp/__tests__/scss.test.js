describe("gulp scss", () => {
  it("dist ?? bundle", () => {
    const bundle = "core"
    const dist = undefined
    expect(dist ?? bundle).toBe("core")
  })
})
