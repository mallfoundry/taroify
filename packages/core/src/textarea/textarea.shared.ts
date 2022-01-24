import * as _ from "lodash"

export function getStringLength(chars: string = "") {
  return _.size([...chars])
}
