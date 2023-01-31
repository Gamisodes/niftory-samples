import { FilterItem } from "./FilterItem"

export const CollectionFilter = ({ filter, setFilter }) => (
  <div className="grid gap-4">
    {filter?.map(({ label, options }, index) => {
      return (
        <FilterItem
          key={index}
          title={label}
          options={options}
          setFilter={setFilter}
          index={index}
        />
      )
    })}
  </div>
)
