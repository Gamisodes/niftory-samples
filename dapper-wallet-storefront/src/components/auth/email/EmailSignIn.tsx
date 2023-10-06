import { useToast } from "@chakra-ui/react"
import classNames from "classnames"
import { Field, Form, Formik } from "formik"
import { PropsWithChildren, memo, useCallback, useEffect, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Loading } from "src/icon/Loading"
import { createRedirectUrl } from "src/lib/createRedirectUrl"
import { useMailAuthLink } from "src/services/auth/hooks"
import * as yup from "yup"

type IEmailSignIn = PropsWithChildren

interface IFormikState {
  email: string
  captcha: string
}

const EmailSchema = yup.object({
  email: yup.string().email().required(),
  captcha: yup.string().min(10).required(),
})

function EmailSignIn({ children }: IEmailSignIn) {
  const toast = useToast()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { mutateAsync, isError, isSuccess, isLoading } = useMailAuthLink()
  const onSubmit = useCallback(async ({ email, captcha }: IFormikState) => {
    // const _options = { ...options, email, redirect: false }
    try {
      await mutateAsync({
        email,
        captcha,
        redirectUrl: createRedirectUrl("/account"),
      })
      // const { ok, url, error, status } = await signIn(providerId, _options, {
      //   // nftModelId: "d263ae9a-0b9e-47c0-aa78-ff0d181946db",
      // })
      // console.log(ok, error, status)
      // if (ok && !error) {
      //   router.push(`/verify?email=${email}`)
      // } else {
      //   router.push("/")
      // }
    } catch (error) {
      console.log("Unable to sign-in: ", error)
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Sign-in success",
        description: "Please, check your email for the next steps",
        status: "success",
        duration: 4000,
        isClosable: true,
      })
    }
  }, [isSuccess])
  useEffect(() => {
    if (isError) {
      toast({
        title: "Sign-in error",
        description: "Please, try again. Our dev's will resolve this problem soon",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
  }, [isError])

  return (
    <>
      <Formik<IFormikState>
        initialValues={{ email: "", captcha: "fsadfsdf" }}
        validationSchema={EmailSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="w-72 md:w-96 border-b-2 pb-6 mb-6" id="email_subscription_form">
              <Field name="email">
                {({ field, form }) => (
                  <div className="flex flex-col">
                    <div className="grid">
                      <input
                        className="border border-black text-gray-600 w-full p-3 text-base font-roboto"
                        {...field}
                        disabled={isLoading}
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
              <Field name="captcha">
                {({ form }) => {
                  return (
                    <>
                      <ReCAPTCHA
                        className="w-max mx-auto pt-5"
                        ref={recaptchaRef}
                        onBlur={() => setFieldTouched("captcha", true)}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={(token) => {
                          setFieldValue("captcha", token)
                        }}
                      />
                      <section
                        className={classNames("text-red-500 w-max mx-auto text-sm py-1", {
                          invisible: !form.errors.captcha,
                        })}
                      >
                        {!form.errors.captcha && form.touched.captcha ? (
                          <p>Enter the captcha you'd like to receive the newsletter on.</p>
                        ) : (
                          <p>captcha is required.</p>
                        )}
                      </section>
                    </>
                  )
                }}
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
