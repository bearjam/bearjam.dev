import { motion } from "framer-motion"
import React from "react"
import useSWR from "swr"

const Wrapper = props => (
  <motion.div
    animate="animate"
    initial="initial"
    exit="initial"
    variants={{
      animate: {
        opacity: 1,
      },
      initial: {
        opacity: 0,
      },
    }}
  />
)

const APITestPage = () => {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR("/api/bar", fetcher)

  if (error)
    return (
      <Wrapper className="bg-red-500">{JSON.stringify(error, null, 2)}</Wrapper>
    )
  if (!data) return <Wrapper className="bg-yellow-500">loading...</Wrapper>
  return <Wrapper className="bg-green-500">hello {data.name}!</Wrapper>
}

export default () => (
  <div className="pt-16 bg-pink-500">
    <APITestPage />
  </div>
)
