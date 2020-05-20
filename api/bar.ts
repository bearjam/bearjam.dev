import sgMail from "@sendgrid/mail"
import { NowRequest, NowResponse } from "@now/node"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const wait = ms => new Promise(res => setTimeout(res, ms))

export default async (req: NowRequest, res: NowResponse) => {
  res.status(200).json({ name: "bar!" })
}
