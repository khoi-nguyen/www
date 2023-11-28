import meta from './0-react.json';

export default () => {
  return (
    <Slideshow meta={meta}>
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
        <Youtube src="https://www.youtube.com/watch?v=Tn6-PIqc4UM" />
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
            {html5`
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
            {ts`
              <button onClick={increaseCount}>
                Count: {count}
              </button>
            `}
          </li>
          <li>
            Incredibly <strong>simple</strong> (and beautiful)
          </li>
        </ul>
      </Slide>
      <Slide title="Install React">
        <ol>
          <li>Install Node</li>
          <li>
            Create a directory and <code>cd</code>
          </li>
          <li>
            Run <code>npm install</code>
          </li>
        </ol>
        <Editor lang="bash">npm install</Editor>
      </Slide>
      <Slide title="React: a first example">
        {ts`
          function Button() {
            const [count, setCount] = useState(0);
            const increaseCount = () => setCount(count + 1);

            return (
              <button onClick={increaseCount}>
                Count: {count}
              </button>
            );
          }
        `}
        <Question>
          <p>
            Why do we need <code>setCount</code>?
          </p>
        </Question>
      </Slide>
      <Slide title={() => <Abbr key="JSX" />}>
        <p>
          The <Abbr key="HTML" /> you see in the return clauses in in reality syntactic sugar called{' '}
          <Abbr key="JSX" />.
        </p>
        <Example>
          {html5`
            <MyButton color="blue" shadowSize={2}>
              Click Me
            </MyButton>
          `}
          gets transpiled to
          {ts`
            React.createElement(
              MyButton,
              {color: 'blue', shadowSize: 2},
              'Click Me'
            )
          `}
        </Example>
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
          {ts`
            const [variable, setVariable] = useState(defaultVal);
          `}
        </Definition>
        {ts`
          function Component() {
            const [variable, setVariable] = useState(true);
            return (
              <p>
                variable is currently {String(variable)}
                <button onClick={() => setVariable(!variable)}>
                  Click me
                </button>
              </p>
            );
          }
        `}
        <Remark>
          <p>
            Just changing <code>variable</code> (e.g. <code>variable = false</code>) will not update
            the <Abbr key="UI" />.
          </p>
        </Remark>
      </Slide>
      <Slide title="Props">
        <Idea title="Props">
          <p>
            Props (properties) generalize <Abbr key="HTML" /> attributes.
          </p>
        </Idea>
        <Example title="Simple component with props">
          {html5`
            <Slide title="Title of my beautiful slide">
              <p>Slide contents</p>
            </Slide>
          `}
          {ts`
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
      <Slide
        title={() => (
          <>
            The <code>useEffect</code> hook
          </>
        )}
      >
        <Definition title="useEffect hook">
          {ts`
            useEffect(callback, [...dependencies]);
          `}
          <p>
            <code>callback</code> is called every time one of the dependencies changes. It needs to
            be a <strong>synchronous</strong> function.
          </p>
        </Definition>
        {ts`
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
        {ts`
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
      <Slide title=""></Slide>
    </Slideshow>
  );
};
