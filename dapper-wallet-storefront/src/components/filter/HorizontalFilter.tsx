import cn from "classnames"
import { useCallback, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { collectionNames } from "src/const/enum"

const collections = [
  { label: "VIP", value: collectionNames.VIP, checked: false },
  { label: "Gadgets", value: collectionNames.gadgets, checked: false },
  { label: "Missions", value: collectionNames.missions, checked: false },
  { label: "Brain Train", value: collectionNames.brainTrain, checked: false },
]

export const HorizontalFilter = ({ setShowFilter, showFilter, selectedCollection, setCollection }) => {
  const openFilter = useCallback(() => setShowFilter((prev) => !prev), [])

  return (
    <div className="grid grid-cols-12 items-center gap-8">
      <div className="col-span-3 flex gap-4">
        <div
          onClick={() => openFilter()}
          className={cn(
            { "bg-white": showFilter, "bg-transparent": showFilter },
            "p-2",
            "bg-white",
            "rounded-md",
            "cursor-pointer",
            "duration-300"
          )}
        >
          <svg className="h-5 w-5" viewBox="0 0 18 17" focusable="false" aria-hidden="true">
            <path
              fill={showFilter ? "#fff" : "#9500CA"}
              stroke="currentColor"
              d="M17.8416 0.618086C17.6105 0.228967 17.1481 0 16.66 0H1.35186C0.863801 0 0.401566 0.228971 0.170265 0.618086C-0.0608569 1.0072 -0.0608568 1.465 0.195885 1.83129C0.221506 1.85412 0.221505 1.87711 0.247305 1.89994L6.38598 9.11047V14.3066C6.38598 14.6271 6.56586 14.9247 6.87403 15.0849L10.0332 16.8475C10.1873 16.939 10.3928 16.9848 10.5727 16.9848C10.7526 16.9848 10.9066 16.939 11.0607 16.8703C11.3947 16.71 11.6002 16.4125 11.6002 16.0691L11.6 9.11074L17.7387 1.90021C17.7643 1.87738 17.7643 1.85439 17.7901 1.83156C18.0471 1.46527 18.0727 1.0075 17.8416 0.618356L17.8416 0.618086Z"
            ></path>
          </svg>
        </div>
        <div>
          <label className="relative block text-black">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                <path
                  d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                  stroke="currentColor"
                  fill="none"
                ></path>
              </svg>
            </span>
            <input
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Filter"
              type="text"
              name="search"
            />
          </label>
        </div>
      </div>
      <div className="col-span-9">
        <RadioGroup
          value={selectedCollection}
          onChange={setCollection}
          className="flex relative w-full bg-white rounded-md text-header"
        >
          {collections.map(({ label, value }, index) => (
            <RadioGroup.Option
              key={index + label}
              className="cursor-pointer w-1/4 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-md"
              value={value}
            >
              {({ checked }) => (
                <span
                  className={`${
                    checked ? "bg-header text-white" : ""
                  } w-full py-2 text-center duration-300`}
                >
                  {label}
                </span>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
