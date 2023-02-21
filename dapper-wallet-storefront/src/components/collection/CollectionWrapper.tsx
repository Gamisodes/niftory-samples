import classNames from "classnames"
import { memo, PropsWithChildren } from "react"

interface ICollectionWrapper extends PropsWithChildren {
  paddingBottom?: boolean
}
function CollectionWrapper({ children, paddingBottom = true }: ICollectionWrapper) {
  return (
    <section
      className={classNames(
        "flex flex-col justify-between min-w-screen w-full min-h-screen h-full bg-header.opacity bg-[url('/collection_BG.webp')] bg-cover relative -top-16 p-7 pb-6 py-16",
        {
          "pb-0": !paddingBottom,
        }
      )}
    >
      <div className="flex items-center h-full flex-col text-white">{children}</div>
    </section>
  )
}

export default memo(CollectionWrapper)
