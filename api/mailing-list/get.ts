import { NowRequest, NowResponse } from "@now/node"
import { Firestore } from "@google-cloud/firestore"

const db = new Firestore({
  projectId: process.env.GCP_FS_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_FS_CLIENT_EMAIL,
    private_key: process.env.GCP_FS_PRIVATE_KEY,
  },
})

export default (req: NowRequest, res: NowResponse) => {
  db.collection("subscribers")
    .get()
    .then(subscribers => {
      const reducer = (acc, v) => [...acc, { [v.id]: v.data() }]
      res.json(subscribers.docs.reduce(reducer, []))
    })
}
