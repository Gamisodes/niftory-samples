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

const SOCIAL_MEDIA = [
  {
    href: "https://discord.com",
    icon: () => <Discord />,
  },
  {
    href: "https://twitter.com",
    icon: () => <Twitter />,
  },
  {
    href: "https://www.facebook.com",
    icon: () => <Facebook />,
  },
  {
    href: "https://www.instagram.com",
    icon: () => <Instagram />,
  },
]

function Footer({}: IFooterProps) {
  return (
    <footer className="flex text-white font-dosis py-8 pb-3 p-2">
      <section className="flex container mx-auto justify-center md:justify-between flex-wrap gap-5">
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
        <div className="contact-form">
          <EmailSubscription />
        </div>
      </section>
    </footer>
  )
}

export default memo(Footer)
