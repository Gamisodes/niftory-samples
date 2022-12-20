import React, { memo } from "react"
import Image from "next/image"
import ScrollDown from "src/icon/ScrollDown.svg"

function Hero() {
  return (
    <section className="relative -top-16 w-full bg-main flex flex-col gap-4 md:flex-row md:items-center px-2">
      <section className="min-h-screen ">
        <Image
          src="/BG.jpg"
          alt="BrainTrain main image"
          fill
          style={{
            objectFit: "cover",
            minHeight: "100vh",
          }}
          sizes="100vw"
        />
      </section>
      <div className="relative container grid grid-cols-[521px_1fr] gap-5">
        <section className="z-10">
          {/* <img src="/product.png" alt="" /> */}
          <Image src="/product.png" alt="BrainTrain Product" width={526} height={498} />
        </section>
        <div className="text-white font-bangers max-w-lg flex flex-col justify-center">
          <h1 className="uppercase leading-[61px] text-[56px] mb-2 md:mb-6">BRAIN TRAIN TICKETS</h1>
          <p className="font-dosis text-lg">
            <strong className="mb-6 flex font-bold text-xl">
              The Brain Train is the premier ride to the Gamisodes Inspector Gadget metaverse
            </strong>
            Drawn by celebrity artist Agnes Garowska, each Brain Train Ticket depicts Brain wearing
            a unique costume using elements featured in Season 1 of the 1980s animated series.
          </p>
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)
