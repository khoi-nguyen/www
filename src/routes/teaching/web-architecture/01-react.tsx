const meta: Metadata = {
  title: 'Chapter 1: Single-Page Applications',
  description: 'React, React-Router, Typescript',
  lang: 'en',
  current: true,
}

const exercises = {
  counter: react.raw`
    function App() {
      const [count, setCount] = useState(0)
      const increaseCount = () => setCount(count + 1)
      return (
        <>
          <button onClick={increaseCount}>
            Count: {count}
          </button>
        </>
      )
    }
  `,
  counterWithSvelte: svelte.raw`
    <script>
      let count = 0
      const increaseCount = () => count++
    </script>

    <button on:click={increaseCount}>
      Count: {count}
    </button>
  `,
  clock: (solve: boolean) => react.raw`
    import moment from 'moment'

    function App() {
      const [count, setCount] = useState(0)
      const [time, setTime] = useState(moment().format('LTS'))
${react.if(solve)`

      useEffect(() => {
        const interval = setInterval(() => {
          setCount(prev => prev + 1)
          setTime(moment().format('LTS'))
        }, 1000)
        return () => clearInterval(interval)
      }, [])

`}
      return (
        <>
          <p>It is {time}</p>
          <p>Count: {count}</p>
        </>
      )
    }
  `,
  todo: (solve: boolean) => react.raw`
    function App() {
      const [newTask, setNewTask] = useState()
      const [tasks, setTasks] = useState([])
${react.if(solve)`
      const addTask = () => {
        setTasks([...tasks, newTask])
      }
      return (
        <>
          <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <button onClick={addTask}>Submit</button>
          <ul>
            {tasks.map(task => <li>{task}</li>)}
          </ul>
        </>
      )
`}
    }
  `,
} as const

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Syllabus">
        <h3>Tentative syllabus (subject to change)</h3>
        <ol>
          <li>
            Functional Component Architecture with <a href="https://react.dev/">React</a>
          </li>
          <li>
            <Abbr key="SPA" /> with <a href="https://reactrouter.com/en/main">React Router</a>
          </li>
          <li>
            <Abbr key="SSR" /> and Isomorphic JS with Next.js
          </li>
          <li>Authentication</li>
          <li>
            <a href="https://graphql.org/">GraphQL</a> <em>(if time allows)</em>
          </li>
          <li>
            Mobile development with React Native <em>(if time allows)</em>
          </li>
          <li>
            State of the art (signals, hydration, ...) <em>(if time allows)</em>
          </li>
        </ol>
        <h3>Aims</h3>
        <ol>
          <li>Write scalable and maintainable apps</li>
          <li>Write high quality code</li>
          <li>Understand the strengths and drawbacks of isomorphic Javascript development</li>
          <li>Make good architecture choices for hybrid development</li>
        </ol>
      </Slide>
      <Slide title="Why should we use JS frameworks?">
        <Question>
          <p>Why should we use JS frameworks?</p>
        </Question>
        <Fragment>
          <p>
            To deal with <strong>mutations</strong>: You need to read the entire code to know what a
            node represents.
          </p>
          {ts.hl`
            const node = document.getElementById('some-id');

            // Changing its content
            node.innerHTML = "<strong>I'm happy</strong>";

            node.onclick(() =>
              node.innerHTML = "<em>I'm sad</em>";
            );

            node.style = { color: 'red' };
          `}
          <p></p>
        </Fragment>
      </Slide>
      <Slide title="About React">
        <dl>
          <dt>Original author</dt>
          <dd>Jordan Walke</dd>
          <dt>Developers</dt>
          <dd>Meta and community</dd>
          <dt>Source code</dt>
          <dd>
            <a href="https://github.com/facebook/react">github.com/facebook/react</a>
          </dd>
          <dt>License</dt>
          <dd>MIT License</dd>
          <dt>Website</dt>
          <dd>
            <a href="https://react.dev">react.dev</a>
          </dd>
        </dl>
        <Question>
          <p>Why React?</p>
        </Question>
      </Slide>
      <Slide title="React in 100 seconds">
        <Youtube src="https://www.youtube.com/watch?v=Tn6-PIqc4UM" zoom={1.5} />
      </Slide>
      <Slide title="5 min university">
        <Question>
          <p>What is React?</p>
        </Question>
        <ul>
          <li>
            Javascript Library for creating{' '}
            <strong>
              <Abbr key="UI" /> components
            </strong>{' '}
            ({tex`\approx`} html tags)
            {html.hl`
              <Slide title="5 min university">
                <Question>
                  <p>What is React?</p>
                </Question>
              </Slide>
            `}
          </li>
          <li>
            <strong>Declarative</strong>: performs <strong>DOM mutations</strong> for you (no need
            for <code>.innerHTML</code> etc.)
            {ts.hl`
              <button onClick={increaseCount}>
                Count: {count}
              </button>
            `}
          </li>
          <li>
            Incredibly <strong>simple</strong> (and beautiful)
          </li>
          <li>
            Components are <strong>easier to test</strong>
          </li>
        </ul>
      </Slide>
      <Slide title="Install React">
        <ol>
          <li>
            Install <a href="https://nodejs.org/en">Node</a>
          </li>
          <li>
            Run <code>npm create vite@latest &lt;project_name&gt;</code>.
          </li>
          <li>
            Select <code>React</code> as a framework and <code>TypeScript</code> as a variant.
          </li>
          <li>
            Run <code>npm install</code> in the newly created directory.
          </li>
        </ol>
        <Exercise>
          <p>Set up React using the instructions above</p>
        </Exercise>
      </Slide>
      <Slide title="Pure components: example" split={false}>
        <p>
          Here is a simple example of React code. Components are simply function, and{' '}
          <code>props</code> is an object that contains the component's <em>attributes</em>.
        </p>
        <Jupyter lang="react" columns run>
          {react.raw`
            function Health(props) {
              const value = props.hp / props.max
              return (
                <p>
                  {props.name}<br />
                  HP: <meter value={value} low={0.1} /><br />
                  {props.hp} / {props.max}
                </p>
              )
            }

            function App() {
              return (
                <>
                  <Health name="Mewtwo" max={416} hp={300} />
                  <Health name="Pikachu" max={274} hp={20} />
                </>
              )
            }
          `}
        </Jupyter>
      </Slide>
      <Slide title={() => <Abbr key="JSX" />} split={false}>
        <p>
          The <Abbr key="HTML" /> you see in the return clauses in in reality syntactic sugar called{' '}
          <Abbr key="JSX" />.
        </p>
        <p>
          A tool called <a href="https://babeljs.io">Babel</a> compiles it to Javascript.
        </p>
        {jupyter({ lang: 'react', transpileOnly: true, columns: true })`
          <MyButton shadowSize={2} onClick={() => alert('click')}>
            <strong>Click Me</strong>
          </MyButton>
        `}
      </Slide>
      <Slide
        title={() => (
          <>
            <Abbr key="JSX" /> vs <Abbr key="HTML" />
          </>
        )}
      >
        <Remark title="Differences with HTML">
          <ul>
            <li>
              Use of <code>camelCase</code>
            </li>
            <li>JS Expressions in curly braces</li>
            <li>
              Renamed attributes because of conflicts (e.g. <code>class -&gt; className</code>)
            </li>
            <li>Props can be types other than string</li>
            <li>
              <code>style</code> is an object
            </li>
          </ul>
        </Remark>
      </Slide>
      <Slide title={() => <Abbr key="CV" />}>
        <Exercise>
          <p>
            Create a <code>CVLine</code> component, and use it to create your <Abbr key="CV" />
          </p>
          <p>This is how your component should be used like this:</p>
          {js.hl`
            <CVLine
              startDate={new Date('2015-09-15')}
              endDate={new Date('2020-06-30')}
              title="MEng in Computer Science"
              employer="ECAM"
            >
              <ul>
                <li>Uninstall Windows</li>
                <li>I love JavaScript</li>
              </ul>
            </CVLine>
          `}
        </Exercise>
      </Slide>
      <Slide
        title={() => (
          <>
            The <code>useState</code> hook
          </>
        )}
      >
        <Idea>
          <p>
            <code>useState:</code> for variables that affect the <Abbr key="UI" />. Provides a
            setter function that triggers a rerender to update the <Abbr key="DOM" />.
          </p>
        </Idea>
        <Definition>
          {ts.hl`
            const [variable, setVariable] = useState(defaultVal);
          `}
        </Definition>
        <Remark>
          <ul>
            <li>
              Just changing <code>variable</code> will not update the <Abbr key="UI" />, you{' '}
              <strong>need</strong> to use the setter function if you want the change to be
              reflected.
            </li>
            <li>
              <code>useState</code> is an example of <strong>React hook</strong>
            </li>
            <li>Hooks can only be called at the top level of a component</li>
          </ul>
        </Remark>
      </Slide>
      <Slide title="React: stateful components">
        <Jupyter lang="react">{exercises.counter}</Jupyter>
        <Question>
          <p>
            Why do we need <code>setCount</code>?
          </p>
        </Question>
      </Slide>
      <Slide title="Aside: Svelte">
        <p>
          I highly encourage you to have a look at other frameworks. Svelte is known for being
          extremely readable.
        </p>
        <Jupyter lang="svelte">{exercises.counterWithSvelte}</Jupyter>
      </Slide>
      <Slide title="Todo application">
        <Exercise>
          <p>Create a todo app with React</p>
        </Exercise>
      </Slide>
      <Slide title="Props">
        <Idea title="Props">
          <p>
            Props (properties) generalize <Abbr key="HTML" /> attributes.
          </p>
        </Idea>
        <Example title="Simple component with props">
          {html.hl`
            <Slide title="Title of my beautiful slide">
              <p>Slide contents</p>
            </Slide>
          `}
          {ts.hl`
            function Slide(props) {
              return (
                <section className="slide">
                  <h1>{props.title}</h1>
                  <div className="slide-body">
                    {props.children}
                  </div>
                </section>
              );
            }
          `}
        </Example>
        <Remark>
          <p>Components are rerendered at every prop change</p>
        </Remark>
      </Slide>
      <Slide title="Pitfalls of React's reactivity model" columns>
        <div>
          <Exercise>
            <p>
              Write a component that shows a clock in the hh:mm:ss format and a counter that
              increases every second.
            </p>
          </Exercise>
          <Javascript mode="react">{exercises.clock(true)}</Javascript>
          <Remark>
            <p>
              Unless you've done some React before, your first attempt will most likely be wrong.
              Can you explain why?
            </p>
          </Remark>
          <Idea>
            <ul>
              <li>
                Have a look at the <code>setInterval</code> function.
              </li>
              <li>
                Read up on React's <code>useEffect</code> hook.
              </li>
            </ul>
          </Idea>
        </div>
        <div>
          <Jupyter lang="react" solution={exercises.clock} hideUntil={new Date('2024-02-07')} />
        </div>
      </Slide>
      <Slide title="Aside: Svelte">
        <Jupyter lang="svelte" run>
          {svelte.raw`
            <script>
              import moment from 'moment'
              let count = 0
              let time
              setInterval(() => {
                count += 1
                time = moment().format('LTS')
              }, 1000)
            </script>

            <p>It is {time}</p>
            <p>Count: {count}</p>
          `}
        </Jupyter>
      </Slide>
      <Slide
        title={() => (
          <>
            The <code>useEffect</code> hook
          </>
        )}
      >
        <Definition title="useEffect hook">
          {ts.hl`
            useEffect(callback, [...dependencies]);
          `}
          <p>
            <code>callback</code> is called every time one of the dependencies changes. It needs to
            be a <strong>synchronous</strong> function.
          </p>
        </Definition>
        {ts.hl`
          function Counter() {
            const [count, setCount] = useState(0);

            useEffect(() => {
              console.log('count is now', count);
            }, [count]);

            return (
              <button onClick={() => setCount(count + 1)}>
                Count: {count}
              </button>
            );
          }
        `}
        <Remark>
          <p>
            If <code>dependencies</code> is an empty array, the callback will be executed{' '}
            <strong>once</strong> (on mount).
          </p>
        </Remark>
      </Slide>
      <Slide title="Example: data fetching">
        {ts.hl`
          async fetchTodoList() {
            // ...
          }

          function TodoList(props) {
            const [todos, setTodos] = useState([]);
            useEffect(() => {
              fetchTodoList.then(setTodos);
            }, []);

            return (
              <ul>
                {todos.map(todo => <li>{todo}</li>)}
              </ul>
            );
          }
        `}
        <Remark>
          <p>
            Newer versions of React introduce <code>Suspense</code> to deal with async
          </p>
        </Remark>
      </Slide>
      <Slide title="Exercise: Pokemon">
        <Exercise>
          <p>Implement the following:</p>
          <PokemonPicture />
        </Exercise>
        <p>
          Use the <a href="https://pokeapi.co">PokéAPI</a>.
        </p>
      </Slide>
      <Slide title="Exercise: Wordle">
        <p>
          Implement the word game <a href="https://en.wikipedia.org/wiki/Wordle">wordle</a>
        </p>
        <Iframe src="https://sveltekit-template.vercel.app/sverdle" />
      </Slide>
      <Slide title="Signal Implementation">
        <p>
          We'll implement together a signal implementation of <code>useEffect</code> and{' '}
          <code>useState</code>.
        </p>
        {js.hl`
          const [count, setCount] = useState(0)
          useEffect(() => {
            // Note that count is a function
            console.log('Count is', count())
          })
          // Triggers the useEffect
          setCount(2)
        `}
        <Remark>
          <p>
            This implementation has a lot of advantages because we need not follow the rules of
            hooks, and can create effects with asynchronous functions.
          </p>
        </Remark>
      </Slide>
    </Slideshow>
  )
}

function PokemonPicture() {
  const [name, setName] = createSignal('pikachu')
  const [src, setSrc] = createSignal<string | null>('')
  createEffect(async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + name())
      const data = await res.json()
      setSrc(data.sprites.other['official-artwork']['front_default'])
    } catch {
      setSrc('')
    }
  })
  return (
    <>
      <label>
        Enter a Pokemon name:
        <input class="clickable" value={name()} onInput={(e) => setName(e.target.value)} />
      </label>
      <p>
        <Show when={src()} fallback={<Spinner />}>
          {(src) => <img src={src()} />}
        </Show>
      </p>
    </>
  )
}
