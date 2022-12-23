import { useMemo } from "react"
import { Loading } from "src/icon/Loading"

type WalletSetupBoxProps = {
  text: string | JSX.Element
  buttonText: string
  isLoading: boolean
  error?: Error
  onClick: () => void
}
export const WalletSetupBox = ({
  text,
  buttonText,
  isLoading,
  error,
  onClick,
}: WalletSetupBoxProps) => {
  useMemo(() => error && console.error(error), [error])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="font-dosis text-center text-lg pb-4">
        Something went wrong. Please try again later!
      </div>
    )
  }

  return (
    <>
      <div className="font-dosis font-bold text-xl text-center pb-4">{text}</div>

      <button
        className="uppercase font-dosis font-bold text-base p-2 px-16 text-white transition-colors bg-header hover:bg-purple"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  )
}
