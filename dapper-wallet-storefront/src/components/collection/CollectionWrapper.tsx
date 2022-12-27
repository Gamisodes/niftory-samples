import { memo, PropsWithChildren } from "react"

function CollectionWrapper({ children }: PropsWithChildren) {
  return (
    <section className="flex flex-col justify-between min-w-screen w-full min-h-screen h-full p-7 pb-6 bg-header.opacity bg-[url('/collection_BG.jpg')] bg-cover relative -top-16 py-16">
      <div className="flex items-center h-full flex-col text-white">{children}</div>
    </section>
  )
}

export default memo(CollectionWrapper)
