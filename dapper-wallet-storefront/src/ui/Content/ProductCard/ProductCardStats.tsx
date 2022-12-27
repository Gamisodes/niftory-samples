import classNames from "classnames"
import { HiBadgeCheck, HiOutlineCollection, HiStar } from "react-icons/hi"

interface CardStatProps {
  serial?: string
  rarity?: string
  quantity?: number
}

export const ProductCardStats = (stats: CardStatProps) => {
  return (
    <section
      className={classNames(
        "text-sm flex flex-wrap",
        stats.quantity || stats.rarity ? "justify-between" : "justify-center"
      )}
    >
      <div className="flex items-center space-x-1">
        <HiStar />
        <p>{stats.rarity}</p>
      </div>
      {stats.serial && (
        <div className="flex items-center space-x-1">
          <HiBadgeCheck />
          <p>Serial: {stats.serial}</p>
        </div>
      )}
      {stats.quantity && (
        <div className="flex items-center space-x-1">
          <HiOutlineCollection />
          <p>Total: {stats.quantity}</p>
        </div>
      )}
    </section>
  )
}
