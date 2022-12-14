import React, { memo } from "react"
import Image from "next/image"

function Hero() {
  return (
    <section className="container bg-main flex flex-col gap-4 md:flex-row md:items-center px-2">
      <div className="text-white font-bangers">
        <h1 className="uppercase text-4xl md:text-8xl mb-2 md:mb-8">placeholder</h1>
        <p className="text-2xl md:text-4xl">
          Lacus ultricies nascetur fermentum augue fermentum viverra.
        </p>
      </div>
      <div>
        <Image src="/braintrain.png" alt="BrainTrain main image" width={640} height={690} />
      </div>
    </section>
  )
}

export default memo(Hero)
