import React, { FC } from "react"

interface IEmojyInfoBlock {
  title: string
  text: string | string[]
}
const arrayToText = (arr) => {
  return (
    <p>
      {arr.map((text) => (
        <React.Fragment key={text}>
          <span>{text}</span>
          <br />
        </React.Fragment>
      ))}
    </p>
  )
}

export const EmojyInfoBlock: FC<IEmojyInfoBlock> = ({ title, text }) => {
  const renderText = Array.isArray(text) ? arrayToText(text) : text
  return (
    <div className="font-dosis my-2 flex flex-col items-center lg:max-w-[340px]">
      <div className="text-[36px]">{title}</div>
      <div className="text-center text-[20px]">{renderText}</div>
    </div>
  )
}
