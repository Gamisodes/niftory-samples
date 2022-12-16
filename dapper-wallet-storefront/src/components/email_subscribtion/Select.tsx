import { CheckIcon, UpDownIcon } from "@chakra-ui/icons"
import { Listbox, Transition } from "@headlessui/react"
import { useField } from "formik"
import { Fragment, memo, useState } from "react"
import { usePopper } from "react-popper"

interface IComponentSelectProps<T> {
  name: string
  list: T[]
}

function ComponentSelect<T>({ name, list }: IComponentSelectProps<T>) {
  const [field, meta, actions] = useField(name)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          boundary: "clippingParents",
        },
      },
      {
        name: "flip",
        options: {
          allowedAutoPlacements: ["bottom-end"],
          fallbackPlacements: ["bottom-end", "top-start"],
          altBoundary: true,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  })
  return (
    <div className="w-full">
      <Listbox
        {...field}
        onChange={(value) => {
          actions.setValue(value)
          actions.setTouched(true)
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button
            type="button"
            ref={setReferenceElement}
            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-pink-300 sm:text-sm"
          >
            <span className="block truncate text-gray-900">{field.value}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <UpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              style={styles.popper}
              ref={setPopperElement}
              {...attributes.popper}
              className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40"
            >
              {list.map((element, Idx) => (
                <Listbox.Option
                  key={Idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4  ${
                      active ? "bg-fuchsia-100 text-fuchsia-800" : "text-gray-900"
                    }`
                  }
                  value={element}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {String(element)}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default memo(ComponentSelect)
