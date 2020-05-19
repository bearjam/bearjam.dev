import sgMail from "@sendgrid/mail"
import { NowRequest, NowResponse } from "@now/node"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req: NowRequest, res: NowResponse) => {
  res.status(200).json({ name: "bar!" })
}
