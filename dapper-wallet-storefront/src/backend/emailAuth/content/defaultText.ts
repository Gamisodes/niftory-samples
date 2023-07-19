export type ITextAnswerParams = { url: string; host: string }

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function defaultText({ url, host }: ITextAnswerParams) {
  return `Sign in to ${host}\n${url}\n\n`
}
