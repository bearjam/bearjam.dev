exports.onRouteUpdate = ({ location }) =>
  setTimeout(() => void scrollToAnchor(location, 64), 500)

function scrollToAnchor(location, mainNavHeight = 0) {
  if (location && location.hash) {
    let element = document.querySelector(`${location.hash}`)
    if (element) {
      let y = element.getBoundingClientRect().top - mainNavHeight
      document.body.scrollTo({ top: y, behavior: "smooth" })
      // element.scrollIntoView({ behavior: "smooth" })
    }
  } else {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}
