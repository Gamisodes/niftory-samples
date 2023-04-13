import { useMemo, Fragment } from "react"
import ActiveLink from "./ActiveLink"
import { Menu, Transition } from "@headlessui/react"
import Cart from "src/icon/Cart.svg"

export const NavbarMenuItem = ({ item }) => {

  const renderItem = useMemo(() => {
    if (item.submenu) {
      return (
        <Menu as="div" className="font-semibold">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className={`flex gap-3 items-center`}>
                  {item.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={`h-5 w-5 text-violet-200 hover:text-violet-100 ${open && 'rotate-180'}`}
                  >
                    <path
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    ></path>
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="block lg:absolute left-0 mt-7 w-56 origin-top-right divide-y divide-gray-100 bg-header/40 shadow-lg focus:outline-none">
                  <div>
                    {item?.submenu?.map(({ title, href, newTab, secondSubmenu }) => {
                      if (!!secondSubmenu) {
                        return (
                          <Menu.Item key={title + href}>
                          {({ active }) => (
                            <ActiveLink
                              activeClassName="font-semibold relative"
                              href={href}
                              className="flex gap-4"
                            >
                              <Menu as="div"
                                className={`${
                                  active ? "bg-violet-500" : "text-white"
                                } group flex w-full items-center px-[2.4rem] py-[0.8rem] text-base border-[1px]`}
                              >
                                {({ open: subOpen }) => (
                                  <>
                                    <div>
                                      <Menu.Button className="flex gap-3 items-center">
                                        {title}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          aria-hidden="true"
                                          className={`h-5 w-5 text-violet-200 hover:text-violet-100 ${subOpen && 'rotate-180'}`}
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clip-rule="evenodd"
                                          ></path>
                                        </svg>
                                      </Menu.Button>
                                    </div>
                                    <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Menu.Items className="absolute left-0 top-[60px] w-56 origin-top-right divide-y divide-gray-100 bg-header shadow-lg focus:outline-none">
                                        <div>
                                        {secondSubmenu.map(({title, href}) =>(
                                          <div>
                                            <Menu.Item key={title + href}>
                                              {({ active: subActive }) => (
                                                <ActiveLink
                                                  activeClassName="font-semibold"
                                                  href={href}
                                                  className="flex gap-4"
                                                >
                                                  <button
                                                    className={`${
                                                      subActive ? "bg-violet-500" : "text-white"
                                                    } group flex w-full items-center px-[2.4rem] py-[0.8rem] text-base border-[1px]`}
                                                  >
                                                    {title}
                                                  </button>
                                                </ActiveLink>
                                              )}
                                            </Menu.Item>
                                          </div>
                                        ))}
                                        </div>
                                      </Menu.Items>
                                    </Transition>
                                  </>
                                )}
                              </Menu>
                            </ActiveLink>
                          )}
                        </Menu.Item>
                        )
                      } else {
                        return (
                          <Menu.Item key={title + href} >
                          {({ active }) => (
                            <ActiveLink
                              activeClassName="font-semibold"
                              target={newTab && "_blank"}
                              href={href}
                              className="flex gap-4"
                            >
                              <button
                                className={`${active ? "bg-violet-500" : "text-white"} text-start group flex w-full items-center px-[2rem] py-[0.8rem] text-base border-[1px]`}
                              >
                                {title}
                              </button>
                            </ActiveLink>
                          )}
                        </Menu.Item>
                        )
                      }
                    }
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      )
    } else {
      return (
        <ActiveLink activeClassName="font-semibold" href={item.href} className={`${item.hideOnMobile && 'hidden' } lg:flex gap-4`}>
          {item.title}
          {item.title === "Cart" && <Cart />}
        </ActiveLink>
      )
    }
  }, [])
  return (
    <li
      key={item.href}
      className="p-2 lg:p-0 lg:space-y-0 transform-gpu transition-transform lg:transition-none lg:hover:border-b-[1px]"
    >
      {renderItem}
    </li>
  )
}
