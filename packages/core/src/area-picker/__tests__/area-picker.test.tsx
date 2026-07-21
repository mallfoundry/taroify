import { fireEvent, render } from "@testing-library/react"
import * as React from "react"
import { prefixClassname } from "../../styles"
import AreaPicker from "../index"
import type { AreaData } from "../area-picker.shared"
import { AREA_EMPTY_CODE, formatDataForCascade } from "../area-picker.shared"

const areaList: AreaData = {
  province_list: {
    "110000": "北京市",
    "330000": "浙江省",
  },
  city_list: {
    "110100": "北京市",
    "330100": "杭州市",
    "330200": "宁波市",
    "990100": "孤立城市",
  },
  county_list: {
    "110101": "东城区",
    "110102": "西城区",
    "330101": "上城区",
    "330102": "拱墅区",
    "330201": "海曙区",
    "330202": "江北区",
    "990101": "孤立区县",
  },
}

describe("formatDataForCascade", () => {
  it("builds province, city and county cascades and excludes orphaned areas", () => {
    const [options, provinceMap, cityMap] = formatDataForCascade({
      areaList,
      columnsNum: 3,
    })

    expect(options.map(({ value }) => value)).toEqual(["110000", "330000"])
    expect(options[1]).toMatchObject({
      label: "浙江省",
      value: "330000",
      children: [
        {
          label: "杭州市",
          value: "330100",
          children: [
            { label: "上城区", value: "330101" },
            { label: "拱墅区", value: "330102" },
          ],
        },
        {
          label: "宁波市",
          value: "330200",
          children: [
            { label: "海曙区", value: "330201" },
            { label: "江北区", value: "330202" },
          ],
        },
      ],
    })
    expect(provinceMap.get("33")).toBe(options[1])
    expect(cityMap.get("3302")).toBe(options[1].children?.[1])
    const cities = options.flatMap(({ children = [] }) => children)
    const counties = cities.flatMap(({ children = [] }) => children)
    expect(cities.map(({ label }) => label)).not.toContain("孤立城市")
    expect(counties.map(({ label }) => label)).not.toContain("孤立区县")
  })

  it("limits the generated hierarchy to the requested depth", () => {
    const [provinceOptions, , provinceCityMap] = formatDataForCascade({
      areaList,
      columnsNum: 1,
    })
    const [cityOptions] = formatDataForCascade({ areaList, columnsNum: 2 })

    expect(provinceOptions[0].children).toBeUndefined()
    expect(provinceCityMap).toHaveProperty("size", 0)
    expect(cityOptions[0].children?.[0]).toMatchObject({
      label: "北京市",
      value: "110100",
      children: undefined,
    })
  })

  it("uses the matching placeholder for every hierarchy level", () => {
    const [options] = formatDataForCascade({
      areaList,
      columnsNum: 3,
      columnsPlaceholder: ["请选择省份", "请选择城市", "请选择区县"],
    })

    expect(options[0]).toMatchObject({
      label: "请选择省份",
      value: AREA_EMPTY_CODE,
      children: [
        {
          label: "请选择城市",
          value: AREA_EMPTY_CODE,
          children: [{ label: "请选择区县", value: AREA_EMPTY_CODE }],
        },
      ],
    })
    expect(options[1].children?.[0]).toMatchObject({
      label: "请选择城市",
      value: AREA_EMPTY_CODE,
      children: [],
    })
    expect(options[1].children?.[1].children?.[0]).toMatchObject({
      label: "请选择区县",
      value: AREA_EMPTY_CODE,
    })
  })
})

