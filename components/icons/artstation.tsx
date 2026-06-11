import type { SVGProps } from "react"

/**
 * ArtStation logo mark. lucide-react has no ArtStation icon, so this is a
 * lightweight standalone SVG that mirrors lucide's sizing API (defaults to
 * 1em / currentColor and accepts className + size).
 */
export function ArtStationIcon({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-3.62-6.338H0zm24 .025c0-.467-.137-.92-.382-1.302L15.629 2.408A2.424 2.424 0 0 0 13.589 1.27H9.044l11.61 20.296 2.265-3.917c.443-.764.574-1.06.574-1.601zM7.581 11.011l-4.557 7.889h9.114l-4.557-7.889z" />
    </svg>
  )
}
