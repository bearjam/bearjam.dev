import * as d3 from "d3"
import React from "react"
import { animated, useSprings } from "react-spring"

function SvgMenu({ open, ...props }) {
  const line = d3.line()

  const paths = {
    cross: [
      {
        d: line([
          [4, 4],
          [16, 16],
        ]),
      },
      {
        d: line([
          [4, 4],
          [16, 16],
        ]),
      },
      {
        d: line([
          [4, 16],
          [16, 4],
        ]),
      },
    ],
    menu: [
      {
        d: line([
          [2, 5],
          [18, 5],
        ]),
      },
      {
        d: line([
          [2, 10],
          [18, 10],
        ]),
      },
      {
        d: line([
          [2, 15],
          [18, 15],
        ]),
      },
    ],
  }

  const menuSprings = useSprings(3, open === "open" ? paths.cross : paths.menu)

  return (
    <svg viewBox="0 0 20 20" {...props}>
      {menuSprings.map(({ d }, i) => (
        <animated.path
          key={i}
          d={d}
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

export default SvgMenu
