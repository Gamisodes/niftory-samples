import { useState, useMemo } from "react"
import cn from "classnames"
import Arrow from "src/icon/Filter-arrow-3.svg"
import { RenderOptions } from "./RenderOptions"

export const RenderSubtype = ({ typeItem, onSelectFilter, typeIndex = null, subtypeIndex = null }) => {
  const [isOpen, setOpen] = useState(false)
  const { label: title, options } = typeItem

  return (
    <div
      className={cn(
        { "h-full": isOpen, "h-14 hover:bg-gray-300": !isOpen, "h-16": !isOpen && title.length > 19 },
        "bg-gray-200",
        "text-black",
        "first:rounded-t-lg",
        "last:rounded-b-lg",
        "duration-300",
        "truncate"
      )}
    >
      <div
        className={cn({"py-2": title.length > 19}, "grid grid-cols-12 cursor-pointer items-center p-4")}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="col-span-10 font-bold text-base max-w-[130px] whitespace-pre-wrap">{title}</div>
        <div className="col-span-2 justify-self-center">
          <Arrow className={cn({ "rotate-180": isOpen }, "duration-300")} />
        </div>
      </div>
      <div className="body">
        <div className="grid">
          <RenderOptions options={options} onSelectFilter={onSelectFilter} typeIndex={typeIndex} subtypeIndex={subtypeIndex} />
        </div>
      </div>
    </div>
  )
}
