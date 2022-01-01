import { ITouchEvent } from "@tarojs/components"
import { createContext } from "react"

interface SearchContextValue {
  onCancel?(event: ITouchEvent): void
}

const SearchContext = createContext<SearchContextValue>({})

export default SearchContext
