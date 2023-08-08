import meta from './1-foundations.json';

export const insertionSort = py`
  def insertion_sort(A):
      for i in range(1, len(A)):
          key = A[i]
          j = i - 1
          while j >= 0 and key < A[j]:
              A[j + 1] = A[j]
              j -= 1
          A[j + 1] = key
      return A
`;

export const mergeSort = py`
  def merge_sort(A):
      if len(A) <= 1:
          return A
      n = len(A) // 2
      L, R = merge_sort(A[:n]), merge_sort(A[n:])
      result = []
      while L and R:
          smallest = L.pop(0) if L[0] <= R[0] else R.pop(0)
          result.append(smallest)
      return result + L + R
`;

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
        {insertionSort}
        {py`
          insertion_sort([3, 7, 8, 1, 2, 7, 3])
        `}
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
      <Proposition title="Insertion sort's loop invariant">
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
    <Slide title={() => <>{tex`\bigo`}-notation</>} cite={['clrs', 'p. 54-55']}>
      <p>Let {tex`f, g : \N \to \R^+`}.</p>
      <Definition title={() => <>{tex`\bigo(g)`}</>}>
        <p>
          {tex`f \in \bigo(g)`} if there exist positive constants {tex`C`} and {tex`N`} such that
        </p>
        {tex`
          f(n) \leq C g(n),
          \quad n \geq N.
        `}
      </Definition>
      <Definition title={() => <>{tex`\bigtheta(g)`}</>}>
        <p>
          {tex`f \in \bigtheta(g)`} if there exist positive constants {tex`c, C`} and {tex`N`} such
          that
        </p>
        {tex`
          c g(n) \leq f(n) \leq C g(n),
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
    <Slide title={() => <>Exercises: {tex`\bigo`}-notation</>}>
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
        {mergeSort}
        {py`

          merge_sort([2, -1, 3, -4, 7, 3, 1])
        `}
      </Jupyter>
    </Slide>
    <Slide title="Running time of merge sort">
      <Proposition title="Running time of merge sort">
        {tex`
          T(n) = \bigo(n \log n)
        `}
      </Proposition>
    </Slide>
    <Slide title="Solving recurrences" cite={['clrs', 'p. 90']}>
      <Information title="Substitution method">
        <ul>
          <li>Guess the form of the solution using symbolic constants</li>
          <li>Proof by induction</li>
        </ul>
      </Information>
      <Example>
        <p>
          Show that the recurrence
          {tex`
            T(n) = 2 T( \lfloor n / 2 \rfloor) + \bigtheta(n)
          `}
          has solution {tex`T(n) = \bigo(n \log n)`}.
        </p>
      </Example>
    </Slide>
    <Slide title="Exercises: solving recurrences" cite={['clrs', 'pp. 94-95']}>
      <Exercise>
        <p>
          Use the substitution method to show that each of the following recurrences has the
          asymptotic solution specified:
        </p>
        <ol>
          <li>
            {tex`T(n) = T(n - 1) + n`} has solution {tex`T(n) = \bigo(n^2)`}
          </li>
          <li>
            {tex`T(n) = T(n / 2) + \bigtheta(1)`} has solution {tex`T(n) = \bigo(\log n)`}
          </li>
          <li>
            {tex`T(n) = 2 T(n / 2) + n`} has solution {tex`T(n) = \bigo(n \log n)`}
          </li>
          <li>
            {tex`T(n) = 2 T(n / 2 + 17) + n`} has solution {tex`T(n) = \bigo(n \log n)`}
          </li>
          <li>
            {tex`T(n) = 2 T(n / 3) + \bigtheta(n)`} has solution {tex`T(n) = \bigtheta(n)`}
          </li>
          <li>
            {tex`T(n) = 4 T(n / 2) + \bigtheta(n)`} has solution {tex`T(n) = \bigtheta(n^2)`}
          </li>
        </ol>
      </Exercise>
    </Slide>
    <Slide title="Recurrences: Avoiding pitfalls" cite={['clrs', 'pp. 93-94']}>
      <Exercise>Find the mistake in the reasoning below:</Exercise>
    </Slide>
  </Slideshow>
);