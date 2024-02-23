import { render, fireEvent } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import Button, { createButton } from "../button"
import Loading from "../../loading/loading"
import { ArrowLeft as Icon } from "@taroify/icons"
import ButtonContent from "../button-content"
import ButtonGroupContext from "../button-group.context"


describe("<Button />", () => {
  // The default button contains prefix--contained --medium --default
  it("should have default classNames", () => {
    const { container } = render(<Button />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(
      "taroify-button--contained",
      "taroify-button--medium",
      "taroify-button--default",
    )
  })

  it("should have disabled className", () => {
    const { container } = render(<Button disabled />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass("taroify-button--disabled")
  })

  it("should have block className", () => {
    const { container } = render(<Button block />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--block")}`)
  })

  it("should be hairline button", () => {
    const { container } = render(<Button hairline />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(
      `${prefixClassname("button--hairline")}`,
      `${prefixClassname("hairline--surround")}`,
    )
  })

  it("should be hairline button", () => {
    const { container } = render(<Button hairline />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(
      `${prefixClassname("button--hairline")}`,
      `${prefixClassname("hairline--surround")}`,
    )
  })

  it("should be text button", () => {
    const { container } = render(<Button variant="text" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--text")}`)
  })

  it("should be outlined button", () => {
    const { container } = render(<Button variant="outlined" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--outlined")}`)
  })

  it("should be round button", () => {
    const { container } = render(<Button shape="round" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--round")}`)
  })

  it("should be mini button", () => {
    const { container } = render(<Button size="mini" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--mini")}`)
  })

  it("should be small button", () => {
    const { container } = render(<Button size="small" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--small")}`)
  })

  it("should be medium button", () => {
    const { container } = render(<Button size="medium" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--medium")}`)
  })

  it("should be large button", () => {
    const { container } = render(<Button size="large" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--large")}`)
  })

  it("should be default button", () => {
    const { container } = render(<Button color="default" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--default")}`)
  })

  it("should be primary button", () => {
    const { container } = render(<Button color="primary" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--primary")}`)
  })

  it("should be info button", () => {
    const { container } = render(<Button color="info" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--info")}`)
  })

  it("should be success button", () => {
    const { container } = render(<Button color="success" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--success")}`)
  })
  it("should be warning button", () => {
    const { container } = render(<Button color="warning" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--warning")}`)
  })

  it("should be danger button", () => {
    const { container } = render(<Button color="danger" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--danger")}`)
  })

  it("should be formType reset", () => {
    const { container } = render(<Button color="danger" formType="reset" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--danger")}`)
  })

  it("should be formType button", () => {
    const { container } = render(<Button color="danger" formType="button" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--danger")}`)
  })

  it("should be formType submit", () => {
    const { container } = render(<Button color="danger" formType="submit" />)
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--danger")}`)
  })

  it("should have children", () => {
    const { container } = render(
      <Button color="danger" formType="reset">
        Test
      </Button>,
    )
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--danger")}`)
  })

  it("should have startIcon", () => {
    const { container } = render(
      <Button color="danger" icon="icon">
        Test
      </Button>,
    )
    const el = container.querySelector(`.${prefixClassname("button")}`)
    expect(el).toHaveClass(`${prefixClassname("button--danger")}`)
  })

  it("should have loading state", () => {
    const { container } = render(
      <Button loading color="danger" icon="icon">
        Test
      </Button>,
    )
    const el = container.querySelector(`.${prefixClassname("button")}`);
    expect(el).toHaveClass(`${prefixClassname("button--loading")}`)
  })

  it("should render with custom loading props", () => {
    const { container } = render(
      <Button loading={{
        className: 'custom-loading',
        size: 20,
      }} color="danger" icon="icon">
        Test
      </Button>,
    )
    const el = container.querySelector(`.${prefixClassname("button")}`);
    expect(el).toHaveClass(`${prefixClassname("button--loading")}`)
  })

  it("should render with custom loading children", () => {
    const { container } = render(
      <Button iconPosition="right" loading={<Loading  className="test" />} color="danger" icon={<Icon className="test-icon" />}>
        Test
      </Button>,
    )
    const el = container.querySelector(`.${prefixClassname("button")}`);
    expect(el).toHaveClass(`${prefixClassname("button--loading")}`)
  })

  it("should render with ButtonContent", () => {
    const { container } = render(
      <Button color="danger">
        <ButtonContent className="custom-icon" />
      </Button>,
    )
    const el = container.querySelector(`.${prefixClassname("button")}`);
    expect(el).toBeInTheDocument();
  })

  it("should render with Button Content children", () => {
    const { container } = render(
      <Button color="danger">
        <Icon />
        <Icon />
      </Button>,
    )
    const el = container.querySelector(`.${prefixClassname("button")}`);
    expect(el).toBeInTheDocument();
  })

  it("should call onClick Event", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <Button onClick={mockOnClick} color="danger">Click Here</Button>,
    )
    const btn = container.querySelector(`.${prefixClassname("button")}`);
    if (!btn) throw "err";

    fireEvent.click(btn);

    expect(mockOnClick).toHaveBeenCalled();

  })

  it("should not call onClick Event", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <Button disabled loading onClick={mockOnClick} color="danger">Click Here</Button>,
    )
    const btn = container.querySelector(`.${prefixClassname("button")}`);
    if (!btn) throw "err";

    fireEvent.click(btn);

    expect(mockOnClick).toHaveBeenCalledTimes(0);

  })

  it("should render Button using createButton function with label only", () => {
    const button = createButton('Click Me');
    const { container } = render(button);
    const renderedBtn = container.querySelector(`.${prefixClassname("button")}`);
    expect(renderedBtn).toBeInTheDocument();
  })

  it("should render Button using createButton function with props only", () => {
    const button = createButton({
      id: 'btn1',
    });
    const { container } = render(button);
    const renderedBtn = container.querySelector(`.${prefixClassname("button")}`);
    expect(renderedBtn).toBeInTheDocument();
  })

  it("should render with buttonGroupContext", () => {
    const { container } = render(
      <ButtonGroupContext.Provider value={{
        variant: 'outlined',
      }}>
        <Button>Click Me</Button>
      </ButtonGroupContext.Provider>
    )

    expect(container.querySelector(`.${prefixClassname("button")}`)).toHaveTextContent('Click Me')

  })


})
