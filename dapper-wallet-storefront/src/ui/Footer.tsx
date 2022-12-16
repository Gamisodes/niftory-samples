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
    href: "https://discord.com/invite/ZB4Mubkwrf",
    icon: () => <Discord />,
  },
  {
    href: "https://twitter.com/PlayGamisodes",
    icon: () => <Twitter />,
  },
  {
    href: "https://www.facebook.com/profile.php?id=100073143924225",
    icon: () => <Facebook />,
  },
  {
    href: "https://www.instagram.com/gamisodes",
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
                <Link href={href} target="_blank">
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
