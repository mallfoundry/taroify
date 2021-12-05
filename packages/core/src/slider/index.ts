import SliderComponent, { SliderProps } from "./slider"
import SliderThumb from "./slider-thumb"

interface SliderInterface {
  (props: SliderProps): JSX.Element

  Thumb: typeof SliderThumb
}

const Slider = SliderComponent as SliderInterface

Slider.Thumb = SliderThumb

export default Slider
