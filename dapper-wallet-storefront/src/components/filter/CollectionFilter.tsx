import { FilterItem } from "./FilterItem"

export const CollectionFilter = ({ filter, setFilter }) => (
  <div className="grid gap-4">
    {filter?.map((item, index) => {
      return (
        <FilterItem
          key={index}
          item={item}
          filter={filter}
          setFilter={setFilter}
          index={index}
        />
      )
    })}
  </div>
)
