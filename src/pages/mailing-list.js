import React from "react"
import { parse } from "query-string"

const MailingListPage = ({ location: { search } }) => {
  const { token } = parse(search)

  return <div className="pt-16">{/* {token ? (

      ) : (

      )} */}</div>
}

export default MailingListPage
