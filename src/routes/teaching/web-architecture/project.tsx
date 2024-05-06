const meta: Metadata = {
  title: 'Project',
  subtitle: 'Assessment Criteria',
  description: '',
  lang: 'en',
}

type Criterion = [number | string, string | JSX.Element]
type Category = {
  title: string
  criteria: Criterion[]
}

function Grid() {
  const categories: Category[] = [
    {
      title: 'Functional constraints',
      criteria: [
        ['1*', 'Behaves like a Single Page Application'],
        [2, 'A good understanding of state, effects and life-cycle hooks'],
        [2, 'All server actions can be performed via an API route'],
        ['1* (merci Thibaut)', 'Uses correctly implemented authentication'],
        [3, 'Complexity of the project'],
      ],
    },
    {
      title: 'UX and UI',
      criteria: [
        [1, 'The application looks like a native app and not just like an "old" website'],
        [1, 'The interface is attractive and easy to use'],
        [1, 'Design is responsive and works on different screen sizes (smartphones, tablet, etc.)'],
      ],
    },
    {
      title: 'Code quality',
      criteria: [
        [1, 'Code is clearly written, variables have clear names'],
        [1, 'Clear file structure and separation of concerns'],
        [1, 'UI is broken down into components'],
      ],
    },
    {
      title: 'Accessibility',
      criteria: [
        ['1*', 'The first render happens on the server (for bots and SEO)'],
        [1, 'The website is still functional without JavaScript'],
        [1, 'Best practices for accessibility are implemented'],
      ],
    },
    {
      title: 'Security',
      criteria: [
        [1, "The client bundle doesn't leak crucial information"],
        [
          1,
          "The code doesn't have any critical security issue (passwords are stored securely, etc.)",
        ],
      ],
    },
  ]
  return (
    <table>
      <thead>
        <tr>
          <th>Criterion</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <>
            <tr>
              <th colspan={2}>{category.title}</th>
            </tr>
            {category.criteria.map((criterion) => (
              <tr>
                <td>{criterion[1]}</td>
                <td>{criterion[0]}</td>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  )
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
      <h3>Assessment grid</h3>
      <Grid />
      <h3>Exam questions</h3>
      <ul>
        <li>Why do we use JavaScript frameworks?</li>
        <li>Why do we use TypeScript?</li>
        <li>
          How does React work? What is the Virtual <Abbr key="DOM" />? What is <Abbr key="JSX" />?
        </li>
        <li>
          What is <Abbr key="SSR" />? Why do we use a meta-framework like Next.js?
        </li>
        <li>
          How does authentication work? Why do we need to salt and hash passwords, or sign cookies?
        </li>
      </ul>
    </Page>
  )
}
