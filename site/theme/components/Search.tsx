import { Search as AlgoliaSearch, ZH_LOCALES } from "@rspress/plugin-algolia/runtime"

export function Search() {
  return (
    <AlgoliaSearch
      locales={ZH_LOCALES}
      docSearchProps={{
        appId: "PAKMKX78PV",
        apiKey: "974bc581b9fecf6765c93db8dacdc1fa",
        indexName: "taroify-com",
      }}
    />
  )
}
