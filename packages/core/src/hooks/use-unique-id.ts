import * as _ from "lodash"
import { useRef } from "react"

function useUniqueId(prefix: string = "t_") {
  const uniqueIdRef = useRef(_.uniqueId(prefix))
  return uniqueIdRef.current
}

export default useUniqueId
