import classNames from "classnames"
import { ButtonHTMLAttributes, memo, PropsWithChildren } from "react"
import { Loading } from "src/icon/Loading"

interface IButton extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  isLoading?: boolean
  loadingText?: string | JSX.Element
}
function Button({ isLoading, loadingText, children, ...props }: IButton) {
  return (
    <button
      {...props}
      className={classNames(
        "inline-flex w-fit px-5 py-2 uppercase font-bold text-base font-dosis bg-header disabled:bg-pink-900 disabled:opacity-90 hover:bg-pink-900",
        props.className,
        { "bg-pink-900": isLoading }
      )}
      disabled={props.disabled ?? isLoading ?? undefined}
    >
      {isLoading ? (
        <div className="flex items-center">
          <Loading />
          {(loadingText && loadingText) || children}
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default memo(Button)
