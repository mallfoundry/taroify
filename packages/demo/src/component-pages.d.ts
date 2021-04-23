interface ComponentPageStructure {
  title: string
  name?: string
  path?: string
  children?: ComponentPageStructure[]
}

declare const routes: ComponentPageStructure[]

export default routes
