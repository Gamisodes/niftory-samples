import { Button, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { PropsWithChildren } from "react"
import AppLayout from "src/components/AppLayout"
import { useWalletContext } from "src/hooks/useWalletContext"
import { SectionHeader } from "src/ui/SectionHeader"

function WalletGuard({ children }: PropsWithChildren) {
  const { currentUser, isLoading } = useWalletContext()
  if (isLoading) {
    return (
      <AppLayout>
        <VStack className="mx-auto">
          <SectionHeader text="Loading..." />
        </VStack>
      </AppLayout>
    )
  }

  if (currentUser && !currentUser.loggedIn) {
    return (
      <AppLayout>
        <VStack className="mx-auto">
          <SectionHeader text="Access denied" />
          <p className="text-dosis text-white text-xl font-bold pb-6">
            You need to login to your Dapper Wallet
          </p>
          {/* <SectionHeader text="Access to Wallet functionality Denied" /> */}
          <Link href={"/app/account"}>
            <Button>Sign in / Sign up</Button>
          </Link>
        </VStack>
      </AppLayout>
    )
  }

  return <>{children}</>
}

export default WalletGuard
