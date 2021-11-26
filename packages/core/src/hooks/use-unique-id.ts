import * as _ from "lodash"
import { useRef } from "react"

function useUniqueId() {
  const uniqueIdRef = useRef(_.uniqueId("t_"))
  return uniqueIdRef.current
}

export default useUniqueId
