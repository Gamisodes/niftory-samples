export interface SectionHeaderProps {
  text: JSX.Element | string
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { text } = props

  return (
    <section className="flex justify-center">
      <h1 className="text-black font-bangers uppercase text-5xl font-extrabold py-12">{text}</h1>
    </section>
  )
}
