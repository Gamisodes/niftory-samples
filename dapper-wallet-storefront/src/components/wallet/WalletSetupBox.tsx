import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback, useMemo } from "react"
import { useWalletContext } from "src/hooks/useWalletContext"
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

  const { signOut: signOutWallet } = useWalletContext()
  const router = useRouter()

  const logout = useCallback(async function () {
    await Promise.all([signOut({ redirect: false, callbackUrl: "/" }), signOutWallet()])
    router.push("/")
  }, [])

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

      <div className="flex flex-col gap-2 max-w-[245px]">
        <button
          className="uppercase font-dosis font-bold text-base p-2 px-5 text-white transition-colors bg-header hover:bg-purple"
          onClick={onClick}
        >
          {buttonText}
        </button>
        <button
          onClick={logout}
          className="mt-2 uppercase font-dosis font-bold text-base p-2 px-16 text-white bg-black"
        >
          Sign Out
        </button>
      </div>
    </>
  )
}
