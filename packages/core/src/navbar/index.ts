import NavbarElement, { NavbarProps } from "./navbar"
import NavBarLeft from "./navbar-left"
import NavBarRight from "./navbar-right"

interface NavbarInterface {
  (props: NavbarProps): JSX.Element

  NavLeft: typeof NavBarLeft
  NavRight: typeof NavBarRight
}

const Navbar = NavbarElement as NavbarInterface

Navbar.NavLeft = NavBarLeft
Navbar.NavRight = NavBarRight

export default Navbar
