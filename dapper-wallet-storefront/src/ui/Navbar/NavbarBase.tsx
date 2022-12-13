import classnames from "classnames"
import Link from "next/link"
import React, { memo, useCallback, useState } from "react"
import Logo from "src/icon/Logo.svg"
import ActiveLink from "./ActiveLink"
import { IMenuItem } from "./NavContent"

interface Props extends React.PropsWithChildren {
  menu?: IMenuItem[][]
  homeUrl?: string
}

interface IBurgerProps {
  onClick: () => void
  isOpen: boolean
}
const Burger = ({ onClick, isOpen }: IBurgerProps) => {
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
  menu,
  homeUrl = "/",
  children,
}: // additionalLinks,
Props) {
  const [isOpen, setOpen] = useState(false)

  const onClick = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <header className="flex top-0 left-0 fixed w-full z-50  bg-main text-base">
      <section className="relative w-full gap-2 items-center p-2 pl-4 grid grid-cols-[minmax(50px,122px)_1fr]">
        <section className="flex items-center w-[50px] transform-gpu transition-transform lg:transition-none lg:hover:scale-105">
          <Link href={homeUrl}>
            <Logo />
          </Link>
          {children}
        </section>
        <section
          className={classnames(
            "flex flex-col bg-main absolute lg:relative top-0 w-full lg:w-auto lg:grid grid-cols-[minmax(100px,1fr)_fit-content(100%)] transform-gpu transition-transform lg:transition-none ease-out",
            {
              "translate-y-0 lg:translate-y-0": isOpen,
              "-translate-y-full lg:translate-y-0": !isOpen,
            }
          )}
        >
          {menu.map((element, index) => {
            return (
              <ul
                key={index}
                className="flex flex-col lg:flex-row text-white uppercase lg:space-x-12 space-y-2 lg:space-y-0 justify-self-center last:border-t-2 lg:last:border-t-0"
              >
                {element.map((item) => {
                  return (
                    <li
                      key={item.href}
                      className="p-2 lg:p-0 lg:space-y-0 transform-gpu transition-transform lg:transition-none lg:hover:scale-105"
                    >
                      <ActiveLink activeClassName="font-semibold" href={item.href}>
                        {item.title}
                      </ActiveLink>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </section>
        <section className="flex lg:hidden ml-auto">
          <Burger onClick={onClick} isOpen={isOpen} />
        </section>
      </section>
    </header>
  )
}

export default memo(NavbarBase)
