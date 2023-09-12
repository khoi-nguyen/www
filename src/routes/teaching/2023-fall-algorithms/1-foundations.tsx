import meta from './1-foundations.json';
import complexityChart from '~/assets/complexity_chart.svg';

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

const karatsuba = py`
  def karatsuba(x, y):
      if x < 10 or y < 10:
          return x * y

      x_str, y_str = str(x), str(y)
      m = max(len(x_str), len(y_str)) // 2

      x_high, x_low = int(x_str[:-m]), int(x_str[-m:])
      y_high, y_low = int(y_str[:-m]), int(y_str[-m:])

      a = karatsuba(x_high, y_high)
      b = karatsuba(x_low, y_low)
      c = karatsuba(x_high + x_low, y_high + y_low) - a - b

      return a * 10 ** (2 * m) + c * 10 ** m + b
`;

const CountTable = (props: { max: number }) => (
  <table>
    <thead>
      <tr>
        {[...Array(props.max).keys()].map((i) => (
          <th>{i}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        {[...Array(props.max).keys()].map((_) => (
          <td>&nbsp;</td>
        ))}
      </tr>
    </tbody>
  </table>
);

const countingSort = py`
  def counting_sort(A, k):
      count, result = [0] * k, []
      for element in A:
          count[element] += 1
      for value, frequency in enumerate(count):
          result += [value] * frequency
      return result
`;

export default () => (
  <Slideshow meta={meta}>
    <Slide title="What is an algorithm?" cite={['clrs', 'p. 3']}>
      <Question>
        <p>What is an algorithm?</p>
      </Question>
      <Fragment>
        <Mermaid scale={2}>
          {String.raw`
            graph LR
              I[Input] --> A((Algorithm))
              A --> O[Output]
          `}
        </Mermaid>
        <Definition title="Algorithm">
          <p>Sequence of computational steps that transform an input into an output</p>
        </Definition>
      </Fragment>
    </Slide>
    <Slide title="Example: Insertion sort" cite={['clrs', 'p. 17']}>
      <Question>
        <p>When playing cards, how would you sort your hand in ascending order?</p>
      </Question>
      <Fragment index={1}>
        <Youtube src="https://www.youtube.com/watch?v=gSdLGSM--dw" />
      </Fragment>
      <Fragment index={2}>
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
      </Fragment>
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
    </Slide>
    <Slide title="Analysis of an algorithm">
      <p>For every algorithm, we shall study the following properties.</p>
      <ul>
        <li>
          <strong>Termination:</strong> Does the algorithm terminate?
        </li>
        <li>
          <strong>Correctness:</strong> Does it yield the desired result?
        </li>
        <li>
          <strong>Running time:</strong> How fast is the algorithm?
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
    <Slide title="Computing time">
      <p>
        We are interested in {tex`T(n)`}, where {tex`T`} is the <strong>time</strong> an algorithm
        takes to solve a problem of <strong>size</strong> {tex`n`}.
      </p>
      {plot`
        x = np.arange(0.0, 100, 1)
        y = 2 * x**2
        z = 2 * x ** 2 - 4 * x + 10
        plt.xlabel("T")
        plt.ylabel("n")
        plt.plot(x, y)
        plt.plot(x, z)
        ax.legend(['2n²', '2n²-4n+10'])
      `}
      <p>
        We shall only keep the <strong>asymptotic term</strong>:
      </p>
      {tex`
        T(n) = 2 n^2 - 4 n + 10
        \implies
        T(n) = \bigtheta(n^2)
      `}
    </Slide>
    <Slide title={() => <>{tex`\bigo`}-notation</>} cite={['clrs', 'p. 54-55']}>
      <p>
        Let {tex`f`} and {tex`g`} be <strong>positive</strong> functions.
      </p>
      <Definition title={() => <>{tex`\bigo(g)`}</>}>
        <p>
          {tex`f \in \bigo(g)`} if there exist positive constants {tex`C`} and {tex`N`} such that
        </p>
        {tex`
          f(n) \leq C g(n),
          \quad n \geq N.
        `}
      </Definition>
      <p>
        As an <strong>abuse of notation</strong>, we shall write {tex`f(n) = \bigo(n)`}.
      </p>
      {plot`
        x = np.arange(0.0, 30, 0.1)
        f = x ** 2 + 5 * np.sin(3 * x) * x
        g = 1.4 * x ** 2
        plt.plot(x, f)
        plt.plot(x, g)
        ax.legend(['f(n)', 'Cg(n)'])
      `}
    </Slide>
    <Slide title={() => <>{tex`\bigtheta`}-notation</>} cite={['clrs', 'p. 54-55']}>
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
      <p>
        As an <strong>abuse of notation</strong>, we shall write {tex`f(n) = \bigtheta(n)`}.
      </p>
      {plot`
        x = np.arange(0.0, 30, 0.1)
        f = x ** 2 + 5 * np.sin(3 * x) * x
        g = 1.4 * x ** 2
        h = 0.7 * x ** 2
        plt.plot(x, f)
        plt.plot(x, g)
        plt.plot(x, h)
        ax.legend(['f(n)', 'Cg(n)', 'cg(n)'])
      `}
    </Slide>
    <Slide title="Algorithmic families" columns>
      <dl>
        <dt>{tex`O(1)`}</dt>
        <dd>Constant</dd>
        <dt>{tex`O(\log n)`}</dt>
        <dd>Logarithmic</dd>
        <dt>{tex`O(n)`}</dt>
        <dd>Linear</dd>
        <dt>{tex`O(n^2)`}</dt>
        <dd>Quadratic</dd>
        <dt>{tex`O(n^p)`}</dt>
        <dd>Polynomial</dd>
        <dt>{tex`O(2^n)`}</dt>
        <dd>Exponential</dd>
        <dt>{tex`O(n!)`}</dt>
        <dd>Factorial</dd>
      </dl>
      <div class="has-text-centered">
        <img src={complexityChart} alt="Big-O Complexity Chart" />
      </div>
    </Slide>
    <Slide title={() => <>Exercises: {tex`\bigo`}-notation</>}>
      <Pdf src="https://cims.nyu.edu/~regev/teaching/basic_algorithms_spring_2022/hw1.pdf" />
    </Slide>
    <Slide title="Programming tasks" columns>
      <Exercise>
        <ul>
          <li>
            Given an array <code>A</code> of {tex`n`} <strong>sorted</strong> elements, write an
            algorithm that would search for a given value. What's the running time?
          </li>
          <li>
            Assume <code>A</code> is an array of elements which are increasing then decreasing.
            Write an algorithm that finds the maximum value. What's its running time?
          </li>
          <li>
            Given an array of strictly the characters R, G, and B, segregate the values of the array
            so that all the Rs come first, the Gs come second, and the Bs come last. You can only
            swap elements of the array. Do this in linear time and in-place.
          </li>
        </ul>
      </Exercise>
      <div>
        <Jupyter>
          {py`
            # Type your code here
            # if you're too lazy to start your text editor
            4 + 7
          `}
        </Jupyter>
      </div>
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
      <Fragment>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif?20151222172210"
          alt="Merge sort example"
          style="width: 100%;"
        />
      </Fragment>
    </Slide>
    <Slide title="Merge sort: example">
      <Example>
        <p>
          Sort the following array: <code>[11, 6, 3, 24, 46, 22, 7]</code>
        </p>
      </Example>
    </Slide>
    <Slide title="Merge sort">
      <Jupyter>
        {mergeSort}
        {py`

          merge_sort([2, -1, 3, -4, 7, 3, 1])
        `}
      </Jupyter>
    </Slide>
    <Slide title="Running time of merge sort" cite={['clrs', 'pp. 42-43']}>
      <Proposition title="Running time of merge sort">
        {tex`
          T(n) = \bigo(n \log n)
        `}
      </Proposition>
      <ol>
        <li>Guess an expression for {tex`T(n)`}</li>
        <li>Rigorous proof by induction</li>
      </ol>
      <Fragment>
        {dot`
          graph {
            A [label = "O(n)"];
            B [label = "T(n/2)"];
            C [label = "T(n/2)"];
            A -- B;
            A -- C;
            label = "Divide and conquer once"
          }
        `}
      </Fragment>
      <Fragment>
        {dot`
          graph {
            0 [label = "O(n)"];
            00 [label = "O(n/2)"];
            01 [label = "O(n/2)"];
            000 [label = "T(n/4)"];
            001 [label = "T(n/4)"];
            010 [label = "T(n/4)"];
            011 [label = "T(n/4)"];
            0 -- 00;
            0 -- 01;
            00 -- 000;
            00 -- 001;
            01 -- 010;
            01 -- 011;
            label = "Divide and conquer twice"
          }
        `}
      </Fragment>
    </Slide>
    <Slide title="Sorting olympics" columns>
      <div>
        <h2>Insertion sort</h2>
        <Jupyter>
          {py`
            import time
            start = time.time()

          `}
          {insertionSort}
          {py`

            for i in range(10**6):
                A = [1, 4, 3, 2, 7, 3, 6]
                insertion_sort(A)

            time.time() - start
          `}
        </Jupyter>
      </div>
      <div>
        <h2>Merge sort</h2>
        <Jupyter>
          {py`
            import time
            start = time.time()

          `}
          {mergeSort}
          {py`

            for i in range(10**6):
                A = [1, 4, 3, 2, 7, 3, 6]
                merge_sort(A)

            time.time() - start
          `}
        </Jupyter>
      </div>
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
      <Exercise title="Lower-order term trick">
        <p>
          Show that {tex`\bigtheta(n^2)`} is the solution to the recurrence{' '}
          {tex`T(n) = 4 T(n / 2) + n`}.
        </p>
      </Exercise>
    </Slide>
    <Slide title="Exercises: solving recurrences part II" cite={['clrs', 'p. 101']}>
      <Exercise>
        <p>
          For each of the following recurrences, sketch its recursion tree, and guess a good
          asymptotic upper bound on its solution. Then use the substitution method to verify your
          answer.
        </p>
        <ol>
          <li>{tex`T(n) = T(n / 2) + n^3`}</li>
          <li>{tex`T(n) = 4T(n / 3) + n`}</li>
          <li>{tex`T(n) = 4T(n / 2) + n`}</li>
          <li>{tex`T(n) = 3T(n - 1) + 1`}</li>
        </ol>
      </Exercise>
      <Exercise title="Master theorem">
        <p>
          Assume that {tex`T(n) = aT(n / b) + f(n)`}, with {tex`a`} and {tex`b`} being integers. If{' '}
          {tex`f(n) = \bigo(n^{\log_ba - \epsilon})`} for some {tex`\epsilon > 0`}, then{' '}
          {tex`T(n) = \bigtheta(n^{\log_b a})`}.
        </p>
      </Exercise>
    </Slide>
    <Slide title="Recurrences: Avoiding pitfalls" cite={['clrs', 'pp. 93-94']}>
      <Exercise>
        <p>Find the mistake in the reasoning below:</p>
      </Exercise>
      {tex`
        T(n) = 2 T \left(\left\lfloor \frac n 2 \right\rfloor\right) + \bigtheta(n).
      `}
      <p>We can check that {tex`T(n) = O(n)`} satisfies the recurrence relation, as</p>
      {tex`
        \begin{align*}
          T(n) &\leq 2 \bigo \left(\left\lfloor \frac n 2 \right\rfloor\right) + \bigtheta(n)\\
          &= \bigo(n) + \bigtheta(n)\\
          &= O(n).
        \end{align*}
      `}
    </Slide>
    <Slide title="Comparison of sorting algorithms">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Insertion sort</th>
            <th>Merge sort</th>
            <th>Quicksort</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>In place</th>
            <td class="has-background-success">Yes</td>
            <td class="has-background-danger">No</td>
            <td class="has-background-success">Yes</td>
          </tr>
          <tr>
            <th>Comparison</th>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <th>Stable</th>
            <td class="has-background-success">Yes</td>
            <td class="has-background-success">Yes</td>
            <td class="has-background-danger">No</td>
          </tr>
          <tr>
            <th>Worst case runtime</th>
            <td class="has-background-danger">{tex`\bigo(n^2)`}</td>
            <td class="has-background-success">{tex`\bigo(n \log n)`}</td>
            <td class="has-background-danger">{tex`\bigo(n^2)`}</td>
          </tr>
          <tr>
            <th>Average case runtime</th>
            <td class="has-background-danger">{tex`\bigo(n^2)`}</td>
            <td class="has-background-success">{tex`\bigo(n \log n)`}</td>
            <td class="has-background-success">{tex`\bigo(n \log n)`}</td>
          </tr>
          <tr>
            <th>Best case runtime</th>
            <td class="has-background-success">{tex`\bigo(n)`}</td>
            <td>{tex`\bigo(n \log n)`}</td>
            <td>{tex`\bigo(n \log n)`}</td>
          </tr>
        </tbody>
      </table>
      <dl>
        <dt>Comparison sort</dt>
        <dd>Only uses comparisons to chose between different permutations</dd>
        <dt>Stable sort</dt>
        <dd>Maintain the order of identical elements</dd>
      </dl>
      <p>
        We shall see later that {tex`\bigo(n \log n)`} is the best we can do for{' '}
        <strong>comparison sorts</strong>.
      </p>
    </Slide>
    <Slide title="Quick sort: example">
      <Example>
        <p>
          Sort the following array: <code>[11, 6, 3, 24, 46, 22, 7]</code>
        </p>
      </Example>
      <Exercise>
        Apply (by hand) the quicksort algorithm to:
        {tex`
          A = [13, 19, 9, 5, 12, 8, 7, 4, 21, 2, 6, 11]
        `}
      </Exercise>
    </Slide>
    <Slide title="A first implementation of quicksort">
      <p>
        The real quicksort is <strong>in place</strong>. Here, we use the first element as pivot.
      </p>
      <Jupyter>
        {py`
          def quicksort(A):
              if len(A) <= 1:
                  return A
              pivots = [x for x in A if x == A[0]]
              L = quicksort([x for x in A if x < A[0]])
              G = quicksort([x for x in A if x > A[0]])
              return L + pivots + G

          quicksort([-5, 3, 2, -1, 7, 5, 3])
        `}
      </Jupyter>
    </Slide>
    <Slide title="Hoare partition's scheme" cite={['clrs', 'pp. 183-184']}>
      <Example title="Hoare partition's scheme">
        <p>
          Apply the <em>Hoare partition scheme</em> on <code>[11, 6, 3, 24, 46, 22, 7]</code>
        </p>
      </Example>
      <Exercise>
        <p>Illustrate the partition operation on the array</p>
        {tex`
          A = [ 13, 19, 9, 5, 12, 8, 7, 4, 21, 2, 6, 11 ]
        `}
      </Exercise>
    </Slide>
    <Slide title="In-place partitioning" cite={['clrs', 'p. 184']}>
      <Jupyter>
        {py`
          def quicksort(A, start, end):
              if len(A[start:end]) <= 1:
                  return None
              # In-place partitioning
              i = start
              for j in range(start, end - 1):
                  if A[j] <= A[end - 1]:
                    A[i], A[j] = A[j], A[i]
                    i += 1
              A[i], A[end - 1] = A[end - 1], A[i]
              # Recursive call
              quicksort(A, start, i)
              quicksort(A, i + 1, end)

          A = [-5, 3, 2, -1, 7, 5, 3]
          quicksort(A, 0, len(A))
          A
        `}
      </Jupyter>
      <Fragment>
        <Proposition title="Invariant">
          <ul>
            <li>
              In {tex`\{\text{start}, \dots, i - 1\}`}, the elements are {tex`\leq \text{pivot}`}.
            </li>
            <li>
              In {tex`\{i, \dots, j - 1\}`}, the elements are {tex`> \text{pivot}`}.
            </li>
          </ul>
        </Proposition>
      </Fragment>
    </Slide>
    <Slide title="Exercises">
      <Exercise>
        <ol>
          <li>Describe the worst case for quicksort. What's the runtime?</li>
          <li>Describe the best case for quicksort. What's the runtime?</li>
          <li>What is the runtime of the algorithm if all the elements are equal?</li>
        </ol>
      </Exercise>
      <Exercise>
        <p>
          <strong>Without sorting</strong>, implement an algorithm that finds the {tex`k`}-th
          smallest element.
        </p>
        <p>
          The algorithm must be <strong>in place</strong> and {tex`\bigo(n \log n)`} on average.
        </p>
      </Exercise>
      <Jupyter>{'# Type your code here'}</Jupyter>
    </Slide>
    <Slide title="Runtime of quicksort">
      <Proposition title="Runtime of quicksort">
        <ul>
          <li>The worst-case runtime is {tex`\bigo(n^2)`}</li>
          <li>The average case runtime is {tex`\bigo(n \log n)`}</li>
          <li>The best case runtime is {tex`\bigo(n \log n)`}</li>
        </ul>
      </Proposition>
      <Remark title="Choice of pivot">
        <p>
          The algorithm may perform poorly. One idea would be to choose a <strong>random</strong>{' '}
          pivot.
        </p>
      </Remark>
      <Exercise>
        <p>Implement Quicksort with a random pivot.</p>
      </Exercise>
    </Slide>
    <Slide title="Multiplication algorithm">
      <p>
        Fast multiplication of large numbers is essential in <Abbr key="CAS" />, cryptography, etc.
      </p>
      <p>
        For a long time, people thought that the multiplication algorithm we learn in primary school
        was optimal.
      </p>
      <Question>
        <p>Assume we have two numbers with {tex`n`} digits.</p>
        <ol>
          <li>What is the runtime of the traditional multiplication algorithm?</li>
          <li>What is the runtime when you sum them?</li>
        </ol>
      </Question>
    </Slide>
    <Slide title="Towards the Карацу́ба (Karatsuba) algorithm">
      <Exercise>
        <p>
          Assume {tex`a, b, c, d`} are digits and calculate the product{' '}
          {tex`(10 a + b) \times (10 c + d).`} Compare the result with {tex`(a + b)(c + d)`}
        </p>
        <p>Hence, use this to calculate {tex`42 \times 14`} using 3 multiplications.</p>
      </Exercise>
      <Exercise title="Карацу́ба's trick">
        <p>Use Карацу́ба's trick to calculate {tex`27 \times 32`} in 3 multiplications.</p>
      </Exercise>
    </Slide>
    <Slide title="Карацу́ба's algorithm in Python">
      <Jupyter>{karatsuba}</Jupyter>
    </Slide>
    <Slide title="Karatsuba's runtime">
      <Jupyter>{karatsuba}</Jupyter>
      <Exercise>
        <p>Calculate the runtime of Karatsuba's algorithm.</p>
        <p>
          What about if we only did <em>divide-and-conquer</em> without applying Karatsuba's trick?
        </p>
      </Exercise>
      <p>
        <em>Hint:</em> {tex`a^{\log_b c} = c^{\log_b a}`}
      </p>
    </Slide>
    <Slide title="Closest pair of points" columns>
      <div>
        <Problem title="Closest pair of points">
          <p>
            Given {tex`n`} distinct points {tex`p_1, \dots, p_n \in \R^2`}, find {tex`i, j`} such
            that
          </p>
          {tex`
            \dist(p_i, p_j) = \min_{\substack{i, j = 1, \dots, n\\ i \neq j}} \dist(x, y)
          `}
        </Problem>
        <Jupyter>
          {py`
            def closest_pair(p):
                min_distance = float('inf')
                pair = []
                for i in range(len(p)):
                    for j in range(len(p)):
                        dist = (p[i][0]-p[j][0])**2 + (p[i][1]-p[j][1])**2
                        if 0 < dist < min_distance:
                            min_distance = dist
                            pair = [i, j]
                return pair
            closest_pair([[0, 0], [1, 1], [5, 5]])
          `}
        </Jupyter>
      </div>
      <div>
        <Question>
          <ul>
            <li>What is the runtime of the brute-force algorithm?</li>
            <li>
              Could you think of a faster algorithm using <em>divide-and-conquer</em>?
            </li>
          </ul>
        </Question>
      </div>
    </Slide>
    <Slide title="Closest pair: divide and conquer">
      <ol>
        <li>
          <strong>Divide</strong> points into two halves using a vertical line
        </li>
        <li>
          <strong>Conquer</strong>: Find closest pair in each side recursively
        </li>
        <li>
          <strong>Combine</strong>: Find closest amongst pairs crossing the line
        </li>
      </ol>
      <Question title="Complexity of Step III">
        <p>Is it possible to do better than {tex`\bigo(n^2)`} for Step III?</p>
      </Question>
      <Fragment>
        <Idea>
          <p>
            If the closest pairs in each sides have distances {tex`\delta_1, \delta_2`}, we only
            need to look at a distance {tex`\delta \defeq \min \{\delta_1, \delta_2\}`} from the
            line.
          </p>
        </Idea>
      </Fragment>
    </Slide>
    <Slide title="Closest pair: Step III">
      <Idea title="Ordering">
        <p>
          <strong>Sort</strong> these points by their {tex`y`}-coordinate ({tex`\bigo(n \log n)`}).
          We now need only check each pair against their immediate neighbours.
        </p>
      </Idea>
      <Proposition>
        <p>
          Assume {tex`s_1, \ldots, s_k`} are sorted according to their {tex`y`} coordinate. If{' '}
          {tex`\abs{i - j} > 11,`} then {tex`\dist(s_i, s_j) \geq \delta`}.
        </p>
      </Proposition>
    </Slide>
    <Slide title="Closest pair: runtime">
      <Theorem title="Runtime of closest pair">
        <p>The runtime of our closest pair algorithm is {tex`\bigo(n \log^2 n).`}</p>
      </Theorem>
    </Slide>
    <Slide title={() => <>Optimality of {tex`\bigo(n \log n)`} for comparison sorts</>}>
      <Theorem>
        <p>
          The running time of a <strong>comparison sorting algorithm</strong> is at best{' '}
          {tex`\bigo(n \log n)`}.
        </p>
      </Theorem>
      <p>
        <strong>Hint</strong>:{' '}
        {tex`\log n! = \sum_{i = 1}^n \log n \approx \int_1^x \log x = \bigtheta(n \log n)`}
      </p>
    </Slide>
    <Slide title="Counting sort: an example">
      <Example>
        Sort the list
        <table>
          <tbody>
            <tr>
              {[3, 2, 2, 7, 2, 4, 6, 1, 8, 1].map((i) => (
                <td>{i}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </Example>
      <ol>
        <li>
          Keep a running tally <CountTable max={10} />
        </li>
        <li>Recontruct the sorted list</li>
      </ol>
    </Slide>
    <Slide title="Counting sort: Python implementation">
      <Jupyter solution={countingSort + '\ncounting_sort([0, 4, 3, 2, 7, 3, 4], 10)'}>
        {py`
          def counting_sort(A, k):
              pass

          counting_sort([0, 4, 3, 2, 7, 3, 4], 10)
        `}
      </Jupyter>
    </Slide>
    <Slide title="Counting sort: running time">
      <Editor>{countingSort}</Editor>
      <Proposition>
        <p>
          The running time of counting sort is {tex`\bigo(n + k)`}, where {tex`k`} is the number of
          admissible elements.
        </p>
      </Proposition>
    </Slide>
  </Slideshow>
);
