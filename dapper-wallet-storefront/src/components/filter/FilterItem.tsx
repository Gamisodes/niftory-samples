import { useState, useCallback } from "react"
import cn from "classnames"
import Arrow from "src/icon/Filter-arrow.svg"

export const FilterItem = ({ title, withFilter, options }) => {
  const [isOpen, setOpen] = useState(false)
  const [isSelected, setSelected] = useState(options)

  const onSelect = useCallback(
    (idx) => (event) => {
      setSelected((prev) => {
        const newValue = [...prev]
        newValue[idx].selected = event.target.checked
        return newValue
      })
    },
    []
  )

  return (
    <div
      className={cn(
        { "h-full": isOpen, "h-14 hover:bg-gray-200": !isOpen },
        "bg-white",
        "text-black",
        "p-4",
        "rounded-lg",
        "duration-300",
        "truncate"
      )}
    >
      <div
        className="grid grid-cols-12 cursor-pointer items-center pb-3"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="col-span-10 font-bold text-base">{title}</div>
        <div className="col-span-2 justify-self-center">
          <Arrow className={cn({ "rotate-180": isOpen }, "duration-300")} />
        </div>
      </div>
      <div className="body">
        {withFilter && (
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                <path
                  d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                  stroke="currentColor"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
            <input
              className="mt-2 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Filter"
              type="text"
              name="search"
            />
          </label>
        )}
        <div className="grid gap-4 pt-4">
          {options.map(({ selected, label }: { selected: boolean; label: string }, index) => (
            <label key={title + label + index} className="flex gap-3 align-middle">
              <span className="flex border-2 rounded-md border-gray-200 w-5 h-5 items-center justify-center">
                {selected && (
                  <svg viewBox="0 0 11 8" focusable="false" className="w-3 h-3">
                    <path
                      fill="#9500CA"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.54606 0.481968C9.3508 0.286706 9.03422 0.286706 8.83896 0.481968L4.24276 5.07816L1.76789 2.60329C1.57263 2.40803 1.25604 2.40803 1.06078 2.60329L0.353675 3.3104C0.158413 3.50566 0.158413 3.82224 0.353675 4.0175L3.1821 6.84593L3.88921 7.55304C4.08447 7.7483 4.40105 7.7483 4.59632 7.55304L5.30342 6.84593L10.2532 1.89618C10.4484 1.70092 10.4484 1.38434 10.2532 1.18907L9.54606 0.481968Z"
                    ></path>
                  </svg>
                )}
              </span>
              <span>{label}</span>
              <input
                id={label}
                onChange={onSelect(index)}
                checked={isSelected[index].selected}
                type="checkbox"
                className="appearance-none checked:bg-blue-500"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