describe("<AreaPicker />", () => {
  it("renders the default toolbar and three cascading columns", () => {
    const { container } = render(<AreaPicker areaList={areaList} title="选择地区" />)

    expect(container.querySelector(`.${prefixClassname("picker")}`)).toBeInTheDocument()
    expect(container.querySelector(`.${prefixClassname("picker__toolbar")}`)).toHaveTextContent(
      "取消选择地区确认",
    )
    expect(container.querySelectorAll(`.${prefixClassname("picker-column")}`)).toHaveLength(3)
    expect(container).toHaveTextContent("北京市")
    expect(container).toHaveTextContent("浙江省")
    expect(container).toHaveTextContent("东城区")
    expect(container).toHaveTextContent("西城区")
    expect(container).not.toHaveTextContent("杭州市")
  })

  it("uses defaultValue to select the initial cascade", () => {
    const onConfirm = jest.fn()
    const { container, getByText } = render(
      <AreaPicker
        areaList={areaList}
        defaultValue={["330000", "330200", "330202"]}
        onConfirm={onConfirm}
      />,
    )

    expect(container).toHaveTextContent("杭州市")
    expect(container).toHaveTextContent("宁波市")
    expect(container).toHaveTextContent("海曙区")
    expect(container).toHaveTextContent("江北区")
    expect(container).not.toHaveTextContent("东城区")

    fireEvent.click(getByText("确认"))

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onConfirm.mock.calls[0][0]).toEqual(["330000", "330200", "330202"])
    expect(onConfirm.mock.calls[0][1]).toEqual([
      expect.objectContaining({ label: "浙江省", value: "330000" }),
      expect.objectContaining({ label: "宁波市", value: "330200" }),
      expect.objectContaining({ label: "江北区", value: "330202" }),
    ])
  })

  it("updates dependent columns and emits values for every changed level", () => {
    const onChange = jest.fn()
    const onConfirm = jest.fn()
    const { container, getByText } = render(
      <AreaPicker
        areaList={areaList}
        defaultValue={["110000", "110100", "110101"]}
        onChange={onChange}
        onConfirm={onConfirm}
      />,
    )

    fireEvent.click(getByText("浙江省"))

    expect(onChange).toHaveBeenLastCalledWith(
      ["330000", "330100", "330101"],
      expect.objectContaining({ value: "330000" }),
      expect.objectContaining({ index: 0 }),
    )
    expect(container).toHaveTextContent("杭州市")
    expect(container).toHaveTextContent("上城区")

    fireEvent.click(getByText("宁波市"))

    expect(onChange).toHaveBeenLastCalledWith(
      ["330000", "330200", "330201"],
      expect.objectContaining({ value: "330200" }),
      expect.objectContaining({ index: 1 }),
    )
    expect(container).toHaveTextContent("海曙区")
    expect(container).toHaveTextContent("江北区")

    fireEvent.click(getByText("江北区"))

    expect(onChange).toHaveBeenLastCalledWith(
      ["330000", "330200", "330202"],
      expect.objectContaining({ value: "330202" }),
      expect.objectContaining({ index: 2 }),
    )
    expect(onChange).toHaveBeenCalledTimes(3)

    fireEvent.click(getByText("确认"))

    expect(onConfirm).toHaveBeenCalledWith(
      ["330000", "330200", "330202"],
      [
        expect.objectContaining({ label: "浙江省", value: "330000" }),
        expect.objectContaining({ label: "宁波市", value: "330200" }),
        expect.objectContaining({ label: "江北区", value: "330202" }),
      ],
    )
  })

  it("synchronizes dependent columns with a controlled value", () => {
    const { container, rerender } = render(
      <AreaPicker areaList={areaList} value={["110000", "110100", "110101"]} />,
    )

    expect(container).toHaveTextContent("东城区")
    expect(container).not.toHaveTextContent("宁波市")

    rerender(<AreaPicker areaList={areaList} value={["330000", "330200", "330202"]} />)

    expect(container).toHaveTextContent("宁波市")
    expect(container).toHaveTextContent("江北区")
    expect(container).not.toHaveTextContent("东城区")
  })

  it("respects depth and readonly", () => {
    const onChange = jest.fn()
    const { container, getByText } = render(
      <AreaPicker
        areaList={areaList}
        depth={2}
        defaultValue={["110000", "110100"]}
        readonly
        onChange={onChange}
      />,
    )

    expect(container.querySelectorAll(`.${prefixClassname("picker-column")}`)).toHaveLength(2)
    expect(container).not.toHaveTextContent("东城区")

    fireEvent.click(getByText("浙江省"))

    expect(onChange).not.toHaveBeenCalled()
    expect(container).not.toHaveTextContent("杭州市")
  })

  it("emits the current values and options when cancelling", () => {
    const onCancel = jest.fn()
    const { getByText } = render(
      <AreaPicker
        areaList={areaList}
        defaultValue={["110000", "110100", "110102"]}
        onCancel={onCancel}
      />,
    )

    fireEvent.click(getByText("取消"))

    expect(onCancel).toHaveBeenCalledWith(
      ["110000", "110100", "110102"],
      [
        expect.objectContaining({ label: "北京市", value: "110000" }),
        expect.objectContaining({ label: "北京市", value: "110100" }),
        expect.objectContaining({ label: "西城区", value: "110102" }),
      ],
    )
  })

  it("accepts area data and toolbar through compound children", () => {
    const customAreaList: AreaData = {
      province_list: { "440000": "广东省" },
      city_list: { "440100": "广州市" },
      county_list: { "440106": "天河区" },
    }
    const onConfirm = jest.fn()
    const onCancel = jest.fn()
    const { container, getByText } = render(
      <AreaPicker areaList={areaList} depth={1} onConfirm={onConfirm} onCancel={onCancel}>
        <AreaPicker.Toolbar>
          <AreaPicker.Button type="cancel">返回</AreaPicker.Button>
          <AreaPicker.Title>自定义地区</AreaPicker.Title>
          <AreaPicker.Button type="confirm">完成</AreaPicker.Button>
        </AreaPicker.Toolbar>
        <AreaPicker.Columns>{customAreaList}</AreaPicker.Columns>
      </AreaPicker>,
    )

    expect(container).toHaveTextContent("自定义地区")
    expect(container).toHaveTextContent("广东省")
    expect(container).not.toHaveTextContent("北京市")
    expect(container.querySelectorAll(`.${prefixClassname("picker-column")}`)).toHaveLength(1)

    fireEvent.click(getByText("完成"))
    fireEvent.click(getByText("返回"))

    expect(onConfirm).toHaveBeenCalledWith(
      ["440000"],
      [expect.objectContaining({ label: "广东省", value: "440000" })],
    )
    expect(onCancel).toHaveBeenCalledWith(
      ["440000"],
      [expect.objectContaining({ label: "广东省", value: "440000" })],
    )
  })

  it("handles empty area data when confirming without a value", () => {
    const onConfirm = jest.fn()
    const { getByText } = render(<AreaPicker onConfirm={onConfirm} />)

    fireEvent.click(getByText("确认"))

    expect(onConfirm).toHaveBeenCalledWith([], [{}, {}, {}])
  })
})
