import { useToast } from "@chakra-ui/react"
import classNames from "classnames"
import { Field, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { memo, useCallback, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Loading } from "src/icon/Loading"
import Button from "src/ui/Button"
import * as yup from "yup"

interface IFormState {
  email: string
  captcha: string
}

const FreePromoSchema = yup.object({
  email: yup.string().email().required(),
  captcha: yup.string().min(10).required(),
})

function FreePromoComponent() {
  const toast = useToast()
  const router = useRouter()
  const nftModelId = router.query["nftModelId"]?.toString()
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const onSubmit = useCallback(async ({ email, captcha }: IFormState) => {
    try {
      const { ok, error } = await signIn(
        "email",
        { redirect: false, email },
        {
          nftModelId,
          captcha,
        }
      )
      if (ok && !error) {
        // toast({
        //   title: "Please, check your email for your Free NFT!",
        //   description: `You may get your Free NFT on the inbox`,
        //   status: "success",
        //   duration: 4000,
        //   isClosable: true,
        // })
        router.push(`/promo/confirm/${nftModelId}`)
      } else if (error) {
        toast({
          title: "Something went wrong!",
          description: `Please, reload your tab and try again!`,
          status: "error",
          duration: 4000,
          isClosable: true,
        })
        recaptchaRef.current.reset()
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: `Our developers know about this problem, and try to resolve it!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
      recaptchaRef.current.reset()
    }
  }, [])

  return (
    <Formik<IFormState>
      initialValues={{ email: "", captcha: "fsadfsdf" }}
      validationSchema={FreePromoSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {({ isSubmitting, errors, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="w-full lg:mb-4" id="email_subscription_form">
            <Field name="email">
              {({ field, form }) => (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col md:flex-row items-baseline md:space-x-4">
                    <div className="flex flex-col w-full">
                      <input
                        className="border border-black text-gray-600 w-full md:w-80 p-2 px-5 text-base font-roboto md:max-w-[294px] rounded-md"
                        {...field}
                        type="email"
                        placeholder="Enter email for digital edition"
                      />
                      <section
                        className={classNames("text-red-500 text-sm py-1", {
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
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting || !!Object.values(errors).length}
                      className={classNames(
                        "flex items-center justify-center rounded-md bg-[#EFAC37] hover:bg-white hover:border-[#EFAC37] disabled:bg-[#e7a940] w-full md:w-full text-center border border-transparent mt-0 disabled:cursor-not-allowed mb-4"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loading className="w-3 h-3" />
                          Transfer
                        </>
                      ) : (
                        <>Get free NFT</>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Field>
            <Field name="captcha">
              {({ form }) => {
                return (
                  <>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      onBlur={() => setFieldTouched("captcha", true)}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={(token) => {
                        setFieldValue("captcha", token)
                      }}
                    />
                    <section
                      className={classNames("text-red-500 text-sm py-1", {
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
  )
}

export default memo(FreePromoComponent)
