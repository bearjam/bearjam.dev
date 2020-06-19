module.exports = {
  extends: "lighthouse:default",
  output: "json",
  settings: {
    // onlyCategories: ["performance"],
    onlyAudits: [
      "first-contentful-paint",
      "speed-index",
      "interactive",
      "first-meaningful-paint",
      "first-cpu-idle",
      "max-potential-fid",
    ],
    // onlyAudits: [
    //   "metrics/first-contentful-paint",
    //   "metrics/speed-index",
    //   "metrics/interactive",
    //   "metrics/first-meaningful-paint",
    //   "metrics/first-cpu-idle",
    //   "metrics/max-potential-fid",
    // ],
  },
}
