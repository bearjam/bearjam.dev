import React from "react"
import useSWR from "swr"

const GetPage = () => {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR("/api/mailing-list/get", fetcher)

  return (
    <div className="pt-16 border border-red-500">
      {data &&
        data.map(dp => (
          <pre className="border border-black">
            {JSON.stringify(dp, null, 2)}
          </pre>
        ))}
      {error && <p>{error}</p>}
    </div>
  )
}

export default GetPage
