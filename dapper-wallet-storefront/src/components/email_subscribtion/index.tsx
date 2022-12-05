import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { useCallback } from "react"
import { useSendEmailToKlaviyo } from "src/services/klaviyo/hooks"
import * as yup from "yup"

const EmailSchema = yup.object({
  email: yup.string().email().required(),
  day: yup.string().matches(new RegExp("^(0?[1-9]|[12][0-9]|3[01])$")).required(),
  month: yup.string().required(),
})

interface IFormState {
  email: string
  day: string
  month: string
}

const dateArray = Array(31).fill(1)
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function EmailSubscription() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutateAsync } = useSendEmailToKlaviyo()

  const onSubmit = useCallback(async (values: IFormState, actions: FormikHelpers<IFormState>) => {
    await mutateAsync(values)
    actions.setSubmitting(false)
    onClose()
    actions.resetForm()
  }, [])
  return (
    <>
      <Box padding="2" background="white" borderRadius="10px">
        <Text fontSize="md">Stay up to date on the latest with Gamisodes </Text>

        <Formik<IFormState>
          initialValues={{ email: "", day: "", month: "" }}
          validationSchema={EmailSchema}
          onSubmit={onSubmit}
        >
          {(props) => {
            return (
              <Form id="my-form">
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                      <InputGroup size="md">
                        <Input {...field} pr="6.5rem" type="email" placeholder="Enter email" />
                        <InputRightElement right="1" width="6rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            isLoading={props.isSubmitting}
                            onClick={() => {
                              if (props.errors.email || props.values.email.length === 0) return
                              onOpen()
                            }}
                          >
                            Send email
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      {!form.errors.email && form.touched.email ? (
                        <FormHelperText>
                          Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                      ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                </Field>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>When’s your birthday?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Field name="day">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Day</FormLabel>
                            <InputGroup size="md" marginBottom={2}>
                              <Select {...field} placeholder="Select day">
                                {dateArray.map((val, index) => {
                                  const content = val * (index + 1)
                                  return (
                                    <option key={content} value={String(content)}>
                                      {content}
                                    </option>
                                  )
                                })}
                              </Select>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="month">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Month</FormLabel>
                            <InputGroup size="md">
                              <Select placeholder="Select month" {...field}>
                                {monthList.map((val) => {
                                  return (
                                    <option key={val} value={val}>
                                      {val}
                                    </option>
                                  )
                                })}
                              </Select>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        form="my-form"
                        type="submit"
                        variant="ghost"
                        isLoading={props.isSubmitting}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Form>
            )
          }}
        </Formik>
      </Box>
    </>
  )
}

export default EmailSubscription
