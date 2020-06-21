exports.onRouteUpdate = ({ location }) =>
  setTimeout(() => void scrollToAnchor(location), 500)

function scrollToAnchor(location) {
  if (location && location.hash) {
    document
      .querySelector(`${location.hash}`)
      .scrollIntoView({ behavior: "smooth" })
  } else {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}
