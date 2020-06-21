import React from "react"
import importAll from "import-all.macro"

const mean = xs => xs.reduce((p, n) => p + n, 0) / xs.length
const keys = o => Object.keys(o)

const auditNames = [
  "3d-logo-a",
  "3d-logo-lazy",
  "3d-spinner-behind-button",
  "tw-next-starter",
]

const metricNames = [
  "first-contentful-paint",
  "first-meaningful-paint",
  "speed-index",
  "max-potential-fid",
  "first-cpu-idle",
  "interactive",
]

const PerfChart = () => {
  let audits = importAll.sync("./audits/*.json")
  // ks = keys(audits),
  // res = ks.reduce((p, k) => {
  //   let key = k.replace(/\.\/audits\/(.*)-\d\.json/, "$1")
  //   console.log(p[key])
  //   return {
  //     ...p,
  //     [key]: audits[k].default,
  //   }
  // }, {})

  const xs = [10, 2, 38, 23, 38, 23, 21]
  return (
    <div>
      {/* <h1>{mean(xs)}</h1> */}
      <pre>{JSON.stringify(audits, null, 2)}</pre>
    </div>
  )
}

export default PerfChart
