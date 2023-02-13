import * as React from "react"

import NavbarBase from "./NavbarBase"

export const Navbar = () => {
  const menuItems = React.useMemo(() => {
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
              title: 'Team',
              href: 'https://gamisodes.com/pages/team-1'
            },
            {
              title: 'FAQ',
              href: 'https://gamisodes.com/pages/faqs'
            },
            {
              title: 'Blog',
              href: 'https://gamisodes.com/blogs/news'
            },
          ]
        },
        {
          title: "My Account",
          href: "/",
          submenu: [
            {
              title: 'Sign in / Sign up',
              href: '/app/account'
            },
            {
              title: 'My Brain & Paris Cards',
              href: '/app/collection'
            },
            {
              title: 'My VIP & Trading Cards',
              href: 'https://gamisodes.mint.store',
              newTab: true
            },
          ]
        },
        {
          title: "Cart",
          href: "https://gamisodes.com/cart",
          // href: "/app/drops/" + process.env.NEXT_PUBLIC_DROP_ID,
          hideOnMobile: true
        }
      ],
    ]
  }, [])

  return <NavbarBase menu={menuItems} />
}
