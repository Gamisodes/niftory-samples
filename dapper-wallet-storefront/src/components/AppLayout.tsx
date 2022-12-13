import { Box, Flex } from "@chakra-ui/layout"

import Footer from "../ui/Footer"
import { Navbar } from "../ui/Navbar/Nav"
import EmailSubscription from "src/components/email_subscribtion"

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <Flex direction="column" minH="100vh" minW="320">
      <Navbar />
      <Box bg="page.background" flexGrow={1}>
        <Box w="100%" py="12">
          {children}
        </Box>
      </Box>
      <EmailSubscription />
      <Footer />
    </Flex>
  )
}
