const meta: Metadata = {
  title: 'Chapter 3: Server-Side Rendering',
  description: 'Server Components, Next',
  lang: 'en',
  current: true,
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Single Page Apps">
        <p>
          <Abbr key="SPA" /> do all the work client-side, in particular the{' '}
          <strong>rendering</strong>. The client downloads a shell page and a JavaScript bundle
          which takes care of rendering.
        </p>
        <h3>Drawbacks</h3>
        <ul>
          <li>Slow first load</li>
          <li>Multiple round trips</li>
          <li>
            <Abbr key="SEO" />
          </li>
          <li>Accessibility</li>
          <li>Doesn't work without JavaScript</li>
        </ul>
        <Idea>
          <p>
            JavaScript can also be run server-side. Why don't we run React there too to directly
            have <Abbr key="HTML" />?
          </p>
        </Idea>
      </Slide>
      <Slide title="Server-Side Rendering">
        <p>Rendering a React component server-side has the following benefits</p>
        <ul>
          <li>No need to serve the libraries to the client</li>
          <li>
            Better for <Abbr key="SEO" />
          </li>
          <li>Works without JavaScript on the client-side</li>
          <li>No multiple round trips</li>
        </ul>
      </Slide>
      <Slide title="React: server components"></Slide>
    </Slideshow>
  )
}
