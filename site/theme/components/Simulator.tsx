import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useDark, useNavigate, usePage, useSite } from "@rspress/core/runtime"
import { componentManifest, type ComponentManifestItem } from "../generated/component-manifest"

const SITE_SOURCE = "taroify-site"
const SIMULATOR_SOURCE = "taroify-simulator"
const THEME_CHANGE_EVENT = "themeChange"
const SIMULATOR_READY_EVENT = "ready"
const DEFAULT_DEMO_PATH = "pages/home/index"

type ThemeMode = "light" | "dark"

function sendThemeChange(target: Window | null, themeMode: ThemeMode) {
  target?.postMessage(
    {
      source: SITE_SOURCE,
      event: THEME_CHANGE_EVENT,
      payload: { themeMode },
    },
    "*",
  )
}

function SimulatorIcon() {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 24 24">
      <rect height="18" rx="3" stroke="currentColor" strokeWidth="1.7" width="14" x="5" y="3" />
      <path
        d="m10.25 9 4.5 3-4.5 3V9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="0.7"
      />
      <path d="M10 18h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  )
}

function componentFromRoute(routePath: string) {
  const match = routePath.match(/^\/components\/([^/]+)\/?$/)
  if (!match) {
    return undefined
  }
  return componentManifest.find((component) => component.slug === match[1])
}

function demoUrl(base: string, demoPath: string) {
  const hash = `#/${demoPath}`

  if (import.meta.env.DEV && typeof window !== "undefined") {
    const port = import.meta.env.PUBLIC_DEMO_PORT || "8900"
    return `//${window.location.hostname}:${port}/index.html${hash}`
  }

  return `${base}h5/index.html${hash}`
}

function useSimulatorNavigation() {
  const navigate = useNavigate()
  const dark = useDark()
  const { site } = useSite()
  const themeMode = dark ? "dark" : "light"
  const componentByName = useMemo(
    () =>
      new Map<string, string>(
        componentManifest.map((component) => [component.name, component.slug]),
      ),
    [],
  )

  useEffect(() => {
    const allowedOrigins = new Set([window.location.origin])
    if (import.meta.env.DEV) {
      allowedOrigins.add(
        new URL(demoUrl(site.base, DEFAULT_DEMO_PATH), window.location.href).origin,
      )
    }

    function handleMessage(event: MessageEvent) {
      if (
        !allowedOrigins.has(event.origin) ||
        !event.data ||
        typeof event.data !== "object" ||
        event.data.source !== SIMULATOR_SOURCE
      ) {
        return
      }

      if (event.data.event === SIMULATOR_READY_EVENT) {
        sendThemeChange(event.source as Window, themeMode)
        return
      }

      if (event.data.event === "navigateBack") {
        navigate("/introduce/")
        return
      }

      if (event.data.event !== "navigateTo") {
        return
      }

      const component = event.data.payload?.component
      if (typeof component !== "string") {
        return
      }
      const slug = componentByName.get(component)
      if (slug) {
        navigate(`/components/${slug}/`)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [componentByName, navigate, site.base, themeMode])
}

type DemoFrameProps = {
  component?: ComponentManifestItem
  title?: string
  className?: string
}

export function DemoFrame({
  component,
  title = "Taroify 组件交互演示",
  className = "",
}: DemoFrameProps) {
  const dark = useDark()
  const { site } = useSite()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const path = component?.demoPath || DEFAULT_DEMO_PATH
  const themeMode = dark ? "dark" : "light"
  const syncTheme = useCallback(
    () => sendThemeChange(iframeRef.current?.contentWindow ?? null, themeMode),
    [themeMode],
  )

  useEffect(() => {
    syncTheme()
  }, [syncTheme])

  return (
    <iframe
      ref={iframeRef}
      className={`tf-demo-frame ${className}`.trim()}
      title={title}
      src={demoUrl(site.base, path)}
      loading="lazy"
      onLoad={syncTheme}
    />
  )
}

export function SimulatorBridge() {
  useSimulatorNavigation()
  return null
}

export function SimulatorRail() {
  const { page } = usePage()
  const component = componentFromRoute(page.routePath)

  if (!component) {
    return null
  }

  return (
    <aside className="tf-simulator-rail" aria-label={`${component.title}演示`}>
      <div className="tf-device">
        <div className="tf-device__speaker" aria-hidden="true" />
        <DemoFrame component={component} title={`${component.title}交互演示`} />
      </div>
    </aside>
  )
}

export function MobileSimulator() {
  const { page } = usePage()
  const component = componentFromRoute(page.routePath)
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Route changes should close the drawer.
  useEffect(() => {
    setOpen(false)
  }, [page.routePath])

  useEffect(() => {
    if (!open) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    const closeOnPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) {
        return
      }
      if (
        popoverRef.current?.contains(event.target) ||
        triggerRef.current?.contains(event.target)
      ) {
        return
      }
      setOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    document.addEventListener("pointerdown", closeOnPointerDown)

    return () => {
      window.removeEventListener("keydown", closeOnEscape)
      document.removeEventListener("pointerdown", closeOnPointerDown)
    }
  }, [open])

  if (!component) {
    return null
  }

  const triggerLabel = open ? "收起交互演示" : "查看交互演示"

  return (
    <>
      <button
        className="tf-simulator-trigger"
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={triggerLabel}
        aria-controls="tf-simulator-popover"
        aria-haspopup="dialog"
        aria-expanded={open}
        title={triggerLabel}
      >
        <SimulatorIcon />
      </button>
      {open ? (
        <dialog
          className="tf-simulator-drawer"
          id="tf-simulator-popover"
          ref={popoverRef}
          open
          aria-label={`${component.title}交互演示`}
        >
          <div className="tf-device tf-device--drawer">
            <div className="tf-device__speaker" aria-hidden="true" />
            <DemoFrame component={component} title={`${component.title}交互演示`} />
          </div>
        </dialog>
      ) : null}
    </>
  )
}
