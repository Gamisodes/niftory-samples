import * as React from "react"

import NavbarBase from "./NavbarBase"

export const Navbar = () => {
  const menuItems = React.useMemo(() => {
    return [
      [
        {
          title: "Drops",
          href: "/app/drops",
        },
        {
          title: "My Collection",
          href: "/app/collection",
        },
        {
          title: "My Account",
          href: "/app/account",
        },
      ],
      [
        {
          title: "Privacy Policy",
          href: "/app/privacy",
        },
        {
          title: "Terms",
          href: "/app/terms",
        },
      ],
    ]
  }, [])

  return <NavbarBase menu={menuItems} />
}
