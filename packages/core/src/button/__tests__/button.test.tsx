import { ArrowLeft as Icon } from "@taroify/icons"
import { fireEvent, render } from "@testing-library/react"
import * as React from "react"
import Loading from "../../loading/loading"
import { prefixClassname } from "../../styles"
import Button, { ButtonContext, type ButtonProps, createButton } from ".."

function getButton(container: HTMLElement) {
  return container.querySelector(`.${prefixClassname("button")}`) as HTMLElement
}

function getNativeButton(container: HTMLElement) {
  return container.querySelector(`.${prefixClassname("button__button")}`) as HTMLElement
}

describe("<Button />", () => {
  it("renders with default classes and custom styles", () => {
    const { container } = render(
      <Button className="custom-button" style={{ color: "red" }}>
        Confirm
      </Button>,
    )
    const button = getButton(container)

    expect(button).toHaveClass(
      "custom-button",
      prefixClassname("button--contained"),
      prefixClassname("button--medium"),
      prefixClassname("button--default"),
    )
    expect(button).toHaveStyle({ color: "red" })
    expect(button).toHaveTextContent("Confirm")
    expect(button.querySelector(`.${prefixClassname("button__text")}`)).toHaveTextContent("Confirm")
  })

  it.each(["contained", "text", "outlined"] as const)("renders the %s variant", (variant) => {
    const { container } = render(<Button variant={variant} />)

    expect(getButton(container)).toHaveClass(prefixClassname(`button--${variant}`))
  })

  it.each(["square", "round"] as const)("renders the %s shape", (shape) => {
    const { container } = render(<Button shape={shape} />)

    expect(getButton(container)).toHaveClass(prefixClassname(`button--${shape}`))
  })

  it.each(["mini", "small", "medium", "large"] as const)("renders at the %s size", (size) => {
    const { container } = render(<Button size={size} />)

    expect(getButton(container)).toHaveClass(prefixClassname(`button--${size}`))
  })

  it.each(["default", "primary", "info", "success", "warning", "danger"] as const)(
    "renders with the %s color",
    (color) => {
      const { container } = render(<Button color={color} />)

      expect(getButton(container)).toHaveClass(prefixClassname(`button--${color}`))
    },
  )

  it("renders block and hairline states", () => {
    const { container } = render(<Button block hairline />)

    expect(getButton(container)).toHaveClass(
      prefixClassname("button--block"),
      prefixClassname("button--hairline"),
      prefixClassname("hairline--surround"),
    )
  })

  it.each([
    ["button", null],
    ["submit", "submit"],
    ["reset", "reset"],
  ] as const)("maps formType=%s to the native button", (formType, expected) => {
    const { container } = render(<Button formType={formType} />)
    const nativeButton = getNativeButton(container)

    if (expected) {
      expect(nativeButton).toHaveAttribute("form-type", expected)
    } else {
      expect(nativeButton).not.toHaveAttribute("form-type")
    }
  })

  it("passes native button props to ButtonBase instead of the wrapper", () => {
    const { container } = render(
      <Button id="native-button" openType="contact" data-testid="native-button" />,
    )
    const button = getButton(container)
    const nativeButton = getNativeButton(container)

    expect(button).not.toHaveAttribute("id")
    expect(button).not.toHaveAttribute("open-type")
    expect(nativeButton).toHaveClass(prefixClassname("button-base"))
    expect(nativeButton).toHaveAttribute("id", "native-button")
    expect(nativeButton).toHaveAttribute("open-type", "contact")
    expect(nativeButton).toHaveAttribute("data-testid", "native-button")
  })

  it.each([
    ["left", "button__icon--right"],
    ["right", "button__icon--left"],
  ] as const)("renders the icon prop on the %s", (iconPosition, spacingClass) => {
    const { container, getByTestId } = render(
      <Button icon={<Icon data-testid="button-icon" />} iconPosition={iconPosition}>
        Continue
      </Button>,
    )

    expect(getByTestId("button-icon")).toHaveClass(prefixClassname(spacingClass))

    const content = container.querySelector(`.${prefixClassname("button__content")}`)
    const children = Array.from(content?.children ?? [])
    expect(children[iconPosition === "left" ? 0 : children.length - 1]).toBe(
      getByTestId("button-icon"),
    )
  })

  it("adds spacing classes to icon children at both edges", () => {
    const { container, getByTestId } = render(
      <Button>
        <Icon data-testid="start-icon" />
        Continue
        <Icon data-testid="end-icon" />
      </Button>,
    )

    expect(getByTestId("start-icon")).toHaveClass(prefixClassname("button__icon--right"))
    expect(getByTestId("end-icon")).toHaveClass(prefixClassname("button__icon--left"))
    expect(container.querySelector(`.${prefixClassname("button__text")}`)).toHaveTextContent(
      "Continue",
    )
  })

  it("uses custom Button.Content without adding another content wrapper", () => {
    const { container } = render(
      <Button>
        <Button.Content className="custom-content" id="button-content">
          Custom
        </Button.Content>
      </Button>,
    )
    const contents = container.querySelectorAll(`.${prefixClassname("button__content")}`)

    expect(contents).toHaveLength(1)
    expect(contents[0]).toHaveClass("custom-content")
    expect(contents[0]).toHaveAttribute("id", "button-content")
    expect(contents[0]).toHaveTextContent("Custom")
  })

  it("renders the default loading indicator and disables interaction", () => {
    const onClick = jest.fn()
    const { container } = render(
      <Button loading onClick={onClick}>
        Loading
      </Button>,
    )
    const button = getButton(container)

    expect(button).toHaveClass(prefixClassname("button--loading"))
    expect(container.querySelector(`.${prefixClassname("button__loading")}`)).toHaveClass(
      prefixClassname("button__loading--right"),
    )
    expect(getNativeButton(container)).toHaveAttribute("disabled")

    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("renders a loading indicator from LoadingProps", () => {
    const { container } = render(
      <Button
        loading={{
          className: "custom-loading",
          id: "custom-loading",
          size: 20,
          type: "spinner",
        }}
      />,
    )
    const loading = container.querySelector("#custom-loading")
    const spinner = container.querySelector(`.${prefixClassname("loading__spinner")}`)

    expect(loading).toHaveClass(
      "custom-loading",
      prefixClassname("button__loading"),
      prefixClassname("button__loading--right"),
      prefixClassname("loading--spinner"),
    )
    expect(spinner).toHaveStyle({ width: "20px", height: "20px" })
  })

  it("preserves props from a custom Loading element", () => {
    const { container } = render(
      <Button loading={<Loading id="element-loading" type="spinner" />}>Loading</Button>,
    )
    const loading = container.querySelector("#element-loading")

    expect(loading).toHaveClass(
      prefixClassname("button__loading"),
      prefixClassname("button__loading--right"),
      prefixClassname("loading--spinner"),
    )
  })

  it("calls both the prop and context click handlers", () => {
    const onClick = jest.fn()
    const onContextClick = jest.fn()
    const { container } = render(
      <ButtonContext.Provider value={{ onClick: onContextClick }}>
        <Button color="danger" onClick={onClick}>
          Delete
        </Button>
      </ButtonContext.Provider>,
    )

    fireEvent.click(getButton(container))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onContextClick).toHaveBeenCalledTimes(1)
    expect(onContextClick).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ color: "danger", children: "Delete", onClick }),
    )
  })

  it.each<[string, ButtonProps]>([
    ["disabled", { disabled: true }],
    ["loading", { loading: true }],
  ])("does not call handlers while %s", (_, stateProps) => {
    const onClick = jest.fn()
    const onContextClick = jest.fn()
    const { container } = render(
      <ButtonContext.Provider value={{ onClick: onContextClick }}>
        <Button {...stateProps} onClick={onClick}>
          Continue
        </Button>
      </ButtonContext.Provider>,
    )

    fireEvent.click(getButton(container))

    expect(onClick).not.toHaveBeenCalled()
    expect(onContextClick).not.toHaveBeenCalled()
    expect(getNativeButton(container)).toHaveAttribute("disabled")
  })

  it("creates a button from children and additional props", () => {
    const { container } = render(createButton("Create", { color: "primary", id: "created" }))

    expect(getButton(container)).toHaveClass(prefixClassname("button--primary"))
    expect(getButton(container)).toHaveTextContent("Create")
    expect(getNativeButton(container)).toHaveAttribute("id", "created")
  })

  it("creates a button from a props object and lets additional props override it", () => {
    const { container } = render(
      createButton(
        { children: "Original", color: "primary", id: "original" },
        { color: "danger", id: "override" },
      ),
    )

    expect(getButton(container)).toHaveClass(prefixClassname("button--danger"))
    expect(getButton(container)).toHaveTextContent("Original")
    expect(getNativeButton(container)).toHaveAttribute("id", "override")
  })
})

