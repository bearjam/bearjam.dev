import sgMail from "@sendgrid/mail"
import { NowRequest, NowResponse } from "@now/node"
import { Firestore } from "@google-cloud/firestore"
import { string } from "yup"
import _ from "lodash"

const db = new Firestore({
  projectId: process.env.GCP_FS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_FS_CLIENT_EMAIL,
    private_key: process.env.GCP_FS_PRIVATE_KEY,
  },
})

const COLLECTION = "subscribers"
const collection = db.collection(COLLECTION)

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const email = _.get(req, "body.email")
    if (email && string().email().isValid(email)) {
      await collection.doc(email).create({
        subscribed: Date.now(),
        active: false,
      })
      res.status(200).json({ message: "e-mail subscribed" })
    } else {
      res.status(400).json({ message: "bad e-mail in submission" })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err })
  }
}
