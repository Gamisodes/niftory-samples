import classnames from "classnames"
import Link from "next/link"
import React, { memo, useCallback, useState, Fragment } from "react"
import { IMenuItem } from "./NavContent"
import Image from "next/image"
import classNames from "classnames"
import { NavbarMenuItem } from "./NavbarMenuItem"
import ActiveLink from "./ActiveLink"
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
            {/* <Logo /> */}
            <Image src="/header_logo.avif" alt="BrainTrain Logo" width={100} height={40} />
          </Link>
          {children}
        </section>
        <section className="flex lg:hidden ml-auto text-white">
          <ActiveLink activeClassName="font-semibold" href={'/app/account'} className="flex gap-4 ">
            Cart
              <svg
                className="icon icon-cart-empty"
                aria-hidden="true"
                focusable="false"
                role="presentation"
                width="19"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2444 6.02757H13.7444V4.67091C13.7444 2.43424 11.9444 0.637573 9.6764 0.637573C7.4084 0.637573 5.6084 2.43424 5.6084 4.67091V6.02757H1.1804L0.712402 21.7576C0.712402 22.2709 1.1084 22.6376 1.6124 22.6376H17.8124C18.3164 22.6376 18.7124 22.2342 18.7124 21.7576L18.2444 6.02757ZM6.5444 4.67091C6.5444 2.94757 7.9484 1.51757 9.7124 1.51757C11.4764 1.51757 12.8804 2.91091 12.8804 4.67091V6.02757H6.5444V4.67091ZM5.8964 9.62091C5.5364 9.62091 5.2124 9.32757 5.2124 8.96091C5.2124 8.59424 5.5004 8.30091 5.8964 8.30091C6.2564 8.30091 6.5804 8.59424 6.5804 8.96091C6.5804 9.32757 6.2564 9.62091 5.8964 9.62091ZM13.5284 9.62091C13.1684 9.62091 12.8444 9.32757 12.8444 8.96091C12.8444 8.59424 13.1324 8.30091 13.5284 8.30091C13.8884 8.30091 14.2124 8.59424 14.2124 8.96091C14.2124 9.32757 13.9244 9.62091 13.5284 9.62091Z"
                  fill="white"
                ></path>
              </svg>
          </ActiveLink>
        </section>
        <section
          className={classnames(
            "flex justify-center items-center bg-header/40 backdrop-blur-md min-h-[50px] lg:bg-transparent flex-col absolute lg:relative top-0 w-full lg:w-auto lg:grid grid-cols-[minmax(100px,1fr)_fit-content(100%)] transform-gpu transition-transform lg:transition-none ease-out",
            {
              "translate-y-0 lg:translate-y-0 mt-[81px] overflow-y-auto h-screen": isOpen,
              "-translate-y-full lg:translate-y-0": !isOpen,
            }
          )}
        >
          {menu.map((element, index, array) => {
            return (
              <ul
                key={index}
                className={classNames(
                  "flex  flex-col lg:flex-row text-white text-3xl lg:text-base font-bold items-center lg:space-x-8 space-y-2 lg:space-y-0 justify-self-end",
                  {
                    "last:border-t-2 lg:last:border-t-0": array.length > 1,
                  }
                )}
              >
                {element.map((item) => <NavbarMenuItem item={item} />)}
              </ul>
            )
          })}
        </section>
      </section>
    </header>
  )
}

export default memo(NavbarBase)