describe("<Button.Group />", () => {
  it("renders group modifiers, view props, and shared child properties", () => {
    const onClick = jest.fn()
    const { container } = render(
      <Button.Group
        variant="outlined"
        shape="round"
        size="small"
        color="primary"
        block
        hairline
        disabled
        className="custom-group"
        id="button-group"
        style={{ color: "blue" }}
      >
        <Button onClick={onClick}>First</Button>
        <Button>Second</Button>
      </Button.Group>,
    )
    const group = container.querySelector(`.${prefixClassname("button-group")}`)
    const buttons = container.querySelectorAll(`.${prefixClassname("button")}`)

    expect(group).toHaveClass(
      "custom-group",
      prefixClassname("button-group--outlined"),
      prefixClassname("button-group--round"),
      prefixClassname("button-group--block"),
    )
    expect(group).toHaveAttribute("id", "button-group")
    expect(group).toHaveStyle({ color: "blue" })
    expect(buttons).toHaveLength(2)

    for (const button of Array.from(buttons)) {
      expect(button).toHaveClass(
        prefixClassname("button--outlined"),
        prefixClassname("button--round"),
        prefixClassname("button--small"),
        prefixClassname("button--primary"),
        prefixClassname("button--hairline"),
        prefixClassname("button--disabled"),
      )
    }

    fireEvent.click(buttons[0])
    expect(onClick).not.toHaveBeenCalled()
  })

  it("lets button props override group properties", () => {
    const { container } = render(
      <Button.Group variant="outlined" shape="round" size="small" color="primary">
        <Button variant="text" shape="square" size="large" color="danger">
          Override
        </Button>
      </Button.Group>,
    )
    const button = getButton(container)

    expect(button).toHaveClass(
      prefixClassname("button--text"),
      prefixClassname("button--square"),
      prefixClassname("button--large"),
      prefixClassname("button--danger"),
    )
    expect(button).not.toHaveClass(
      prefixClassname("button--outlined"),
      prefixClassname("button--round"),
      prefixClassname("button--small"),
      prefixClassname("button--primary"),
    )
  })
})
