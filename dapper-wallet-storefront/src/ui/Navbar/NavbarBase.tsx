import { BackgroundProps, Box, Flex, Stack, VisuallyHidden } from "@chakra-ui/react"
import Link from "next/link"
import React, { memo } from "react"
import Logo from "src/icon/Logo.svg"
import classnames from "classnames"
import { IMenuItem, NavContent } from "./NavContent"
import { useState } from "react"
import { useCallback } from "react"

interface Props extends React.PropsWithChildren {
  useApi?: boolean
  background?: BackgroundProps["bg"]
  leftComponent?: React.ReactNode
  menu?: IMenuItem[][]
  homeUrl?: string
  // additionalLinks?: IMenuItem[]
}

// export const NavbarBase: React.FunctionComponent<Props> = ({
//   background = "navbar.background",
//   leftComponent,
//   menu,
//   homeUrl = "/",
// }) => {
//   return (
//     <Box left="0" top="0" minHeight="1em" width="100%" position="fixed" zIndex="999">
//       <Box as="header" height="16" bg={background} position="relative">
//         <Box height="100%" mx="auto" pe={{ base: "5", md: "0" }}>
//           <Flex
//             as="nav"
//             aria-label="Site navigation"
//             align="center"
//             justify="space-between"
//             height="100%"
//           >
//             <Link href={homeUrl} passHref legacyBehavior>
//               <Box as="a" rel="home" ml={{ base: "none", sm: "10", md: "20" }}>
//                 <Stack direction="row">
//                   <VisuallyHidden>niftory</VisuallyHidden>
//                   {leftComponent}
//                 </Stack>
//               </Box>
//             </Link>
//             {/* <NavContent.Desktop display={{ base: "none", lg: "flex" }} mr="20" menu={menu} />
//             <NavContent.Mobile
//               display={{ base: "flex", lg: "none" }}
//               mr={{ base: "0", sm: "5", md: "10" }}
//               menu={menu}
//             /> */}
//           </Flex>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

const Burger = () => {
  const [isOpen, setOpen] = useState(false)
  const onClick = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])
  return (
    <div className="flex lg:hidden h-[22px]" onClick={onClick}>
      <div className="relative w-[22px]">
        <span
          className={classnames(
            "absolute block w-full h-0.5 bg-white transform-gpu transition-all",
            {
              "top-0": !isOpen,
              "top-1/2 rotate-45": isOpen,
            }
          )}
        ></span>
        <span
          className={classnames(
            "absolute block w-full h-0.5 bg-white transform-gpu transition-all",
            {
              "top-2": !isOpen,
              "top-1/2 rotate-45": isOpen,
            }
          )}
        ></span>
        <span
          className={classnames(
            "absolute block w-full h-0.5 bg-white transform-gpu transition-all",
            {
              "top-4": !isOpen,
              "top-1/2 -rotate-45": isOpen,
            }
          )}
        ></span>
      </div>
    </div>
  )
}

function NavbarBase({
  background = "navbar.background",
  leftComponent,
  menu,
  homeUrl = "/",
  children,
}: // additionalLinks,
Props) {
  return (
    <header className="flex top-0 left-0 fixed w-full z-50 p-2 pl-4 bg-main text-base">
      <section className="relative w-full gap-2 items-center grid grid-cols-[minmax(50px,122px)_1fr]">
        <section className="flex items-center w-[50px]">
          <Link href={homeUrl}>
            <Logo />
          </Link>
          {children}
        </section>
        <section className="hidden lg:grid grid-cols-[minmax(100px,1fr)_fit-content(100%)]">
          {menu.map((element) => {
            return (
              <ul className="flex text-white uppercase space-x-12 justify-self-center">
                {element.map((item) => {
                  return (
                    <li key={item.href}>
                      <Link href={item.href}>{item.title}</Link>{" "}
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </section>
        {/* <Burger /> */}
      </section>
    </header>
  )
}

export default memo(NavbarBase)
