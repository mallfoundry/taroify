import SliderComponent, { SliderProps } from "./slider"
import SliderThumb from "./slider-thumb"

export type { SliderProps } from "./slider"

interface SliderInterface {
  (props: SliderProps): JSX.Element

  Thumb: typeof SliderThumb
}

const Slider = SliderComponent as SliderInterface

Slider.Thumb = SliderThumb

export default Slider
