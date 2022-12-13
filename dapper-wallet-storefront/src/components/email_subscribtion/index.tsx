import classNames from "classnames"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { memo, useCallback, useMemo, useState } from "react"
import { useSendEmailToKlaviyo } from "src/services/klaviyo/hooks"
import * as yup from "yup"
import Modal from "./Modal"
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

function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return useMemo(() => ({ isOpen, closeModal, openModal }), [isOpen])
}

function EmailSubscription() {
  const { isOpen, closeModal, openModal } = useModal()

  const { mutateAsync } = useSendEmailToKlaviyo()

  const onSubmit = useCallback(async (values: IFormState, actions: FormikHelpers<IFormState>) => {
    await mutateAsync(values)
    actions.setSubmitting(false)
    closeModal()
    actions.resetForm()
  }, [])
  return (
    <>
      <section>
        <p className="text-xl font-normal mb-1">Stay up to date on the latest with Gamisodes</p>
        <Formik<IFormState>
          initialValues={{ email: "", day: "", month: "" }}
          validationSchema={EmailSchema}
          onSubmit={onSubmit}
        >
          {(props) => {
            return (
              <Form id="email_subscription_form">
                <Field name="email">
                  {({ field, form }) => (
                    <div className="flex flex-col">
                      <div className="flex border-2 border-gray-500 shadow-[3px_3px_0px_3px_#000000]">
                        <input
                          className="shadow-xl max-w-sm w-full md:w-80 px-4 py-3 text-xl text-gray-500 border-2 border-gray-500"
                          {...field}
                          type="email"
                          placeholder="Enter email"
                        />
                        <button
                          className="flex items-center justify-center py-2 px-5 uppercase text-2xl bg-purple hover:bg-purple.hover border-2 border-gray-500 shadow-xl"
                          onClick={() => {
                            if (props.errors.email || props.values.email.length === 0) return
                            openModal()
                          }}
                        >
                          Submit
                        </button>
                      </div>
                      <section
                        className={classNames("text-red-500 pt-2 h-8", {
                          invisible: !(form.errors.email && form.touched.email),
                        })}
                      >
                        {!form.errors.email && form.touched.email ? (
                          <p>Enter the email you'd like to receive the newsletter on.</p>
                        ) : (
                          <p>Email is required.</p>
                        )}
                      </section>
                    </div>
                  )}
                </Field>
                <Modal title="When’s your birthday?" closeModal={closeModal} isOpen={isOpen}>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent you an email with all
                      of the details of your order.
                    </p>
                    <Field name="day">
                      {({ field, form }) => (
                        <div>
                          <label htmlFor="day">Day</label>
                          <div>
                            {/* <Select {...field} placeholder="Select day">
                              {dateArray.map((val, index) => {
                                const content = val * (index + 1)
                                return (
                                  <option key={content} value={String(content)}>
                                    {content}
                                  </option>
                                )
                              })}
                            </Select> */}
                          </div>
                        </div>
                      )}
                    </Field>
                    <Field name="month">
                      {({ field }) => (
                        <div>
                          <label htmlFor="month">Month</label>
                          <div>
                            {/* <Select placeholder="Select month" {...field}>
                              {monthList.map((val) => {
                                return (
                                  <option key={val} value={val}>
                                    {val}
                                  </option>
                                )
                              })}
                            </Select> */}
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      form="email_subscription_form"
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // isLoading={props.isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Modal>
              </Form>
            )
          }}
        </Formik>
      </section>
    </>
  )
}

export default memo(EmailSubscription)
