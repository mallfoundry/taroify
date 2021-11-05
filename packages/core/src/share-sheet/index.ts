import Sheet from "../sheet"
import ShareSheetComponent, { ShareSheetProps } from "./share-sheet"
import ShareSheetHeader from "./share-sheet-header"
import ShareSheetOption from "./share-sheet-option"
import ShareSheetOptions from "./share-sheet-options"
import { ShareSheetOptionObject } from "./share-sheet.shared"

interface ShareSheetInterface {
  (props: ShareSheetProps): JSX.Element

  Backdrop: typeof Sheet.Backdrop
  Header: typeof ShareSheetHeader
  Option: typeof ShareSheetOption
  Options: typeof ShareSheetOptions
  Button: typeof Sheet.Button
}

const ShareSheet = ShareSheetComponent as ShareSheetInterface
ShareSheet.Backdrop = Sheet.Backdrop
ShareSheet.Header = ShareSheetHeader
ShareSheet.Options = ShareSheetOptions
ShareSheet.Option = ShareSheetOption
ShareSheet.Button = Sheet.Button

// eslint-disable-next-line @typescript-eslint/no-redeclare
namespace ShareSheet {
  export type OptionObject = ShareSheetOptionObject
}

export default ShareSheet
