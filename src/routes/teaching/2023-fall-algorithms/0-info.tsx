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
    <Slide title="7 Sept 2023" columns>
      <ul>
        <li>
          <strong>Divide and conquer</strong>: recursively divide the problem until it becomes
          trivial, and combine the solutions of the subproblems to solve the original problem.
        </li>
        <li>
          <strong>Merge sort</strong>: divide-and-conquer sorting algorithm which runs in{' '}
          {tex`\bigo(n \log n)`}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif?20151222172210"
            alt="Merge sort example"
            style="width: 50%;"
          />
        </li>
        <li>
          <strong>Bold prediction of the day:</strong> my website is going to work today on at least
          one computer.
        </li>
        <li>
          <A href="/teaching/2023-fall-algorithms/1-foundations#/22">Click here</A>
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
    <Slide title="12 Sept 2023" columns>
      <ol>
        <li>
          <strong>Quicksort</strong>: divide-and-conquer algorithm that puts one number in the
          correct position (the <em>pivot</em>) and recursively calls itself on both lists that this
          pivot determines.
        </li>
        <li>
          Quicksort's <strong>runtime</strong> depends a lot on the choice of pivot. While the
          average case is {tex`\bigo(n \log n)`}, the worst case is {tex`\bigo(n^2)`}
        </li>
        <li>
          <strong>Karatsuba's algorithm</strong> is a divide-and-conquer algorithm in which the
          combining step uses three multiplications instead of four. We will go over it again today.
        </li>
        <li>
          <A href="/teaching/2023-fall-algorithms/1-foundations#/30">Continue</A>
        </li>
      </ol>
      <div>
        <h3>Homework due next Monday</h3>
        <ul>
          <li>
            Implement Gauss and Karatsuba's algorithm in Python so that given two arrays of
            integers, it results a the digits of the product of the two numbers associated with the
            arrays.
            <Code>
              {py`
                karatsuba([1, 3], [1, 2]) # returns [1, 5, 6]
              `}
            </Code>
          </li>
          <li>
            Using a plotting library such as <em>matplotlib</em>, plot the time both algorithms take
            as a function of n random digits. Roughly when is your Karatsuba implementation faster?
          </li>
          <li>
            Use your Karatsuba implementation and a <em>divide-and-conquer</em> approach to write an
            algorithm that computes the {tex`n`}th power of a number. You may not use
            <Code>
              {py`
                power([1, 3, 4, 2], 2) # return 1342**2
              `}
            </Code>
          </li>
        </ul>
      </div>
    </Slide>
  </Slideshow>
);
