import Link from "next/link"
import { memo } from "react"
import Discord from "src/icon/Discord.svg"
import Facebook from "src/icon/Facebook.svg"
import Instagram from "src/icon/Instagram.svg"
import Twitter from "src/icon/Twitter.svg"
import EmailSubscription from "src/components/email_subscribtion"
import Image from "next/image"

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

// function Footer({}: IFooterProps) {
//   return (
//     <footer className="flex text-white font-dosis py-8 pb-3 p-2">
//       <section className="flex container mx-auto justify-center md:justify-between flex-wrap gap-5">
//         <div className="social-media">
//           <h6 className="text-xl font-normal mb-1">Join our community: </h6>
//           <ul className="flex space-x-5">
//             {SOCIAL_MEDIA.map(({ icon: Icon, href }, index) => (
//               <li key={href + index}>
//                 <Link href={href} target="_blank">
//                   <Icon />
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="contact-form">
//           <EmailSubscription />
//         </div>
//       </section>
//     </footer>
//   )
// }

function Footer() {
  return (
    <footer className="bg-white w-full">
      <section className="container mx-auto pb-10 space-y-8">
        <div className="grid md:grid-cols-[1fr_max-content_1fr] gap-5 border border-[#9500CA] p-12 pb-8">
          <div className="flex flex-col">
            <Image
              className="mb-6"
              src="/Gamisodes_footer.png"
              alt="Footer element"
              width={179}
              height={58}
            />
            <div className="mb-6">
              <EmailSubscription />
            </div>
            <p>
              By subscribing you agree to with our Privacy Policy and provide consent to receive
              updates from our company.
            </p>
          </div>
          <div className="flex flex-col">
            <h6>Follow us</h6>
            <ul className="flex flex-col space-y-5">
              {SOCIAL_MEDIA.map(({ icon: Icon, href }, index) => (
                <li className="" key={href + index}>
                  <Link href={href} target="_blank">
                    <Icon />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <Image src="/Inspector_footer.png" alt="" width={343} height={238} />
          </div>
        </div>
        <div className="flex flex-row justify-between font-roboto text-sm">
          <div>Copyright text</div>
          <div className="font-dosis underline text-black space-x-6">
            <span>Terms</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default memo(Footer)
