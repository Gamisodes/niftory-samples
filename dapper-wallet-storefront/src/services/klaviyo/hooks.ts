import { useMutation } from "@tanstack/react-query"
import { KlaviyoRequest } from "./request"

export const klaviyoKeys = {
  all: ["klaviyo"] as const,
  lists: (userId: number) => [...klaviyoKeys.all, "list", userId] as const,
}
interface ISuccessResponseFromKvyilo {
  data: { is_subscribed: boolean }
  is_subscribed: boolean
  errors: []
  success: boolean
}
interface IErrorsResponseFromKvyilo {
  errors: []
}
export function useSendEmailToKlaviyo() {
  return useMutation<ISuccessResponseFromKvyilo, IErrorsResponseFromKvyilo, { email: string }>(
    (props) => KlaviyoRequest.postKlaviyoEmail(props)
  )
}
