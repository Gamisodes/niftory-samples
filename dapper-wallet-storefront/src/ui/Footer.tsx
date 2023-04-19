import Link from "next/link"
import { memo } from "react"
import Discord from "src/icon/Discord.svg"
import Facebook from "src/icon/Facebook.svg"
import Instagram from "src/icon/Instagram.svg"
import Twitter from "src/icon/Twitter.svg"
import Youtube from "src/icon/Youtube.svg"
import EmailSubscription from "src/components/email_subscribtion"
import Image from "next/image"

export interface IFooterLink {
  label?: string
  href?: string
  name?: string
}

export interface IFooterProps {}

const SOCIAL_MEDIA = [
  {
    href: "https://www.facebook.com/profile.php?id=100073143924225",
    icon: () => <Facebook />,
    name: "Facebook",
  },
  {
    href: "https://www.instagram.com/gamisodes",
    icon: () => <Instagram />,
    name: "Instagram",
  },
  {
    href: "https://twitter.com/PlayGamisodes",
    icon: () => <Twitter />,
    name: "Twitter",
  },
  {
    href: "https://www.youtube.com/@gamisodes4619",
    icon: () => <Youtube />,
    name: "Youtube",
  },
  {
    href: "https://discord.com/invite/ZB4Mubkwrf",
    icon: () => <Discord />,
    name: "Discord",
  },
]

function Footer() {
  return (
    <footer className="bg-white w-full">
      <section className="container px-7 mx-auto pb-10 space-y-8">
        <div className="grid md:grid-cols-[minmax(300px,1fr)_max-content] lg:grid-cols-[minmax(350px,1fr)_max-content] gap-14 md:gap-5 lg:gap-14 justify-between content-between border border-[#9500CA] p-6 pb-4 sm:p-12 sm:pb-8">
          <div className="flex flex-col">
            <Image
              className="mb-6"
              src="/Gamisodes_footer.png"
              alt="Footer element"
              width={179}
              height={58}
              style={{ objectFit: "cover" }}
            />
            <div className="mb-4">
              <EmailSubscription />
            </div>
            <p className="font-roboto text-xs font-normal">
              By subscribing you agree to with our Privacy Policy and provide consent to receive
              updates from our company.
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row md:flex-col-reverse lg:flex-row gap-6 md:gap-12">
            <div className="flex flex-col">
              <h6 className="font-roboto text-base text-black font-bold mb-6">Follow us</h6>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:flex sm:flex-col gap-5">
                {SOCIAL_MEDIA.map(({ icon: Icon, href, name }, index) => (
                  <li className="" key={href + index}>
                    <Link
                      className="space-x-3 flex items-center transition-transform transform-gpu hover:translate-x-1 hover:scale-110"
                      href={href}
                      target="_blank"
                    >
                      <Icon />
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image src="/Inspector_footer.png" alt="" width={343} height={238} />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between font-roboto text-sm">
          <div>© 2022, Gamisodes Powered by NextJS</div>
          <div className="font-dosis text-sm underline text-black space-x-6">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default memo(Footer)
