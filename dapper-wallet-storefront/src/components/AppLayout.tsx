import { Box, Flex } from "@chakra-ui/layout"

import Footer from "../ui/Footer"
import { Navbar } from "../ui/Navbar/Nav"

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <main>
      {/* <Flex direction="column" minH="100vh" minW="320"> */}
      <Navbar />
      <section className="pt-20 min-h-[calc(100vh-theme(space.20))] flex">
        <div className="mx-auto">{children}</div>
      </section>
      {/* <Box bg="page.background" flexGrow={1}>
        <Box w="100%" py="12">
          {children}
        </Box>
      </Box> */}
      <Footer />
      {/* </Flex> */}
    </main>
  )
}
