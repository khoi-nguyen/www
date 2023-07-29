import meta from './1-introduction.json';

const insertionSort = String.raw`for i in range(1, len(A)):
    j = i - 1
    while j >= 0 and A[i] < A[j]:
        A[j + 1] = A[j]
        j -= 1
    A[j + 1] = A[i]`;

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
                  if L[0] <= R[0]:
                      result.append(L.pop(0))
                  else:
                      result.append(R.pop(0))
              return result + L + R
        `}
      </Jupyter>
    </Slide>
  </Slideshow>
);
