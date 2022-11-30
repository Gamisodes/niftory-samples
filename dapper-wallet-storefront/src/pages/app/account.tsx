import { Button, Divider, VStack } from "@chakra-ui/react"
import { signIn, signOut, useSession } from "next-auth/react"
import AppLayout from "src/components/AppLayout"
import { LogOut } from "src/components/LogOut"
import { WalletSetup } from "src/components/wallet/WalletSetup"
import { SectionHeader } from "src/ui/SectionHeader"

// export const getStaticProps: GetStaticProps = async () => {
//   const feed = await prisma.user.findMany({
//     // where: {  },
//     // include: {
//     //   author: {
//     //     select: { name: true },
//     //   },
//     // },
//   })
//   console.log(feed)
//   return {
//     props: { feed },
//     revalidate: 10,
//   }
// }

const AccountPage = () => {
  const { data: session } = useSession()
  return (
    <AppLayout>
      <VStack>
        <SectionHeader text="My Account" />
        <WalletSetup />
        <Divider w="80%" maxW="xl" py="8" />
        <Button
          onClick={() => {
            console.log("click", session)
          }}
        >
          Get Session
        </Button>
        <Button
          onClick={() => {
            signIn()
          }}
        >
          Sign In
        </Button>
        <Button
          onClick={() => {
            signOut()
          }}
        >
          Sign Out
        </Button>
        <LogOut />
      </VStack>
    </AppLayout>
  )
}
AccountPage.requireWallet = true

export default AccountPage
