import { default as classnames, default as classNames } from "classnames"
import Image from "next/image"
import Link from "next/link"
import React, { memo, useCallback, useState } from "react"
import ActiveLink from "./ActiveLink"
import { NavbarMenuItem } from "./NavbarMenuItem"
import { IMenuItem } from "./NavContent"
import Cart from "src/icon/Cart.svg"
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
      <section className="relative max-w-[1280px] gap-2 items-center lg:py-3.5 py-6 lg:px-10 px-5 grid lg:grid-cols-[minmax(126px,122px)_1fr] grid-cols-3 container mx-auto justify-between">
        <section className="flex lg:hidden justify-self-start">
          <Burger onClick={onClick} isOpen={isOpen} />
        </section>
        <section className="flex items-center w-[126px] transform-gpu transition-transform lg:transition-none lg:hover:scale-105 justify-self-center lg:justify-self-start justify-center lg:justify-start">
          <Link href={homeUrl}>
            <Image src="/header_logo.avif" alt="BrainTrain Logo" width={100} height={40} />
          </Link>
          {children}
        </section>
        {/* <section className="flex lg:hidden ml-auto text-white">
          <ActiveLink activeClassName="font-semibold" href={"/app/account"} className="flex gap-4 ">
            Cart
            <Cart />
          </ActiveLink>
        </section> */}
        <section
          className={classnames(
            "flex justify-center items-center bg-header/40 backdrop-blur-md lg:backdrop-blur-none min-h-[50px] lg:bg-transparent flex-col absolute lg:relative top-0 w-full lg:w-auto lg:grid grid-cols-[minmax(100px,1fr)_fit-content(100%)] transform-gpu transition-transform lg:transition-none ease-out",
            {
              "translate-x-0 lg:translate-x-0 mt-[81px] overflow-y-auto h-screen": isOpen,
              "-translate-x-full lg:translate-x-0 mt-[81px] h-screen lg:mt-0 lg:h-auto": !isOpen,
            }
          )}
        >
          {menu.map((element, index, array) => {
            return (
              <ul
                key={index}
                className={classNames(
                  "flex flex-col lg:flex-row text-white text-3xl lg:text-base font-bold items-center lg:space-x-8 space-y-2 lg:space-y-0 justify-self-end",
                  {
                    "last:border-t-2 lg:last:border-t-0": array.length > 1,
                  }
                )}
              >
                {element.map((item) => (
                  <NavbarMenuItem key={item.title + item.href} item={item} />
                ))}
              </ul>
            )
          })}
        </section>
      </section>
    </header>
  )
}

export default memo(NavbarBase)
