export const defaultPresenceProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const defaultSpring = {
  type: "spring",
  damping: 40,
  mass: 1.5,
  stiffness: 175,
}

export const springQuickExit = {
  type: "spring",
  damping: 100,
  mass: 1,
  stiffness: 500,
  restDelta: 1,
  restSpeed: 1,
}

export const springTwo = {
  type: "spring",
  damping: 10,
  mass: 1,
  stiffness: 100,
}

export const presets = {
  default: { mass: 1, stiffness: 170, damping: 26 },
  gentle: { mass: 1, stiffness: 120, damping: 14 },
  wobbly: { mass: 1, stiffness: 180, damping: 12 },
  stiff: { mass: 1, stiffness: 210, damping: 20 },
  slow: { mass: 1, stiffness: 280, damping: 60 },
  molasses: { mass: 1, stiffness: 280, damping: 120 },
}
