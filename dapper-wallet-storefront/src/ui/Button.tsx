import classNames from "classnames"
import { HTMLAttributes, memo, PropsWithChildren } from "react"

interface IButton extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {}
function Button({ children, ...props }: IButton) {
  return (
    <button
      {...props}
      className={classNames(
        "inline-flex w-fit px-5 py-2 uppercase font-bold text-base font-dosis bg-header hover:bg-pink-900",
        props.className
      )}
    >
      {children}
    </button>
  )
}

export default memo(Button)
