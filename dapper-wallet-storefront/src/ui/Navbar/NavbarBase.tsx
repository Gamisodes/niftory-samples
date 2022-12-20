import classnames from "classnames"
import Link from "next/link"
import React, { memo, useCallback, useState } from "react"
import Logo from "src/icon/Logo.svg"
import ActiveLink from "./ActiveLink"
import { IMenuItem } from "./NavContent"
import Image from "next/image"
import classNames from "classnames"
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
    <header className="flex top-0 left-0 fixed w-full z-50  bg-header.opacity text-base font-dosis">
      <section className="relative w-full gap-2 items-center p-2 px-4 grid grid-cols-[minmax(126px,122px)_1fr] container mx-auto">
        <section className="flex items-center w-[126px] transform-gpu transition-transform lg:transition-none lg:hover:scale-105">
          <Link href={homeUrl}>
            {/* <Logo /> */}
            <Image src="/Gamisodes.png" alt="BrainTrain Logo" width={126} height={40} />
          </Link>
          {children}
        </section>
        <section
          className={classnames(
            "flex bg-header lg:bg-transparent flex-col absolute lg:relative top-0 w-full lg:w-auto lg:grid grid-cols-[minmax(100px,1fr)_fit-content(100%)] transform-gpu transition-transform lg:transition-none ease-out",
            {
              "translate-y-0 lg:translate-y-0": isOpen,
              "-translate-y-full lg:translate-y-0": !isOpen,
            }
          )}
        >
          {menu.map((element, index, array) => {
            return (
              <ul
                key={index}
                className={classNames(
                  "flex flex-col lg:flex-row text-white font-bold lg:space-x-8 space-y-2 lg:space-y-0 justify-self-end",
                  {
                    "last:border-t-2 lg:last:border-t-0": array.length > 1,
                  }
                )}
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
