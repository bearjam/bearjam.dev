import { Firestore } from "@google-cloud/firestore"
import { NowRequest, NowResponse } from "@now/node"
import sgMail from "@sendgrid/mail"
import { JWT } from "jose"
import _ from "lodash"
import { string } from "yup"

const key = JSON.parse(Buffer.from(process.env.MAILER_JWK, "base64").toString())

const db = new Firestore({
  projectId: process.env.GCP_FS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_FS_CLIENT_EMAIL,
    private_key: process.env.GCP_FS_PRIVATE_KEY,
  },
})

const collection = db.collection("subscribers")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const email = _.get(req, "body.email")

    if (email && string().email().isValid(email)) {
      const docRef = collection.doc(email)

      await docRef.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          return docRef.set({
            subscribed: Date.now(),
            active: false,
          })
        }
      })

      const token = JWT.sign({ email }, key)

      const b64 = Buffer.from(token).toString("base64")

      const confirmLink = `https://bearjam.dev/api/mailing-list/confirm/${b64}`

      const msg = {
        to: email,
        from: "mailing-list@bearjam.dev",
        subject: "Confirm your e-mail address",
        html: `<a href="${confirmLink}">Click here to confirm your e-mail address</a>`,
      }

      await sgMail.send(msg)

      res
        .status(200)
        .json({ message: "Check your e-mail for a confirmation link" })
    } else {
      res.status(400).json({ message: "Bad e-mail in submission" })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err })
  }
}
