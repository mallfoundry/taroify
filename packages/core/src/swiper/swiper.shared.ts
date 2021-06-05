export enum SwiperDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export interface SwiperInstance {
  previous: () => void
  next: () => void
}

export interface SwiperItemEvent {
  index: number
}
