import { Center, HeadingProps } from "@chakra-ui/react"

export interface SectionHeaderProps extends HeadingProps {
  text: JSX.Element | string
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { text } = props

  return (
    <Center>
      <h1 className="text-white font-bangers uppercase text-5xl font-extrabold py-12">{text}</h1>
    </Center>
  )
}
