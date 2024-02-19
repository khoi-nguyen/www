const meta: Metadata = {
  title: 'Chapter 3: Server-Side Rendering',
  description: 'Server Components, Next',
  lang: 'en',
  current: true,
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Single Page Apps" columns>
        <div>
          {mermaid`
            sequenceDiagram
              participant browser as Browser
              participant app as App
              participant server as Server
              Note over browser, server: First request
              browser ->> server: GET /about
              server ->> browser: Sends the entire app
              app ->> browser: Routing to /about
              app -->> server: Requests (fetch)
              server -->> app: Responses (JSON)
              Note over browser, server: Links
              browser ->> app: requests /autre-page
              app ->> browser: Routing to /autre-page
              app -->> server: Requests (fetch)
              server -->> app: Responses (JSON)
          `}
        </div>
        <div>
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
        </div>
      </Slide>
      <Slide title="Client-Side vs Server-Side rendering" columns>
        <div>
          <h3>Client-Side rendering</h3>
          <p>
            The JavaScript code is executed by the browser (e.g. V8, Spider Monkey) to generate{' '}
            <Abbr key="DOM" /> nodes.
          </p>
          <ul>
            <li>
              Better for <Abbr key="UX" />
            </li>
            <li>Better performance after the first render</li>
            <li>
              Access to the <Abbr key="DOM" /> <Abbr key="API" />
            </li>
          </ul>
        </div>
        <div>
          <h3>Server-Side rendering</h3>
          <p>
            The JavaScript code is executed by the server (e.g. Node) to generate{' '}
            <Abbr key="HTML" />, which is then sent to the client.
          </p>
          <ul>
            <li>
              Better for <Abbr key="SEO" />
            </li>
            <li>
              Better performance for the first render (closer to the data source for data fetching)
            </li>
            <li>Better caching</li>
            <li>Better for accessibility</li>
            <li>No need to serve the libraries to the client</li>
            <li>No multiple round trips</li>
            <li>Works without JavaScript for the client</li>
          </ul>
        </div>
      </Slide>
      <Slide title="Introducing meta-frameworks">
        <p>
          As JavaScript can be used on the client and on the server, React can run on Node, with the
          caveat that it does not have access to the <Abbr key="DOM" /> <Abbr key="API" />. Instead,
          it returns an <Abbr key="HTML" /> string.
        </p>
        <Idea>
          <p>
            As much as possible, we should strive to offer both rendering strategies (
            <Abbr key="CSR" /> and <Abbr key="SSR" />) and let the developer pick the right one.
            Client-side code should always have an <Abbr key="SSR" /> fallback.
          </p>
        </Idea>
        <p>
          For this course, we shall use <a href="https://nextjs.org">Next.js</a>, which is a
          meta-framework allowing you to write React code to be rendered on the client or the
          server.
        </p>
      </Slide>
      <Slide title="File-Based routing" columns>
        <div>
          <p>
            Next uses <strong>file-based routing</strong>.
          </p>
          <Example>
            {tex`
            \texttt{/dashboard} \to \text{default export of}\
            \texttt{/app/dashboard/page.tsx}
          `}
          </Example>
          <p>
            <strong>Layouts</strong> allow you to wrap your page into a component (e.g. to add a
            navbar). They can be put in <code>app/[route]/layout.tsx</code>. Layout apply to
            subroutes.
          </p>
          {js.hl`
          export default function Layout(props) {
            return (
              <>
                <nav>
                  <ul>
                    <li><Link href="/">Home</Link></li>
                  </ul>
                </nav>
                <main>
                  {props.children}
                </main>
              </>
            )
          }
        `}
        </div>
        <div>
          <Remark>
            <p>
              Next.js handles the routing on client if possible and fallsback to server-side
              routing.
            </p>
          </Remark>
        </div>
      </Slide>
      <Slide title="React Server Components and Network Boundary" columns>
        <div>
          <Definition title="Server Component">
            <p>
              A <strong>server component</strong> in <strong>React</strong> is a component which
              will be transformed by React <strong>on the server</strong> into an{' '}
              <Abbr key="HTML" /> string.
            </p>
          </Definition>
          <ul>
            <li>It can contain backend code (database, etc.)</li>
            <li>Can be asynchronous</li>
            <li>
              It cannot use browser features (<Abbr key="DOM" /> <Abbr key="API" />)
            </li>
            <li>
              They cannot <code>useState</code> or <code>useEffect</code>
            </li>
          </ul>
          <p>
            In Next.js, components are <strong>server components</strong> by default. Client
            components (i.e. what you have done so far) need <code>'use client'</code> at the top of
            the file.
          </p>
          <Remark>
            <p>
              Client components cross the network boundary and can only have client components
              inside them
            </p>
          </Remark>
        </div>
        <div>
          {js.hl`
            async function ServerComponent() {
              const res = await fetch('https://jsonplaceholder.typicode.com/todos')
              const todos = await res.json()
              return (
                <>
                  <h1>Todo</h1>
                  <ul>
                    {todos.map(todo => (
                      <li key={todo.id}>{todo.title}</li>
                    ))}
                  </ul>
                </>
              )
            }
          `}
        </div>
      </Slide>
      <Slide title="Set up your project">
        <ul>
          <li>
            Run <code>npx create-next-app@latest</code>
          </li>
          <li>Use TypeScript and ESLint</li>
          <li>Use the App Router</li>
        </ul>
        <p>
          Use the <a href="https://nextjs.org/docs/">Next.js</a> documentation.
        </p>
      </Slide>
    </Slideshow>
  )
}
