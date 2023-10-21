import { createContext } from "react"

interface FormListContextValue {
  inFormList: boolean
}

const formListContext = createContext<FormListContextValue>({
  inFormList: false,
})

export default formListContext
