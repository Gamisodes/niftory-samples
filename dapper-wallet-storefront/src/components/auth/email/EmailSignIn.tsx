import classNames from "classnames"
import { Field, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { PropsWithChildren, memo, useCallback } from "react"
import { Loading } from "src/icon/Loading"
import * as yup from "yup"

interface IEmailSignIn extends PropsWithChildren {
  providerId: string
  options: Record<string, unknown>
}

interface IFormikState {
  email: string
}

const EmailSchema = yup.object({
  email: yup.string().email().required(),
})

function EmailSignIn({ children, providerId, options }: IEmailSignIn) {
  const router = useRouter()

  const onSubmit = useCallback(async ({ email }: IFormikState) => {
    const _options = { ...options, email, redirect: false }
    try {
      const { ok } = await signIn(providerId, _options)
      if (ok) {
        router.push(`/verify?email=${email}`)
      }
    } catch (error) {
      console.log("Unable to sign-in: ", error)
    }
  }, [])

  return (
    <>
      <Formik<IFormikState>
        initialValues={{ email: "" }}
        validationSchema={EmailSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="w-72 md:w-96 border-b-2 pb-6 mb-6" id="email_subscription_form">
              <Field name="email">
                {({ field, form }) => (
                  <div className="flex flex-col">
                    <div className="grid">
                      <input
                        className="border border-black text-gray-600 w-full p-3 text-base font-roboto"
                        {...field}
                        type="email"
                        placeholder="Enter email"
                      />
                      <section
                        className={classNames("text-red-500 text-sm  pt-2", {
                          invisible: !(form.errors.email && form.touched.email),
                        })}
                      >
                        {!form.errors.email && form.touched.email ? (
                          <p>Enter the email you'd like to receive the newsletter on.</p>
                        ) : (
                          <p>Email is required.</p>
                        )}
                      </section>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={classNames(
                          "justify-self-center cursor-pointer flex justify-center px-6 items-center py-3 mt-1 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow-lg outline-none hover:border-header focus:outline-none disabled:opacity-30",
                          isSubmitting ? "w-auto" : "w-[210px]"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loading className="w-4 h-4" />
                            Calling for Inspector Gadget
                          </>
                        ) : (
                          children
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </Field>
            </Form>
          )
        }}
      </Formik>
      <h5>Or maybe you want to try other sign in ways?</h5>
    </>
  )
}

export default memo(EmailSignIn)
