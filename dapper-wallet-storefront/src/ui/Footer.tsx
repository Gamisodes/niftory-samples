import Link from "next/link"
import { memo } from "react"
import Discord from "src/icon/Discord.svg"
import Facebook from "src/icon/Facebook.svg"
import Instagram from "src/icon/Instagram.svg"
import Twitter from "src/icon/Twitter.svg"
import EmailSubscription from "src/components/email_subscribtion"

export interface IFooterLink {
  label?: string
  href?: string
}

export interface IFooterProps {}

// export const Footer: React.FunctionComponent<IFooterProps> = ({ links = [] }) => (
//   <Box as="footer" bg="footer.background" color="footer.text" py="6" width="100%">
//     <Center width="100%">
//       <Flex
//         direction={{ base: "column-reverse", lg: "row" }}
//         justify="space-between"
//         fontSize="sm"
//         fontWeight="300"
//         mx="15px"
//       >
//         <Wrap id="bottom" spacing={{ base: "4", md: "8", lg: "12" }} justify="center">
//           {links.map((link, idx) => (
//             <WrapItem key={idx}>
//               <Link href={link.href}>{link.label}</Link>
//             </WrapItem>
//           ))}
//         </Wrap>
//       </Flex>
//     </Center>
//   </Box>
// )

const SOCIAL_MEDIA = [
  {
    href: "https://discord.com",
    icon: Discord,
  },
  {
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    href: "https://www.facebook.com",
    icon: Facebook,
  },
  {
    href: "https://www.instagram.com",
    icon: Instagram,
  },
]

function Footer({}: IFooterProps) {
  return (
    <footer className="flex text-white font-dosis py-8">
      <section className="flex container mx-auto justify-between">
        <div className="social-media">
          <h6 className="text-xl font-normal mb-1">Join our community: </h6>
          <ul className="flex space-x-5">
            {SOCIAL_MEDIA.map(({ icon: Icon, href }, index) => (
              <li key={href + index}>
                <Link href={href}>
                  <Icon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-black">
          <EmailSubscription />
        </div>
      </section>
    </footer>
  )
}

export default memo(Footer)
