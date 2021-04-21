describe("gulp scss", () => {
  it("dist ?? bundle", () => {
    const bundle = "core", dist = undefined
    expect(dist ?? bundle).toBe("core")
  })
})
