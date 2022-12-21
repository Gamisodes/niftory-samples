import { Box, Button, Spinner } from "@chakra-ui/react"
import { useMemo } from "react"

type WalletSetupBoxProps = {
  text: string | JSX.Element
  buttonText: string
  isLoading: boolean
  error?: Error
  onClick: () => void
}
export const WalletSetupBox = ({
  text,
  buttonText,
  isLoading,
  error,
  onClick,
}: WalletSetupBoxProps) => {
  useMemo(() => error && console.error(error), [error])

  if (isLoading) {
    return <Spinner color="white" />
  }

  if (error) {
    return (
      <Box className="text-white font-dosis">Something went wrong. Please try again later!</Box>
    )
  }

  return (
    <>
      <Box
        className="text-white font-dosis text-center"
        fontSize="xl"
        maxW="xl"
        textColor="page.text"
        py="8"
      >
        {text}
      </Box>
      <Button p="8" onClick={onClick}>
        {buttonText}
      </Button>
    </>
  )
}
