import React from "react"

export default function Svg({ data, ...props }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data.childSvgoInline.inlineSVG,
      }}
      {...props}
    />
  )
}
