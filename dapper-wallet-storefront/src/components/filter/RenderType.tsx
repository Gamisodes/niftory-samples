import { useState, useMemo } from "react"
import cn from "classnames"
import ArrowType from "src/icon/Filter-arrow-2.svg"
import { RenderOptions } from "./RenderOptions"
import { RenderSubtype } from "./RenderSubtype"

export const RenderType = ({ typeItem, onSelectFilter, typeIndex, filter }) => {
  const [isOpen, setOpen] = useState(false)
  const { label: title, options, subtype } = typeItem

  const renderSubtype = useMemo(() => {
    return subtype?.map((subtypeItem, index) => (
      <RenderSubtype
        key={index}
        typeItem={subtypeItem}
        onSelectFilter={onSelectFilter}
        typeIndex={typeIndex}
        subtypeIndex={index}
      />
    ))
  }, [subtype, typeIndex, filter])

  return (
    <div
      className={cn(
        { "h-full": isOpen, "h-14 hover:bg-gray-200": !isOpen },
        "bg-gray-100",
        "text-black",
        "first:rounded-t-lg",
        "duration-300",
        "truncate"
      )}
    >
      <div
        className="grid grid-cols-12 cursor-pointer items-center p-4"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="col-span-10 font-bold text-base">{title}</div>
        <div className="col-span-2 justify-self-center">
          <ArrowType className={cn({ "rotate-180": isOpen }, "duration-300")} />
        </div>
      </div>
      <div className="body">
        <div className="grid pt-3">
          {Array.isArray(subtype) ? (
            renderSubtype
          ) : (
            <RenderOptions
              options={options}
              onSelectFilter={onSelectFilter}
              typeIndex={typeIndex}
            />
          )}
        </div>
      </div>
    </div>
  )
}
