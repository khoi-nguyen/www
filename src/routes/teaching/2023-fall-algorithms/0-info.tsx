import meta from './0-info.json';
import { Info } from './index.jsx';

export default () => (
  <Slideshow meta={meta}>
    <Slide title="General Information">
      <p>Hello everyone! Welcome to Paris, I hope you'll have a fantastic term here.</p>
      <Info />
    </Slide>
    <Slide title="Syllabus">
      <dl>
        <dt>Chapter 1</dt>
        <dd>
          <ul>
            <li>
              What's an algorithm? What's a <strong>good</strong> algorithm?
            </li>
            <li>Termination, complexity, big-{tex`\bigo`} notation</li>
          </ul>
          <p>
            Reference:{' '}
            <Cite key="clrs" narrative>
              Chapters 1 and 2
            </Cite>
          </p>
        </dd>
      </dl>
    </Slide>
    <Slide title="Notes about code">
      <ul>
        <li>
          <strong>Programming language:</strong> Python 3
        </li>
        <li>
          <strong>Recommended setup:</strong> Visual Studio Code + Jupyter extension
        </li>
      </ul>
      <Question title="Why Python?">
        <ul>
          <li>Free/Open Source</li>
          <li>Easy to read and learn</li>
          <li>Ubiquitous, can even run on your browser</li>
        </ul>
      </Question>
      <p>
        During lectures, you'll be able to edit and run code cells directly from the browser (kind
        of like in Jupyter). When editing the code, you can press <code>Shift+Enter</code> to run it
        or click the icon on the left.
      </p>
      <Jupyter>
        {py`
          0.1 * 0.1 == 0.01
        `}
      </Jupyter>
      <p>
        Go to <A href="/teaching/2023-fall-algorithms/1-introduction">Chapter 1</A>.
      </p>
    </Slide>
  </Slideshow>
);
