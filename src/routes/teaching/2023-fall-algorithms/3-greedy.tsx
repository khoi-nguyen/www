import meta from './3-greedy.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Interval scheduling problem">
        <Problem title="Interval scheduling problem">
          <ul>
            <li>
              Job {tex`j`} starts at {tex`s_j`} and finishes at {tex`f_j`}
            </li>
            <li>Two jobs are compatible if they don't overlap</li>
            <li>Goal: find maximum subset of mutually compatible jobs</li>
          </ul>
        </Problem>
        <Question>
          <p>What kind of heuristics would you consider to select your maximum subset?</p>
        </Question>
        <Fragment>
          <p>
            What is wrong with <em>earliest start time</em>, <em>shortest interval</em> or{' '}
            <em>fewest conflicts</em>?
          </p>
        </Fragment>
      </Slide>
      <Slide title="Dynamic programming solution">
        <p>
          Consider {tex`S_{ij}`} the set of activities that start after activity {tex`a_i`} finishes
          and before {tex`a_j`} starts, and write {tex`c[i, j]`} the size of an optimal solution on{' '}
          {tex`S_{ij}`}.
        </p>
        <p>If {tex`a_k`} is part of the optimal solution, then</p>
        {tex`
          c[i, j] = c[i, k] + 1 + c[k, j].
        `}
        We brute-force the choice of {tex`a_k`} to obtain:
        {tex`
          c[i, j] =
          \begin{cases}
            0 & \text{if } S_{ij} = \emptyset\\
            \max \{ c[i, k] + c[k, j] + 1 : a_k \in S_{ij} \}
            & \text{otherwise}
          \end{cases}
        `}
        <Exercise>
          <p>Implement a top-down memoized version of the problem. What is its running time?</p>
        </Exercise>
      </Slide>
      <Slide title="DP solution">
        <Jupyter
          hideUntil={new Date('2023-10-04')}
          solution={py`
            import functools
            a = [[1, 3], [2, 4], [3, 5]]

            @functools.cache
            def c(fltr):
                q = 0
                for k in range(len(a)):
                    if fltr(a[k]):
                        before = lambda x: fltr(x) and x[1] <= a[k][0]
                        after = lambda x: fltr(x) and x[0] >= a[k][1]
                        q = max(q, c(before) + c(after) + 1)
                return q

            c(lambda x: True)
          `}
        >
          {py`
            import functools
            a = [[1, 3], [2, 4], [3, 5]]

            # Todo: Arguments?
            def c():
                pass

            # Todo: arguments?
            c()
          `}
        </Jupyter>
      </Slide>
      <Slide title="Greedy template">
        <h3>Greedy template</h3>
        <ul>
          <li>Consider jobs in some order</li>
          <li>Select first job</li>
          <li>Remove incompatible jobs</li>
          <li>Repeat steps 2 and 3 while still possible</li>
        </ul>
        <Question>
          <p>How would you order the activities?</p>
        </Question>
      </Slide>
      <Slide title="Optimality of greedy algorithm">
        <Proposition>
          <p>
            The greedy algorithm that considers jobs in increasing order of finish time is optimal.
          </p>
        </Proposition>
        <p>Phrased in terms of the DP, we could say</p>
        <Proposition>
          <p>
            The optimal solution of {tex`S_{ij}`} could always be assumed to contain the activity in{' '}
            {tex`S_{ij}`}
            with earliest finish time.
          </p>
        </Proposition>
      </Slide>
      <Slide title="Greedy implementation">
        <Exercise>
          <p>Implement a greedy version of the interval scheduling problem</p>
        </Exercise>
        <Jupyter
          solution={py`
            a = [[1, 3], [3, 5], [2, 4]]
            a.sort(key=lambda x: x[1])

            selection = [a[0]]
            last = 0
            for m in range(1, len(a)):
                if a[m][0] >= a[last][1]:
                    selection.append(a[m])
                    last = m
            selection
          `}
        >
          {py`
            a = [[1, 3], [3, 5], [2, 4]]
          `}
        </Jupyter>
      </Slide>
      <Slide title="Exercises">
        <Exercise title="Interval partitioning">
          <ul>
            <li>Lectures have start and finish times</li>
            <li>Goal: find smallest number of classrooms to schedule all lectures.</li>
          </ul>
          <p>Implement a solution, prove it's optimal and find its running time.</p>
        </Exercise>
      </Slide>
      <Slide title="Programming exercises" columns>
        <div>
          <Exercise>
            <p>
              Given an array of nonnegative integers, you are initially positioned at the first
              index of the array. Each element in the array represents your maximum jump length at
              that position. Determine if you are able to reach the last index.
            </p>
          </Exercise>
          <Exercise>
            <p>
              What if we want to know the minimum number of jumps required to reach the last index?
            </p>
          </Exercise>
        </div>
        <div>
          <Jupyter
            hideUntil={new Date('2023-10-03')}
            solution={py`
              def can_jump(array):
                  if not array:
                      return True
                  max_distance = 0
                  for i, n in enumerate(numbers):
                      if i > max_distance:
                          break
                      max_distance = max(max_distance, i + array[i])
                  return max_distance >= len(array) - 1
            `}
          >
            {py`
              def can_jump(array):
                  pass
            `}
          </Jupyter>
        </div>
      </Slide>
      <Slide title="Exercise: Lemonade change">
        <Exercise>
          <p>
            At a lemon stand, each lemonade costs 5 euros. Each customer will buy one lemonade and
            pay with either a 5, 10, or 20 euro bill. You must determine whether it is possible to
            provide the correct change to each customer, knowing that you don't have any change at
            first.
          </p>
        </Exercise>
      </Slide>
    </Slideshow>
  );
};
