import { useMemo } from "react"
import NavbarBase from "./NavbarBase"

export const Navbar = () => {
  const menuItems = useMemo(() => {
    if (process.env.NODE_ENV === "development") {
      return [
        [
          {
            title: "Sign in / Sign up",
            href: "/account",
          },
          {
            title: "My collection",
            href: "/collection",
          },
          {
            title: "My Account",
            href: "/",
            submenu: [
              {
                title: "Sign in / Sign up",
                href: "/account",
              },
              {
                title: "My collection",
                href: "/collection",
              },
            ],
          },
          // {
          //   title: "Cart",
          //   href: "/drops/" + process.env.NEXT_PUBLIC_DROP_ID,
          // },
        ],
      ]
    } else
      return [
        [
          {
            title: "Store",
            href: "https://gamisodes.com/collections",
          },
          {
            title: "Collections",
            href: "https://gamisodes.com/pages/collections",
          },
          {
            title: "About",
            href: "/",
            submenu: [
              {
                title: "Team",
                href: "https://gamisodes.com/pages/team-1",
              },
              {
                title: "FAQ",
                href: "https://gamisodes.com/pages/faqs",
              },
              {
                title: "Blog",
                href: "https://gamisodes.com/blogs/news",
              },
            ],
          },
          {
            title: "My Account",
            href: "/",
            submenu: [
              {
                title: "Sign in / Sign up",
                href: "/account",
              },
              {
                title: "My Collection",
                href: "/collection",
              },
              {
                title: "Claim VIP & Trading Cards",
                href: "https://gamisodes.mint.store",
                newTab: true,
              },
            ],
          },
          // {
          //   title: "Cart",
          //   href: "https://gamisodes.com/cart",
          //   hideOnMobile: true,
          // },
        ],
      ]
  }, [])

  return <NavbarBase menu={menuItems} />
}
