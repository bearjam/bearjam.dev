// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from "@sendgrid/mail"
import { NowRequest, NowResponse } from "@now/node"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req: NowRequest, res: NowResponse) => {
  try {
    // console.log(req.body)
    const msg = {
      to: "thomasononano@gmail.com",
      from: "contactformservice@bearjam.dev",
      subject: "Contact Form Submission",
      text: JSON.stringify(req.body, null, 2),
      // html: req.body,
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
  // console.log("wtf???")
  // res.json({
  //   body: req.body,
  //   query: req.query,
  //   cookies: req.cookies
  // })
  // return

  // // const { body } = req
  // // console.log(`body is`, JSON.stringify(body, null, 2))
  // // res.status(200).json(body)

  // // console.log(`req body is:\n${req.body}`)
}
