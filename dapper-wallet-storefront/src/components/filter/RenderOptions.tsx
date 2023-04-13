export const RenderOptions = ({
  options,
  onSelectFilter,
  typeIndex = null,
  subtypeIndex = null,
}) => {
  return options?.map(({ selected, value }: { selected: boolean; value: string }, index) => (
    <label key={value + index} className="flex gap-3 items-center bg-white py-3 px-4">
      <span className="flex border-2 rounded-md border-gray-200 w-5 h-5 items-center justify-center">
        {selected && (
          <svg viewBox="0 0 11 8" focusable="false" className="w-3 h-3">
            <path
              fill="#9500CA"
              d="M9.54606 0.481968C9.3508 0.286706 9.03422 0.286706 8.83896 0.481968L4.24276 5.07816L1.76789 2.60329C1.57263 2.40803 1.25604 2.40803 1.06078 2.60329L0.353675 3.3104C0.158413 3.50566 0.158413 3.82224 0.353675 4.0175L3.1821 6.84593L3.88921 7.55304C4.08447 7.7483 4.40105 7.7483 4.59632 7.55304L5.30342 6.84593L10.2532 1.89618C10.4484 1.70092 10.4484 1.38434 10.2532 1.18907L9.54606 0.481968Z"
            ></path>
          </svg>
        )}
      </span>
      <span className="max-w-[125px] whitespace-pre-wrap">{value}</span>
      <input
        id={value}
        onChange={onSelectFilter(index, typeIndex, subtypeIndex)}
        checked={selected}
        type="checkbox"
        className="appearance-none checked:bg-blue-500"
      />
    </label>
  ))
}
