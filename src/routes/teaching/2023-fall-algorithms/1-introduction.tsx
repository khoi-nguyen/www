import meta from './1-introduction.json';

const insertionSort = String.raw`for i in range(1, len(A)):
    key = A[i]
    j = i - 1
    while j >= 0 and key < A[j]:
        A[j + 1] = A[j]
        j -= 1
    A[j + 1] = key`;

export default () => (
  <Slideshow meta={meta}>
    <Slide title="What is an algorithm?" cite={['clrs', 'p. 3']}>
      <Question>
        <p>What is an algorithm?</p>
      </Question>
      <Definition title="Algorithm">
        <p>Sequence of computational steps that transform the input into an output</p>
      </Definition>
    </Slide>
    <Slide title="Example: Insertion sort" cite={['clrs', 'p. 17']}>
      <Question>
        <p>When playing cards, how would you sort your hand in ascending order?</p>
      </Question>
      <Jupyter>
        {py`
          right_hand = [3, 7, 4, 1, 2, 7, 3]
          left_hand = []

          for card in right_hand:
              position = len([c for c in left_hand if c <= card])
              left_hand.insert(position, card)

          left_hand
        `}
      </Jupyter>
      <Question>
        <p>What can be improved in the above algorithm?</p>
      </Question>
    </Slide>
    <Slide title="Insertion sort">
      <p>
        Here is a more standard implementation of <strong>insertion sort</strong>
      </p>
      <Jupyter>
        {py`
          A = [3, 7, 8, 1, 2, 7, 3]
          ` +
          '\n' +
          insertionSort +
          '\nA'}
      </Jupyter>
      <p>For every algorithm, we shall study the following properties.</p>
      <ul>
        <li>
          <strong>Termination:</strong> Does the algorithm terminate?
        </li>
        <li>
          <strong>Correctness:</strong> Does it yield the desired result?
        </li>
        <li>
          <strong>Running time:</strong> Does it yield the desired result?
        </li>
      </ul>
    </Slide>
    <Slide title="Correctess and Loop invariants of insertion sort" cite={['clrs', 'pp. 19-21']}>
      <Definition title="Loop invariant">
        <p>Property which is true before each iteration of a loop.</p>
      </Definition>
      <p>
        Loop invariants are important tools to show <strong>correctness.</strong>
      </p>
      <Editor>{insertionSort}</Editor>
      <Proposition title="Insertion's sort loop invariant">
        <p>
          The subarray <code>A[:i]</code> contains the first <code>i</code> elements of the original
          array in <strong>sorted order</strong>.
        </p>
      </Proposition>
    </Slide>
    <Slide title="Running time">
      <Editor>{insertionSort}</Editor>
      <Question title="Running time?">
        <p>
          Assume that {tex`A`} has {tex`n`} elements. If the cost of the {tex`i`}-th line is{' '}
          {tex`c_i`}, what is <strong>total running cost</strong>?
        </p>
      </Question>
      <p>
        Let's consider the <strong>best</strong> and <strong>worst</strong> case scenarios
      </p>
      {tex`
        \sum_{i = 1}^n i = \frac {n (n + 1)} 2
      `}
    </Slide>
    <Slide title={<>{tex`\bigo`}-notation</>} cite={['clrs', 'p. 54-55']}>
      <Definition title={<>{tex`\bigo(g)`}</>}>
        {tex`f \in \bigo(g)`} if there exist positive constants {tex`C`} and {tex`N`} such that
        {tex`
          \abs {f(n)} \leq C g(n),
          \quad n \geq N.
        `}
      </Definition>
      <Definition title={<>{tex`\bigtheta(g)`}</>}>
        {tex`f \in \bigtheta(g)`} if there exist positive constants {tex`c, C`} and {tex`N`} such
        that
        {tex`
          c g(n) \leq \abs {f(n)} \leq C g(n),
          \quad n \geq N.
        `}
      </Definition>
      <Remark>
        <ul>
          <li>
            {tex`f \in \bigo(g(n))`}: {tex`f`} is big-oh of {tex`g`} of {tex`n`},
          </li>
          <li>
            {tex`f \in \bigo(g(n))`}: {tex`f`} is big-theta of {tex`g`} of {tex`n`},
          </li>
          <li>As an abuse of notation, we'll write {tex`f(n) = \bigo(g(n))`}.</li>
        </ul>
      </Remark>
    </Slide>
    <Slide title={<>Exercises: {tex`\bigo`}-notation</>}>
      <Exercise title="True or False">
        <ol>
          <li>
            If {tex`f = \bigo(g)`} then {tex`g = \bigo(f).`}
          </li>
          <li>
            If {tex`f = \bigo(g)`} and {tex`g = \bigo(h)`} then {tex`f = \bigo(h)`}.
          </li>
          <li>
            If {tex`f = \bigo(g)`}, {tex`g = \bigo(f)`} and {tex`f(n) > g(n)`}, then{' '}
            {tex`f - g = \bigo(1)`}
          </li>
          <li>
            If {tex`f = \bigo(g)`} and {tex`g = \bigo(h)`} then {tex`\frac f g = \bigo(1)`}.
          </li>
          <li>
            If {tex`f = \bigo(g)`} and {tex`h = \bigo(g)`} then {tex`f = \bigo(h)`}.
          </li>
        </ol>
      </Exercise>
    </Slide>
    <Slide title="Divide et impera">
      <p>
        A common stategy is <strong>divide-and-conquer</strong>.
      </p>
      <ul>
        <li>
          <strong>Divide</strong> into similar subproblems
        </li>
        <li>
          <strong>Conquer</strong> by solving them recursively
        </li>
        <li>
          <strong>Combine</strong> the subproblem solutions to solve the original problem
        </li>
      </ul>
    </Slide>
    <Slide title="Merge sort">
      <Jupyter>
        {py`
          from math import floor

          def merge_sort(A):
              if len(A) <= 1:
                  return A
              # Divide
              n = floor(len(A) / 2)
              L, R = merge_sort(A[:n]), merge_sort(A[n:])
              # Conquer
              result = []
              while L and R:
                  smallest = L.pop(0) if L[0] <= R[0] else R.pop(0)
                  result.append(smallest)
              return result + L + R

          merge_sort([2, -1, 3, -4, 7, 3, 1])
        `}
      </Jupyter>
    </Slide>
    <Slide title="Running time of merge sort">
      <Proposition title="Running time of merge sort">
        <p>The running time of merge sort is {tex`\bigo(n \log n)`}.</p>
      </Proposition>
      <p>
        Let {tex`T(n)`} be the running time of <em>merge sort</em>. By definition of the algorithm,{' '}
        {tex`T`} satisfies
      </p>
      {tex`
        T(n) = 2 T\left(\frac n 2\right) + n.
      `}
    </Slide>
  </Slideshow>
);
