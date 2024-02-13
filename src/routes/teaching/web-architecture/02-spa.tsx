const meta: Metadata = {
  title: 'Chapter 2: Single Page Applications',
  description: 'React Router',
  lang: 'en',
  current: true,
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Components">
        <ul>
          <li>
            React allows <Abbr key="UI" /> to be created declaratively
          </li>
          <li>Components allow reuse, composition and encapsulation</li>
          <li>
            In React, components are just functions that return <Abbr key="JSX" />
          </li>
          <li>
            <code>useState</code>: create a state variable with a setter that triggers the{' '}
            <Abbr key="UI" /> to rerender
          </li>
          <li>Components are rerendered at every state/prop change</li>
          <li>
            <code>useEffect(callback, [...dependencies])</code>: callback is only run when one of
            the dependencies change
          </li>
        </ul>
      </Slide>
      <Slide title="Single Page Applications">
        <Definition>
          <p>
            A single page application (<Abbr key="SPA" />) is a website that interacts with the user
            by dynamically rewriting the current page instead of loading entire new pages. The goal
            is faster transitions.
          </p>
        </Definition>
      </Slide>
      <Slide title="React router tutorial">
        <Iframe src="https://reactrouter.com/en/main/start/tutorial" />
      </Slide>
      <Slide title="Exercise: timetable">
        <Exercise>
          <p>
            Create a Google Calendar clone that shows your timetable. You might find libraries such
            as MUI and FullCalendar useful.
          </p>
          <p>Your app should use multiple pages and elements like modals.</p>
        </Exercise>
      </Slide>
      <Slide title="A modern implementation of useEffect/useState">
        <Exercise>
          <p></p>
        </Exercise>
      </Slide>
    </Slideshow>
  )
}
