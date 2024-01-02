import meta from './2-dynamic-programming.json'

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Fibonacci numbers">
        <Definition title="Fibonacci numbers">
          {tex`
            1 \quad 1 \quad 2 \quad 3 \quad 5 \quad 8 \quad 13 \quad 21 \quad \dots
          `}
        </Definition>
        <Exercise>
          <p>Write a Python code that calculates Fibonacci numbers</p>
        </Exercise>
        <Jupyter
          hideUntil={new Date('2023-09-22')}
          solution={py.raw`
            def fibonacci(n):
                if n <= 1:
                    return 1
                return fibonacci(n - 1) + fibonacci(n - 2)

            fibonacci(4)
          `}
        >
          {py.raw`
            def fibonacci(n):
                pass

            fibonacci(4)
          `}
        </Jupyter>
        <Question>
          <p>
            What happens if you calculate the {tex`50`}th Fibonacci numbers? What is the running
            time of the above code?
          </p>
        </Question>
      </Slide>
      <Slide title="Memoization">
        <Definition title="Memoization">
          <p>
            Optimization technique used to speed up programs by caching the results of expensive
            function calls and returning them when the same inputs are encountered again.
          </p>
        </Definition>
        <Exercise>
          <p>
            Write a memoized version of <code>fibonacci(n)</code>
          </p>
        </Exercise>
        <Jupyter
          hideUntil={new Date('2023-09-01')}
          solution={py.raw`
            memo = {}
            def fibonacci(n):
                if n in memo:
                    return memo[n]
                if n <= 1:
                    result = 1
                else:
                    result = fibonacci(n - 1) + fibonacci(n - 2)
                memo[n] = result
                return result
            fibonacci(50)
          `}
        >
          {py.raw`
            def fibonacci(n):
                pass

            fibonacci(50)
          `}
        </Jupyter>
        <Question>
          <p>What's the time complexity?</p>
        </Question>
      </Slide>
      <Slide title="Memoization in real-life Python">
        <p>
          In practice, there is a <strong>decorator</strong> that does all the work for you.
        </p>
        <Jupyter>
          {py.raw`
            import functools

            @functools.cache
            def fibonacci(n):
                if n <= 1:
                    return 1
                return fibonacci(n - 1) + fibonacci(n - 2)

            fibonacci(50)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Bottom-up">
        <Question>
          <p>
            With the memoized function, the space complexity in {tex`\bigo(n)`}. Can you write an
            algorithm with {tex`\bigo(1)`} space complexity?
          </p>
        </Question>
        <Jupyter
          hideUntil={new Date('2023-09-22')}
          solution={py.raw`
            def fibonacci(n):
                a, b, f = 0, 1, 0
                for k in range(n):
                    f = a + b
                    a, b = b, f
                return f

            fibonacci(50)
          `}
        >
          {py.raw`
            def fibonacci(n):
                pass

            fibonacci(50)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Dynamic programming">
        <Question>
          <p>
            What is <strong>dynamic programming?</strong>
          </p>
        </Question>
        <ul>
          <li>Problem is broken down into overlapping subproblems</li>
          <li>Results of the subproblems are saved</li>
          <li>Solve the original problem</li>
        </ul>
        <p>Two ways:</p>
        <ul>
          <li>Top down (recurse + memoize)</li>
          <li>Bottom up</li>
        </ul>
      </Slide>
      <Slide title="Rod cutting">
        <Question title="Rod cutting problem">
          <p>
            What is the highest revenue we can get by cutting an {tex`n`} feet rod and selling the
            pieces?
          </p>
          <table>
            <tbody>
              <tr>
                <th>Length</th>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <td>{i}</td>
                ))}
              </tr>
              <tr>
                <th>Price</th>
                {[1, 5, 8, 9, 10, 17, 17, 20, 24].map((i) => (
                  <td>{i}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </Question>
        <Question>
          <p>
            What would the runtime be if we brute-force this problem and try all rod-cutting
            combinations?
          </p>
        </Question>
      </Slide>
      <Slide title="Top down solution">
        <p>
          We can decompose our problem as consisting of a first piece of length {tex`i`} and a
          remainder of length {tex`n - i`}. Write a top down implementation without worrying about
          memoization.
        </p>
        <Jupyter
          hideUntil={new Date('2023-09-22')}
          solution={py.raw`
            price = [0, 1, 10, 13, 18, 20, 31, 32]

            def cut_rod(n):
                if n == 0:
                    return 0
                result = 0
                for i in range(1, n + 1):
                    result = max(result, price[i] + cut_rod(n - i))
                return result

            cut_rod(7)
        `}
        >
          {py.raw`
            price = [0, 1, 10, 13, 18, 20, 31, 32]

            def cut_rod(n):
                pass

            cut_rod(7)
          `}
        </Jupyter>
        <Question>
          <p>What's the time complexity? What if we memoize?</p>
        </Question>
      </Slide>
      <Slide title="Bottom-up version of rod cutting">
        <Exercise>
          <p>
            Write a bottom-up version of <code>cut_rod</code>
          </p>
        </Exercise>
        <Jupyter>
          {py.raw`
            def cut_rod(n):
                r = [0]
                # Solve cut_rod(j)
                for j in range(1, n + 1):
                    q = 0
                    for i in range(1, j + 1):
                        q = max(q, price[i] + r[j - i])
                    r[j] = q
                return r[n]
          `}
        </Jupyter>
        <Question>
          <p>What are the time and space complexities?</p>
        </Question>
      </Slide>
      <Slide title="Rod cutting: exercises">
        <Exercise pluralize>
          <ol>
            <li>What if we want to know the actual cuts and not just the value?</li>
            <li>What if the process of cutting itself had a cost?</li>
          </ol>
        </Exercise>
      </Slide>
      <Slide title="Exercises">
        <Iframe src="https://cims.nyu.edu/~regev/teaching/basic_algorithms_spring_2022/hw5.pdf" />
      </Slide>
      <Slide title="Dynamic programming">
        <table>
          <thead>
            <tr>
              <td></td>
              <th>Fibonacci</th>
              <th>Rod cutting</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Subproblems</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Relate</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Original</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Order</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Base cases</th>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Running time</th>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <Remark>
          {tex`
            \text{Time complexity} =
            \# \ \text{subproblems} \times \text{non-recursive work}
          `}
        </Remark>
      </Slide>
      <Slide title="Longest Common subsequence">
        <Problem title="Longest Common Subsequence">
          <p>
            Given two sequences A and B, find the longest sequence L that's a subsequence of both A
            and B.
          </p>
        </Problem>
        <Example>
          <p>A LCS of "hieroglyphology" and "michaelangelo" is "hello".</p>
        </Example>
        <Exercise>
          <p>Determine an LCS of</p>
          {tex`
            1\,0\,0\,1\,0\,1\,0\,1\quad
            0\,1\,0\,1\,1\,0\,1\,1\,0
          `}
        </Exercise>
        <Exercise>
          <p>What is the time complexity of the naive brute-force algorithm?</p>
        </Exercise>
      </Slide>
      <Slide title="Problem analysis">
        <dl>
          <dt>Subproblems</dt>
          <dd>
            <code>C[i,j]</code> denotes the length of LCS of <code>X[:i]</code> and{' '}
            <code>X[:j]</code>
          </dd>
          <dt>Base cases</dt>
          <dd>
            <code>C[0,j] = C[i, 0] = 0</code>
          </dd>
          <dt>Recurrence</dt>
          <dd>
            {tex`
              C[i, j] =
              \begin{cases}
                0 & \text{if } i j = 0\\
                C[i - 1, j - 1] + 1 & \text{if } i j > 0 \, \text{and} \, X[i - 1] = Y[j - 1]\\
                \max\{C[i, j-1], C[i - 1, j]\} & \text{otherwise}
              \end{cases}
            `}
          </dd>
        </dl>
      </Slide>
      <Slide title="Top-down implementation">
        <Exercise>
          <p>Write a top-down implementation of LCS</p>
        </Exercise>
        <Jupyter
          solution={py.raw`
            import functools

            @functools.cache
            def lcs(X, Y):
                if len(X) == 0 or len(Y) == 0:
                    return 0
                if X[-1] == Y[-1]:
                    return 1 + lcs(X[:-1], Y[:-1])
                return max(lcs(X[:-1], Y), lcs(X, Y[:-1]))

            lcs(['t', 'h', 'e', 'i', 'r'], ['h', 'a', 'b', 'i', 't'])
          `}
          hideUntil={new Date('2023-09-27')}
        >
          {py.raw`
            def lcs(X, Y):
                pass

            lcs(['t', 'h', 'e', 'i', 'r'], ['h', 'a', 'b', 'i', 't'])
          `}
        </Jupyter>
      </Slide>
      <Slide title="Towards the bottom-up implementation" columns>
        <table>
          <thead>
            <tr>
              {['', '', 'T', 'H', 'E', 'I', 'R'].map((l) => (
                <th>{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {['', '0', '', '', '', '', ''].map((l) => (
                <th>{l}</th>
              ))}
            </tr>
            {['H', 'A', 'B', 'I', 'T'].map((l) => (
              <tr>
                <th>{l}</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              {['', '', 'B', 'D', 'C', 'A', 'B', 'A'].map((l) => (
                <th>{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {['', '0', '', '', '', '', '', ''].map((l) => (
                <th>{l}</th>
              ))}
            </tr>
            {['A', 'B', 'C', 'B', 'D', 'A', 'B'].map((l) => (
              <tr>
                <th>{l}</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Slide>
      <Slide title="LCS: Python implementation">
        <Exercise>
          <p>Below is a bottom-up implementation of LCS. What's its time complexity?</p>
        </Exercise>
        <Jupyter>
          {py.raw`
            def lcs(X, Y):
                m, n = len(X), len(Y)
                C = [[0] * (n + 1)]
                for i in range(1, m + 1):
                    C.append([0])
                    for j in range(1, n + 1):
                        if X[i - 1] == Y[j - 1]:
                            C[i].append(C[i - 1][j - 1] + 1)
                        else:
                            C[i].append(max(C[i - 1][j], C[i][j - 1]))
                return C[m][n]
            lcs(['t', 'h', 'e', 'i', 'r'], ['h', 'a', 'b', 'i', 't'])
          `}
        </Jupyter>
      </Slide>
      <Slide title="Parent pointers" columns>
        <div>
          <p>We'll use parent pointers to relate a subproblem to its parent.</p>
          <table>
            <thead>
              <tr>
                {['', '', 'T', 'H', 'E', 'I', 'R'].map((l) => (
                  <th>{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {['', '0', '', '', '', '', ''].map((l) => (
                  <th>{l}</th>
                ))}
              </tr>
              {['H', 'A', 'B', 'I', 'T'].map((l) => (
                <tr>
                  <th>{l}</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Exercise>
            <p>Find the LCS using parent pointers.</p>
          </Exercise>
          <table>
            <thead>
              <tr>
                {['', '', 'B', 'D', 'C', 'A', 'B', 'A'].map((l) => (
                  <th>{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {['', '0', '', '', '', '', '', ''].map((l) => (
                  <th>{l}</th>
                ))}
              </tr>
              {['A', 'B', 'C', 'B', 'D', 'A', 'B'].map((l) => (
                <tr>
                  <th>{l}</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Slide>
      <Slide title="LCS: Python implementation with parent pointers">
        <Exercise>
          <p>Change the implementation so it actually computes the LCS and not only its length.</p>
        </Exercise>
        <Jupyter>
          {py.raw`
            def lcs(X, Y):
                m, n = len(X), len(Y)
                C = [[0] * (n + 1)]
                for i in range(1, m + 1):
                    C.append([0])
                    for j in range(1, n + 1):
                        if X[i - 1] == Y[j - 1]:
                            C[i].append(C[i - 1][j - 1] + 1)
                        else:
                            C[i].append(max(C[i - 1][j], C[i][j - 1]))
                return C[m][n]
            lcs(['t', 'h', 'e', 'i', 'r'], ['h', 'a', 'b', 'i', 't'])
          `}
        </Jupyter>
      </Slide>
      <Slide title="Longest increasing subsequence">
        <Problem title="Longest increasing Subsequence">
          <p>
            Given a sequence A, find the longest subsequence L of A consisting of increasing
            numbers.
          </p>
        </Problem>
        <Example>
          <p>An LIS of "carbohydrate" would be "abort"</p>
        </Example>
      </Slide>
      <Slide title="Analysis of the problem">
        <table>
          <thead>
            <tr>
              <td></td>
              <th>Longest increasing subsequence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Subproblems</th>
              <td></td>
            </tr>
            <tr>
              <th>Relate</th>
              <td></td>
            </tr>
            <tr>
              <th>Original</th>
              <td></td>
            </tr>
            <tr>
              <th>Order</th>
              <td></td>
            </tr>
            <tr>
              <th>Base cases</th>
              <td></td>
            </tr>
            <tr>
              <th>Running time</th>
              <td></td>
            </tr>
          </tbody>
        </table>
        <Exercise>
          <p>Implement the LIS algorithm in Python.</p>
        </Exercise>
      </Slide>
      <Slide title="Knapsack">
        <Problem>
          <ul>
            <li>{tex`n`} objects and a knapsack</li>
            <li>
              Item {tex`i`} weighs {tex`w_i`} and has value {tex`v_i`}
            </li>
            <li>Knapsack has capacity of {tex`W`}</li>
            <li>Goal is to fill knapsack and maximize total value</li>
          </ul>
        </Problem>
        <Example>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>value</th>
                <th>weight</th>
              </tr>
            </thead>
            <tbody>
              {[
                [1, 1, 1],
                [2, 6, 2],
                [3, 18, 5],
                [4, 22, 6],
                [5, 28, 7],
              ].map((row) => (
                <tr>
                  {row.map((cell) => (
                    <td>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p>If {tex`W = 11`}, the optimal choice is to take items 3 and 4.</p>
        </Example>
      </Slide>
      <Slide title="Analysis of the knapsack problem">
        <table>
          <thead>
            <tr>
              <td></td>
              <th>Knapsack</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Guess</th>
              <td></td>
            </tr>
            <tr>
              <th>Subproblems</th>
              <td></td>
            </tr>
            <tr>
              <th>Relate</th>
              <td></td>
            </tr>
            <tr>
              <th>Original</th>
              <td></td>
            </tr>
            <tr>
              <th>Order</th>
              <td></td>
            </tr>
            <tr>
              <th>Base cases</th>
              <td></td>
            </tr>
            <tr>
              <th>Running time</th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Slide>
      <Slide title="Knapsack: top-down implementation">
        <Exercise>
          <p>Write a top-down implementation of the Knapsack problem</p>
        </Exercise>
        <Jupyter
          hideUntil={new Date('2023-09-29')}
          solution={py.raw`
            from functools import cache

            w = [1, 2, 5, 6, 7]
            v = [1, 6, 18, 22, 28]

            @cache
            def knapsack(i, W):
                if i == 0:
                    return 0
                if w[i] > W:
                    return knapsack(i - 1, W)
                return max(
                    knapsack(i - 1, W),
                    v[i] + knapsack(i - 1, W - w[i])
                )
            knapsack(4, 11)
        `}
        >
          {py.raw`
            from functools import cache

            w = [1, 2, 5, 6, 7]
            v = [1, 6, 18, 22, 28]

            @cache
            def knapsack(i, W):
                pass
            knapsack(4, 11)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Knapsack: towards the bottom-up implementation" split={false}>
        <p>Use the idea of parent pointers to reconstruct the solution.</p>
        <table>
          <thead>
            <tr>
              <td></td>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <th>{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['{}', '{1}', '{1, 2}', '{1, 2, 3}', '{1, 2, 3, 4}', '{1, 2, 3, 4, 5}'].map(
              (label) => (
                <tr>
                  <td>{label}</td>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_) => (
                    <td></td>
                  ))}
                </tr>
              ),
            )}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>value</th>
              <th>weight</th>
            </tr>
          </thead>
          <tbody>
            {[
              [1, 1, 1],
              [2, 6, 2],
              [3, 18, 5],
              [4, 22, 6],
              [5, 28, 7],
            ].map((row) => (
              <tr>
                {row.map((cell) => (
                  <td>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Slide>
      <Slide title="Bottom-Up implementation of Knapsack">
        <Exercise>
          <p>
            Write a bottom-up implementation of Knapsack. Use parent pointers to construct the
            original solution.
          </p>
        </Exercise>
        <Jupyter
          hideUntil={new Date('2023-09-29')}
          solution={py.raw`
            w = [1, 2, 5, 6, 7]
            v = [1, 6, 18, 22, 28]
            W, n = 11, len(w)

            M = [[0 for col in range(W + 1)] for row in range(n + 1)]
            for i in range(n):
                for j in range(1, W + 1):
                    if w[i] > j:
                        M[i + 1][j] = M[i][j]
                    else:
                        M[i + 1][j] = max(M[i][j], v[i] + M[i][j - w[i]])
            M[-1][-1]
          `}
        >
          {py.raw`
            w = [1, 2, 5, 6, 7]
            v = [1, 6, 18, 22, 28]
            W, n = 11, len(w)

            M = [[0 for col in range(W + 1)] for row in range(n + 1)]
            for i in range(n):
                for j in range(1, W + 1):
                    pass

            M[-1][-1]
          `}
        </Jupyter>
      </Slide>
      <Slide title="Running-time: pseudo-polynomial">
        <Proposition>
          {tex`
            T(n) = \bigo(n W)
          `}
        </Proposition>
        <Remark>
          <p>
            Storing {tex`W`} in memory requires {tex`\bigo(\log_2 W)`} bit. Knapsack is therefore
            exponential in the input size, but polynomial in the input. We say it's a{' '}
            <em>pseudo-polynomial</em> algorithm.
          </p>
        </Remark>
      </Slide>
      <Slide title="Exercises: Question 4">
        <Iframe src="https://cims.nyu.edu/~regev/teaching/basic_algorithms_spring_2022/hw5.pdf" />
      </Slide>
    </Slideshow>
  )
}
