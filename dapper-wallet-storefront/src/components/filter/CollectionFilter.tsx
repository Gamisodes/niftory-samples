import { FilterItem } from "./FilterItem"

const filters = [
  {
    title: "VIP",
    withFilter: true,
    options: [
      { selected: false, label: "1" },
      { selected: false, label: "2" },
      { selected: false, label: "3" },
      { selected: false, label: "4" },
    ],
  },
  {
    title: "Gadgets",
    withFilter: true,
    options: [
      { selected: false, label: "1" },
      { selected: false, label: "2" },
      { selected: false, label: "3" },
      { selected: false, label: "4" },
    ],
  },
  {
    title: "Missions",
    withFilter: false,
    options: [
      { selected: false, label: "1" },
      { selected: false, label: "2" },
      { selected: false, label: "3" },
      { selected: false, label: "4" },
    ],
  },
  {
    title: "Brain Train",
    withFilter: true,
    options: [
      { selected: false, label: "1" },
      { selected: false, label: "2" },
      { selected: false, label: "3" },
      { selected: false, label: "4" },
    ],
  },
]

export const CollectionFilter = () => {
  return (
    <div className="grid gap-4">
      {filters.map(({ title, withFilter, options }, index) => (
        <FilterItem key={index} title={title} withFilter={withFilter} options={options} />
      ))}
    </div>
  )
}
