module.exports = {
  extends: "lighthouse:default",
  output: "json",
  settings: {
    onlyAudits: [
      "first-contentful-paint",
      "speed-index",
      "interactive",
      "first-meaningful-paint",
      "first-cpu-idle",
      "max-potential-fid",
    ],
  },
}
