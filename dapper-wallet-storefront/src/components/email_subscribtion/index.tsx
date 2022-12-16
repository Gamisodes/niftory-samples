import classNames from "classnames"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { memo, useCallback, useMemo, useState } from "react"
import { useSendEmailToKlaviyo } from "src/services/klaviyo/hooks"
import * as yup from "yup"
import Modal from "./Modal"
import Select from "./Select"
const EmailSchema = yup.object({
  email: yup.string().email().required(),
  year: yup.string().required(),
  month: yup.string().required(),
})

interface IFormState {
  email: string
  year: string
  month: string
}

const currentYear = new Date().getFullYear()
const yearArray = Array(120)
  .fill(1)
  .map((_, index) => {
    return String(currentYear - index)
  })
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
    if (+values.year > currentYear - 18) {
      actions.setFieldError("year", "You must be upper than 18")
      return
    }
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
          initialValues={{ email: "", year: String(yearArray[0]), month: monthList[0] }}
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
                          className="shadow-xl max-w-sm w-full md:w-80 py-1 px-2 sm:px-4 sm:py-3 text-base sm:text-xl text-gray-500 border-2 border-gray-500"
                          {...field}
                          type="email"
                          placeholder="Enter email"
                        />
                        <button
                          type="button"
                          className="flex items-center justify-center py-1 px-2  sm:py-2 sm:px-5 uppercase text-base sm:text-2xl bg-purple hover:bg-purple.hover border-2 border-gray-500 shadow-xl"
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
                    <Field name="month">
                      {({ form }) => (
                        <div>
                          <label htmlFor="month">Month</label>
                          <Select name="month" list={monthList} />
                          <section
                            className={classNames("text-white pt-2 h-8", {
                              hidden: !(form.errors.month && form.touched.month),
                            })}
                          >
                            {!form.errors.month && form.touched.month && <p>{form.errors.month}</p>}
                          </section>
                        </div>
                      )}
                    </Field>
                    <Field name="year">
                      {({ form }) => (
                        <div>
                          <label htmlFor="year">Year</label>
                          <Select name="year" list={yearArray} />
                          <section
                            className={classNames("text-white pt-2 h-8", {
                              hidden: !(form.errors.year && form.touched.year),
                            })}
                          >
                            {form.errors.year && form.touched.year && <p>{form.errors.year}</p>}
                          </section>
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
