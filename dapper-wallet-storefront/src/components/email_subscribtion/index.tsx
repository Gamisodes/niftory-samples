import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  useDisclosure,
} from "@chakra-ui/react"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { useCallback } from "react"
import * as yup from "yup"

const EmailSchema = yup.object({
  email: yup.string().email().required(),
})

interface IFormState {
  email: string
}

interface IResponseFromKvyilo {
  data: { is_subscribed: boolean }
  is_subscribed: boolean
  errors: []
  success: boolean
}

const fetchData = async (email: string) => {
  const body = {
    g: "Wugani",
    $fields: "$first_name, $parent, Birthday Day, Birthday Month ,$source",
    email,
    $first_name: "",
    $parrent: "",
    "Birthday Day": "25",
    "Birthday Month": "July",
    $source: "Sign up form",
  }
  const newData = new URLSearchParams(body)
  const data: IResponseFromKvyilo = await fetch(
    "https://manage.kmail-lists.com/ajax/subscriptions/subscribe",
    {
      method: "POST",
      headers: {
        //   "content-type": "application/json",
        "content-type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
      },
      body: newData,
    }
  ).then((res) => res.json())
  return data
}

function EmailSubscription() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = useCallback(async (values: IFormState, actions: FormikHelpers<IFormState>) => {
    await fetchData(values.email)
    actions.setSubmitting(false)
    onClose()
    actions.resetForm()
  }, [])

  return (
    <>
      <Box padding="2" background="white" borderRadius="10px">
        <Formik initialValues={{ email: "" }} validationSchema={EmailSchema} onSubmit={onSubmit}>
          {(props) => (
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
                            if (props.errors.email) return
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
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>saSa</ModalBody>

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
          )}
        </Formik>
      </Box>
    </>
  )
}

export default EmailSubscription
