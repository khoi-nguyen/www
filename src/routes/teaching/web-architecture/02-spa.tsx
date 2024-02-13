const meta: Metadata = {
  title: 'Chapter 2: Single Page Applications',
  description: 'React Router',
  lang: 'en',
  current: true,
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Last time..." columns>
        <ul>
          <li>
            React allows <Abbr key="UI" /> to be created <strong>declaratively</strong>: this avoids
            having to deal with <Abbr key="DOM" /> mutations and enables a programming model where
            conceptually everything is created from scratch while maintaining performance.
            {js.hl`
              function HealthBar(props) {
                const value = props.hp / props.max
                return (
                  <p>
                    {props.name}<br />
                    HP: <meter value={value} low={0.1} /><br />
                    {props.hp} / {props.max}
                  </p>
                )
              }
            `}
          </li>
          <li>Components allow reuse, composition and encapsulation</li>
          <li>
            In React, components are just functions that return <Abbr key="JSX" />
          </li>
          <li>
            Components are <strong>rerendered</strong> at every state/prop change
          </li>
        </ul>
        <ul>
          <li>
            <code>useState</code>: create a state variable with a setter that triggers the{' '}
            <Abbr key="UI" /> to rerender
          </li>
          <li>
            <code>useEffect(callback, [...dependencies])</code>: callback is only run when one of
            the dependencies change
          </li>
          {js.hl`
            function Test(props) {
              // use setTitle to ensure UI is kept updated
              const [title, setTitle] = useState('')

              // Run only when title changes
              useEffect(function() {
                document.title = title
              }, [title])

              return (
                <>
                  <p>Change the page title</p>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </>
              )
            }
          `}
        </ul>
      </Slide>
      <Slide title="Single Page Applications">
        <Definition>
          <p>
            A single page application (<Abbr key="SPA" />) is a website that interacts with the user
            by dynamically mutating the current page instead of loading entire new pages. The goal
            is faster transitions.
          </p>
        </Definition>
        <p>
          React (and Angular, Svelte, Vue, etc.) make <Abbr key="SPA" /> easy to write because we
          don't have to deal with mutations.
        </p>
        <Question>
          <p>
            Why are we doing this? Can you think of any features that only work with{' '}
            <Abbr key="SPA" />?
          </p>
        </Question>
        <p>Two key ingredients: fetch and Client-Side routing.</p>
      </Slide>
      <Slide title="Client-Side routing">
        <Remark>
          <p>Using single page, we'd lose key functionalities like:</p>
          <ul>
            <li>Restoring the correct page on reload</li>
            <li>Sharing a link to the current state of the application</li>
            <li>History</li>
            <li>Back and forward navigation</li>
          </ul>
        </Remark>
        <p>
          These issues can all be solved with <strong>Client-Side Routing</strong>
        </p>
        <Idea title="Client-Side Routing">
          <ul>
            <li>
              Redirect all URLs to the <Abbr key="SPA" />
            </li>
            <li>
              Use <code>window.location.href</code> to choose what to display on the page.
            </li>
            <li>
              Changing "page" uses the <code>history.pushState</code> <Abbr key="API" />
            </li>
          </ul>
        </Idea>
        <p>React Router will handle all of this for you.</p>
      </Slide>
      <Slide title="React router tutorial" columns>
        <Iframe src="https://reactrouter.com/en/main/start/tutorial" />
        <div>
          <Instruction>
            <p>Follow the tutorial</p>
          </Instruction>
        </div>
      </Slide>
      <Slide title="Exercise: timetable">
        <Exercise>
          <p>
            Create a Google Calendar clone that shows your timetable (use the link to your ICS
            file). You might find libraries such as MUI and FullCalendar useful.
          </p>
          <p>Your app should use React Router.</p>
        </Exercise>
      </Slide>
      <Slide title="Tips">
        <p>
          Here are some tips for better <Abbr key="DX" />
        </p>
        <ul>
          <li>Use prettier</li>
          <li>Use eslint</li>
          <li>Use TypeScript in strict mode</li>
          <li>Your components should be small</li>
          <li>Break down your code into ES modules, and organise them well into folders</li>
          <li>Use unplugin-auto-import to avoid repetitive import statements</li>
        </ul>
      </Slide>
      <Slide title="A modern implementation of useEffect/useState">
        <p>
          We will implement a Signal-based version of React's hooks. Formally, It will be different
          in at least two aspects (under the hood, it's as different as can be).
        </p>
        <ul>
          <li>
            In the instruction {js.hl`const [state, setState] = useState()`} <code>state</code> is a{' '}
            <strong>function</strong>.
          </li>
          <li>We won't need to specify the dependencies array</li>
        </ul>
        <Idea>
          <ul>
            <li>Effects are kept on a stack (FILO)</li>
            <li>For each state variable, register all the effects that depend on it</li>
            <li>When calling the setter, trigger all the effects</li>
          </ul>
        </Idea>
      </Slide>
      <Slide title="Solution">
        <Github lang="jsx" repo="khoi-nguyen/reactivity" path="signals.js" />
      </Slide>
    </Slideshow>
  )
}
