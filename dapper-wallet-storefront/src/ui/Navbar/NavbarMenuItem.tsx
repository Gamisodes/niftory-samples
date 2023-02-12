import { useMemo, Fragment } from "react"
import ActiveLink from "./ActiveLink"
import { Menu, Transition } from "@headlessui/react"

export const NavbarMenuItem = ({ item }) => {

  const renderItem = useMemo(() => {
    if (item.submenu) {
      return (
        <Menu as="div" className="font-semibold">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="flex gap-3 items-center">
                  {item.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={`h-5 w-5 text-violet-200 hover:text-violet-100 ${open && 'rotate-180'}`}
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
                <Menu.Items className="absolute left-0 mt-7 w-56 origin-top-right divide-y divide-gray-100 bg-header/40 shadow-lg focus:outline-none">
                  <div>
                    {item?.submenu?.map(({ title, href }) => (
                      <Menu.Item key={title + href}>
                        {({ active }) => (
                          <ActiveLink
                            activeClassName="font-semibold"
                            href={href}
                            className="flex gap-4"
                          >
                            <button
                              className={`${
                                active ? "bg-violet-500" : "text-white"
                              } group flex w-full items-center px-[2.4rem] py-[0.8rem] text-base border-[1px]`}
                            >
                              {title}
                            </button>
                          </ActiveLink>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      )
    } else {
      return (
        <ActiveLink activeClassName="font-semibold" href={item.href} className="flex gap-4">
          {item.title}
          {item.title === "Cart" && (
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
          )}
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
