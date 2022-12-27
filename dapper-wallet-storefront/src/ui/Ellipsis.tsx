import React, { useMemo } from "react"

type EllipsisProps = ReverseEllipsisProps | GeneralEllipsisProps

interface ReverseEllipsisProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "default"
  lines: number
  breakWord?: boolean
}
interface GeneralEllipsisProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "reverse"
}

/**
 * Clips element text content to specified amount of lines, and
 * trails final line of with an ellipsis (…)
 */
export default function Ellipsis({
  direction = "default",
  children,
  ...props
}: EllipsisProps): JSX.Element {
  if (direction === "default") {
    const lines = (props as ReverseEllipsisProps).lines
    const breakWord = (props as ReverseEllipsisProps).breakWord

    const clampStyle = useMemo(
      () => ({
        display: "-webkit-box",
        WebkitLineClamp: String(lines),
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        wordBreak: breakWord ? "break-word" : "inherit",
      }),
      [lines]
    )
    return (
      <div style={clampStyle as any} {...props}>
        {children}
      </div>
    )
  }

  if (direction === "reverse") {
    return (
      <span className="reverse-ellipsis" {...props}>
        <span>{children}</span>
      </span>
    )
  }
  return <>{children}</>
}
