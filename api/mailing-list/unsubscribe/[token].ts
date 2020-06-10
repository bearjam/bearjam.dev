import { Firestore } from "@google-cloud/firestore"
import { NowRequest, NowResponse } from "@now/node"
import { JWT } from "jose"

interface Payload {
  email: string
}

const key = JSON.parse(Buffer.from(process.env.MAILER_JWK, "base64").toString())

const db = new Firestore({
  projectId: process.env.GCP_FS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_FS_CLIENT_EMAIL,
    private_key: process.env.GCP_FS_PRIVATE_KEY,
  },
})

const collection = db.collection("subscribers")

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const {
      query: { token: b64 },
    } = req

    const x = Buffer.from(<string>b64, "base64").toString()

    const payload = JWT.verify(x, key)

    const { email } = <Payload>payload

    const docRef = collection.doc(email)

    await docRef
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          docRef.update({
            active: false,
            unsubscribed: Date.now(),
          })
        }
      })
      .then(_ => {
        res.json({ email, subscribed: false })
      })
  } catch (err) {
    console.log("err!", err)
    res.status(400).send("Unknown error")
  }
}
