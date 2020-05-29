import sgMail from "@sendgrid/mail"
import { NowRequest, NowResponse } from "@now/node"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const msg = {
      to: "thomasononano@gmail.com",
      from: "contactformservice@bearjam.dev",
      subject: "Contact Form Submission",
      text: JSON.stringify(req.body, null, 2),
    }

    try {
      const sgRes = await sgMail.send(msg)
      console.log(`res is ${sgRes}`)
      res.status(200).json(JSON.stringify(sgRes))
    } catch (error) {
      console.log(`error is ${error}`)
      if (error.res) {
        return res.status(400).json(JSON.stringify(error.res.body))
      }
    }
  } catch (error) {
    console.log(`outer error is ${error}`)
    return res.status(400).json({ error })
  }
}
