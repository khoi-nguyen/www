const meta: Metadata = {
  title: 'Project',
  subtitle: 'Assessment Criteria',
  description: '',
  lang: 'en',
}

export default function () {
  return (
    <Page meta={meta}>
      <ul>
        <li>
          Appropriate use of <Abbr key="CSR" /> and <Abbr key="SSR" />
          <ul>
            <li>The website should mostly work without JavaScript</li>
            <li>Appropriate use of Server components or equivalent</li>
          </ul>
        </li>
        <li>
          Design patterns and best practices
          <ul>
            <li>Clear file structure</li>
            <li>Clear separation of models, components (view), routes</li>
            <li>Use of TypeScript in strict mode</li>
            <li>Avoid code repetition as much as possible</li>
            <li>Code is linted (prettier, eslint)</li>
            <li>
              The <Abbr key="UI" /> should be broken down into small components
            </li>
          </ul>
        </li>
        <li>
          <Abbr key="UX" /> and <Abbr key="UI" />
          <ul>
            <li>
              The website behaves as much as possible like a native app for clients who have
              JavaScript. In particular, there should not be any page reloads.
            </li>
            <li>
              Fine-grained control over client-side rerendering (i.e. <code>useEffect</code> or
              equivalent)
            </li>
          </ul>
        </li>
        <li>
          Server-Side concerns
          <ul>
            <li>
              <Abbr key="ORM" /> use
            </li>
            <li>The code does not leak crucial code to the client bundle</li>
            <li>
              Separate <Abbr key="API" /> accessible for a mobile client
            </li>
          </ul>
        </li>
      </ul>
    </Page>
  )
}
