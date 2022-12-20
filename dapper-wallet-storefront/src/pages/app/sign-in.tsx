import { Box, Button, Divider, VStack } from "@chakra-ui/react"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"
import { useRouterHistory } from "src/components/RouterHistory"

import GoogleIcon from "src/icon/GoogleOAuth.svg"
import AppLayout from "../../components/AppLayout"
import { SectionHeader } from "../../ui/SectionHeader"

interface ISignInPageProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

const SignInPage = ({ providers }: ISignInPageProps) => {
  const previousRoute = useRouterHistory()
  return (
    <AppLayout>
      <VStack className="mx-auto">
        <SectionHeader text="Sign-in to our app" />
        {Object.values(providers).map((provider) => (
          <Box key={provider.name}>
            <Button
              onClick={() => {
                const options = {
                  callbackUrl: `${window.location.origin + previousRoute}`,
                }
                console.info("Sign-in options: ", options)
                signIn(provider.id, options)
              }}
              minWidth="200"
              height="14"
              px="8"
              fontSize="md"
            >
              <GoogleIcon className="w-5 mr-4" />
              Sign in with {provider.name}
            </Button>
          </Box>
        ))}
        <Divider w="80%" maxW="xl" py="8" />
      </VStack>
    </AppLayout>
  )
}
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

SignInPage.requireWallet = false

export default SignInPage
