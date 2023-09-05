import meta from './0-info.json';
import { Info } from './index.jsx';
import { chapters } from './syllabus';

export default () => (
  <Slideshow meta={meta}>
    <Slide title="General Information">
      <p>Hello everyone! Welcome to Paris, I hope you'll have a fantastic term here.</p>
      <Info />
    </Slide>
    <Slide title="Syllabus" columns>
      <div>
        {chapters[0]()}
        {chapters[1]()}
      </div>
      <div>
        {chapters[2]()}
        {chapters[3]()}
      </div>
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
        Go to <A href="/teaching/2023-fall-algorithms/1-foundations">Chapter 1</A>.
      </p>
    </Slide>
    <Slide title="5 Sept 2023" columns>
      <ul>
        <li>
          <p>
            <strong>Insertion sort</strong> is the algorithm you use when you play cards
          </p>
          <ul>
            <li>Correctness (invariant: cards in the left-hand are sorted)</li>
            <li>
              Runtime: {tex`\bigo(n)`} (best case) or {tex`\bigo(n^2)`} (average and worst case)
            </li>
            <li>Space complexity: {tex`\bigo(1)`} (in place)</li>
          </ul>
        </li>
        <li>
          <strong>Asymptotic notation</strong>:
          {tex`
            3 n^3 + 7 n^2 - 3 = \bigtheta(n^3)\\
            \bigtheta(g) \defeq \{ f : c g(n) \leq f(n) \leq C g(n), \quad n \geq N, \quad \text{for some } N\}\\
            \bigo(g) \defeq \{ f : f(n) \leq C g(n), \quad n \geq N, \quad \text{for some } N\}
          `}
        </li>
        <li>Sorting is an important operation in compsci (e.g. median, search)</li>
        <li>
          <A href="/teaching/2023-fall-algorithms/1-foundations#/12">Click here</A>
        </li>
      </ul>
      <div>
        <h2>Homework (due Tuesday 12 September)</h2>
        <p>
          Send me a Jupyter file by email (nguyen.khoi@nyu.edu) with the following exercises solved.
        </p>
        <ul>
          <li>
            2-2. Bubble sort <Cite key="clrs">p. 46</Cite>: use Python instead of pseudo-code
          </li>
          <li>
            2-3. Horner <Cite key="clrs">p. 47</Cite>: use Python instead of pseudo-code
          </li>
          <li>
            <a href="https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/">
              Leetcode problem
            </a>
          </li>
        </ul>
      </div>
    </Slide>
  </Slideshow>
);
