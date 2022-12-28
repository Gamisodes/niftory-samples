import classNames from "classnames"
import { Field, Form, Formik, FormikHelpers } from "formik"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { Loading } from "src/icon/Loading"
import { useSendEmailToKlaviyo } from "src/services/klaviyo/hooks"
import * as yup from "yup"
import Modal from "./Modal"
const EmailSchema = yup.object({
  email: yup.string().email().required(),
})

interface IFormState {
  email: string
}

interface ISetting {
  timeout?: number
}
function useModal({ timeout }: ISetting) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if (!timeout) return
    let timer: NodeJS.Timer
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false)
      }, timeout)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOpen])
  return useMemo(() => ({ isOpen, closeModal, openModal }), [isOpen])
}

function EmailSubscription() {
  const { isOpen, closeModal, openModal } = useModal({ timeout: undefined })

  const { mutateAsync } = useSendEmailToKlaviyo()

  const onSubmit = useCallback(async (values: IFormState, actions: FormikHelpers<IFormState>) => {
    await mutateAsync(values)
    openModal()
    actions.setSubmitting(false)
    actions.resetForm()
  }, [])
  return (
    <>
      <section>
        <p className="font-dosis text-base font-normal mb-6">
          Stay up to date on the latest with Gamisodes
        </p>
        <Formik<IFormState>
          initialValues={{ email: "" }}
          validationSchema={EmailSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form id="email_subscription_form">
                <Field name="email">
                  {({ field, form }) => (
                    <div className="flex flex-col">
                      <div className="flex w-full space-x-4">
                        <input
                          className="border border-black text-gray-600 w-full p-3 text-base font-roboto"
                          {...field}
                          type="email"
                          placeholder="Enter email"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center font-dosis font-bold text-base text-white transition-colors uppercase bg-header hover:bg-purple opacity py-3 px-6 disabled:bg-header.opacity"
                        >
                          {isSubmitting ? (
                            <>
                              <Loading className="w-4 h-4" />
                              Loading
                            </>
                          ) : (
                            "Subscribe"
                          )}
                        </button>
                      </div>
                      <section
                        className={classNames("text-red-500 text-base pt-2 h-8", {
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
                <Modal title="Gotcha!" closeModal={closeModal} isOpen={isOpen}>
                  <div className="mt-2 font-dosis font-bold text-lg text-center">
                    Great work Inspector, you are subscribed!
                  </div>
                  <div
                    onClick={closeModal}
                    className="w-7 h-7  absolute top-2 right-2 cursor-pointer transform-gpu transition-transform hover:scale-105"
                  >
                    <div className="transform-gpu h-0.5 w-3/4 bg-white absolute rotate-45 top-1/2 left-1/2 -translate-x-1/2"></div>
                    <div className="transform-gpu h-0.5 w-3/4 bg-white absolute -rotate-45 top-1/2 left-1/2 -translate-x-1/2"></div>
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
