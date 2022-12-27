import classNames from "classnames"

export interface SectionHeaderProps {
  text: JSX.Element | string
  classNames?: string
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { text } = props

  return (
    <section className="flex justify-center">
      <h1
        className={classNames(
          "font-bangers uppercase text-5xl font-extrabold py-12",
          props.classNames
        )}
      >
        {text}
      </h1>
    </section>
  )
}
