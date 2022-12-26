import Link from "next/link"
import { memo, PropsWithChildren } from "react"
import Button from "src/ui/Button"
import Image from "next/image"

function CollectionWrapper({ children }: PropsWithChildren) {
  return (
    <section className="flex flex-col justify-between min-w-screen w-full min-h-screen h-full p-7 pb-6 bg-header.opacity bg-[url('/collection_BG.jpg')] bg-cover relative -top-16 py-16">
      <div className="flex justify-center items-center h-full flex-col text-white">
        {/* <div className="z-10">
          <Image src="/product.png" alt="BrainTrain Product" width={526} height={498} />
        </div>
        <div className="text-white font-bangers max-w-md flex flex-col justify-center">
          <h1 className="uppercase leading-[61px] text-[56px] mb-2 md:mb-6">BRAIN TRAIN TICKETS</h1>
          <p className="font-dosis text-lg mb-5">
            <strong className="mb-6 flex font-bold text-xl">
              The Brain Train is the premier ride to the Gamisodes Inspector Gadget metaverse
            </strong>
            Drawn by celebrity artist Agnes Garowska, each Brain Train Ticket depicts Brain wearing
            a unique costume using elements featured in Season 1 of the 1980s animated series.
          </p>
          <p className="font-dosis font-bold text-4xl mb-2">$25</p>
          <Link href={`/app/drops/${process.env.NEXT_PUBLIC_DROP_ID}`}>
            <Button className="">Purchase ticket</Button>
          </Link>
        </div> */}
        {children}
      </div>
    </section>
  )
}

export default memo(CollectionWrapper)
