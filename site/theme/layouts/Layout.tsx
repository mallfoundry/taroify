import type { LayoutProps } from "@rspress/core/theme-original"
import { Layout as OriginalLayout } from "@rspress/core/theme-original"
import { Brand } from "../components/Brand"
import { MobileSimulator, SimulatorBridge, SimulatorRail } from "../components/Simulator"
import { HomeLayout } from "./HomeLayout"

export function Layout(props: LayoutProps) {
  return (
    <>
      <SimulatorBridge />
      <OriginalLayout
        {...props}
        HomeLayout={HomeLayout}
        navTitle={<Brand />}
        beforeOutline={<SimulatorRail />}
        bottom={<MobileSimulator />}
      />
    </>
  )
}
