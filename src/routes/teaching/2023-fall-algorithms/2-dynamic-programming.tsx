import meta from './2-dynamic-programming.json';

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
          solution={py`
            def fibonacci(n):
                if n <= 1:
                    return 1
                return fibonacci(n - 1) + fibonacci(n - 2)

            fibonacci(4)
          `}
        >
          {py`
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
          solution={py`
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
          {py`
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
          {py`
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
          solution={py`
            def fibonacci(n):
                a, b, f = 0, 1, 0
                for k in range(n):
                    f = a + b
                    a, b = b, f
                return f

            fibonacci(50)
          `}
        >
          {py`
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
          solution={py`
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
          {py`
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
          {py`
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
    </Slideshow>
  );
};
