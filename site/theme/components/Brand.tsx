import { Link } from "@rspress/core/theme-original"
import { useSite } from "@rspress/core/runtime"

export function Brand() {
  const { site } = useSite()

  return (
    <Link href="/" className="tf-brand" aria-label="Taroify 首页">
      <img className="tf-brand__mark" src={`${site.base}logo.svg`} alt="" width="34" height="34" />
      <span className="tf-brand__name">Taroify</span>
      <span className="tf-brand__edition">React UI</span>
    </Link>
  )
}
