import { Button, VStack } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { PropsWithChildren } from "react"
import AppLayout from "src/components/AppLayout"
import { SectionHeader } from "src/ui/SectionHeader"

function AuthGuard({ children }: PropsWithChildren) {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <AppLayout>
        <VStack className="mx-auto">
          <SectionHeader text="Loading..." />
        </VStack>
      </AppLayout>
    )
  }

  if (status === "unauthenticated") {
    return (
      <AppLayout>
        <VStack className="mx-auto">
          <SectionHeader text="Access Denied. You need to login to our app" />
          <Link href={"/app/sign-in"}>
            <Button>Sign in / Sign up</Button>
          </Link>
        </VStack>
      </AppLayout>
    )
  }

  return <>{children}</>
}

export default AuthGuard
