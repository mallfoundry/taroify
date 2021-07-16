export interface Page {
  title: string
  name?: string
  path?: string
}

export interface Subpackage {
  root: string
  title: string
  pages: Page[]
}

declare const subpackages: Subpackage[]

export default subpackages
