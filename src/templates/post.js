import React from "react"

export default function PostTemplate({ frontmatter, children }) {
  return (
    <article>
      <pre>{JSON.stringify(frontmatter, null, 2)}</pre>
      <section>
        {children}
      </section>
    </article>
  )
}
