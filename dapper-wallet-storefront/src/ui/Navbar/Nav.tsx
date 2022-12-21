import * as React from "react"

import NavbarBase from "./NavbarBase"

export const Navbar = () => {
  const menuItems = React.useMemo(() => {
    return [
      [
        {
          title: "Buy Ticket",
          href: "/app/drops/" + process.env.NEXT_PUBLIC_DROP_ID,
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
    ]
  }, [])

  return <NavbarBase menu={menuItems} />
}
