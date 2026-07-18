import { act, render, waitFor } from "@testing-library/react"
import * as React from "react"
import Form, { type FormInstance } from "../index"

describe("<Form />", () => {
  it("should submit nested values for dotted field names", async () => {
    const ref = React.createRef<FormInstance>()
    const onSubmit = jest.fn()

    render(
      <Form
        ref={ref}
        defaultValues={{
          team_up: {
            minimum: 1,
            maximum: 2,
          },
        }}
        onSubmit={onSubmit}
      >
        <Form.Item name="team_up.minimum" />
        <Form.Item name="team_up.maximum" />
      </Form>,
    )

    act(() => ref.current?.submit())

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    const values = onSubmit.mock.calls[0][0].detail.value
    const expectedValues = {
      team_up: {
        minimum: 1,
        maximum: 2,
      },
    }
    expect(values).toEqual(expectedValues)
    expect(JSON.parse(JSON.stringify(values))).toEqual(expectedValues)
    expect(values["team_up.minimum"]).toBe(1)
    expect(values["team_up.maximum"]).toBe(2)
  })
})
