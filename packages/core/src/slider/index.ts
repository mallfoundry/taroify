import { default as SliderElement, SliderRangeProps, SliderSingleProps } from "./slider"
import SliderThumb from "./slider-thumb"

interface SliderInterface {
  (props: SliderSingleProps | SliderRangeProps): JSX.Element

  Thumb: typeof SliderThumb
}

const Slider = SliderElement as SliderInterface

Slider.Thumb = SliderThumb

export default Slider
