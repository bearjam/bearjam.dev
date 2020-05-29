import React from "react"

function SvgVisId(props) {
  return (
    <svg viewBox="0 0 41.491 32.459" {...props}>
      <defs>
        <filter id="vis-id_svg__a" colorInterpolationFilters="sRGB">
          <feTurbulence
            result="turbulence"
            seed={241}
            baseFrequency="2.58515 2.56966"
            type="fractalNoise"
          />
          <feComposite
            result="composite1"
            operator="in"
            in2="turbulence"
            in="SourceGraphic"
          />
          <feColorMatrix
            result="color"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 9.26271 -0.678271"
          />
          <feFlood result="flood" floodColor="#FFF" floodOpacity={0.376} />
          <feMerge result="merge">
            <feMergeNode in="flood" />
            <feMergeNode in="color" />
          </feMerge>
          <feComposite result="composite2" operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      <path
        d="M15.703 10.715L1.428 18.957l14.275 8.242 14.276-8.242z"
        fill="#febc85"
      />
      <path
        d="M319.475 269.737l-86.602 100 86.602 50z"
        transform="matrix(.16484 0 0 .16484 -36.96 -41.992)"
        fill="#edccea"
        fillOpacity={0.466}
        filter="url(#vis-id_svg__a)"
      />
      <path
        d="M15.703 2.473L29.98 18.957l-14.276 8.242z"
        fill="#deaaff"
        fillOpacity={0.453}
      />
      <path
        d="M15.703 2.473L1.428 18.957"
        fill="none"
        stroke="#2a4269"
        strokeWidth={0.174}
        strokeLinejoin="round"
      />
      <path
        d="M15.703 2.473L29.98 18.957"
        fill="none"
        stroke="#1b3661"
        strokeWidth={0.174}
        strokeLinejoin="round"
      />
      <path
        d="M1.428 18.957l14.335 8.17"
        fill="#281845"
        stroke="#00214e"
        strokeWidth={0.175}
        strokeLinejoin="round"
      />
      <path
        d="M15.703 10.715l14.276 8.242"
        fill="none"
        stroke="#00214e"
        strokeWidth={0.174}
        strokeLinejoin="round"
        strokeOpacity={0.514}
      />
      <path
        d="M15.703 10.715L1.428 18.957"
        fill="none"
        stroke="#746785"
        strokeWidth={0.174}
        strokeLinejoin="round"
        strokeOpacity={0.497}
      />
      <path
        d="M30.047 18.994l-14.336 8.17"
        fill="#281845"
        stroke="#00214e"
        strokeWidth={0.175}
        strokeLinejoin="round"
      />
      <path
        d="M15.703 2.473l.11 24.726"
        fill="#00214e"
        stroke="#00214e"
        strokeWidth={0.174}
        strokeLinejoin="round"
      />
      <path
        d="M41.302 32.329L21.665 16.024l19.648 8.242.022 6.842z"
        fill="#af83f8"
      />
      <path d="M21.665 16.024L41.32 25.43l-.008-1.165z" fill="#e77681" />
      <path
        d="M22.005 16.242L41.32 27.36c-.01.613 0 1.177 0 1.177z"
        fill="#b2dfbc"
      />
      <path d="M21.802 16.121L41.313 30.86l.011-1.106z" fill="#9296f6" />
      <path d="M41.327 25.353l-19.433-9.25 19.425 10.383z" fill="#febc85" />
      <path d="M22.512 16.431L41.32 27.536l.007-1.061z" fill="#ffe9a6" />
      <path d="M21.72 16.043l19.6 12.474.002 1.233z" fill="#a8cbfe" />
      <path
        d="M21.92 16.144l19.483 8.109-.127 8.119z"
        fill="none"
        stroke="#00214e"
        strokeWidth={0.175}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgVisId

