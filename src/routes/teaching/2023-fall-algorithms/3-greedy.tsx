import meta from './3-greedy.json'
import dedent from 'dedent-js'

export default () => {
  const treeNode = py.raw`
    class Node:
        left = None
        right = None
        def __init__(self, frequency, letter = None):
            self.letter = letter
            self.frequency = frequency
        def __lt__(self, other):
            return self.frequency < other.frequency
        def encode(self, encoding = ''):
            if self.left is None and self.right is None:
                yield (self.letter, encoding)
            else:
                for v in self.left.encode(encoding + '0'):
                    yield v
                for v in self.right.encode(encoding + '1'):
                    yield v
  `
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
          solution={py.raw`
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
          {py.raw`
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
          solution={py.raw`
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
          {py.raw`
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
            solution={py.raw`
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
            {py.raw`
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
      <Slide title="Lossless text compression">
        <Question>
          <p>
            Given a text that uses 32 symbols (26 letters, space, punctuation), how can we encode
            this text in bits?
          </p>
        </Question>
        <Fragment>
          <Question>
            <p>
              How can we use the relative frequencies of the letters to reduce our encoding? How do
              we know when the next symbol begins?
            </p>
          </Question>
        </Fragment>
      </Slide>
      <Slide title="Prefix code">
        <p>
          A <strong>prefix code</strong> does not have ambiguities.
        </p>
        <Definition title="Prefix code">
          <p>
            A <strong>prefix code</strong> for a set {tex`S`} is a function
          </p>
          {tex`
            c : S \to \{0, 1\}
          `}
          such that {tex`c(x)`} is never a prefix of {tex`y`} if {tex`x, y \in S`} are distinct.
        </Definition>
      </Slide>
      <Slide title="Codes: binary tree representation">
        <Example>
          <p>Draw the tree associated with</p>
          {tex`
            c(a) = 11, \quad
            c(e) = 01, \quad
            c(k) = 001, \quad
            c(l) = 10, \quad
            c(u) = 000
          `}
        </Example>
        <Question>
          <p>When is a binary tree a representation of a prefix code?</p>
        </Question>
        <Exercise>
          <p>What is the meaning of 111010001111101000</p>
        </Exercise>
      </Slide>
      <Slide title="Optimality">
        <Definition title="Average bits per letter">
          {tex`
            \text{ABL}(c) = \sum_{x \in S} f_x \abs{c(x)}
          `}
        </Definition>
        <p>In a binary tree, the formula becomes</p>
        {tex`
          \text{ABL}(T) = \sum_{x \in S} f_x \text{depth}_T(x)
        `}
        <Problem>
          <p>Given an alphabet {tex`S`}, find a prefix code that minimizes the ABL.</p>
        </Problem>
      </Slide>
      <Slide title="Towards Huffman encoding">
        <h3>Key observations</h3>
        <ul>
          <li>
            Lowest frequency letters should be at the lowest level in the tree of an optimal prefix
            code.
          </li>
          <li>For {tex`n > 1`}, the lowest level always contains at least two leaves.</li>
          <li>The order in which items appear in a level does not matter</li>
        </ul>
      </Slide>
      <Slide title="Huffman encoding by hand">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d8/HuffmanCodeAlg.png"
          alt="Huffman encoding example"
          height={700}
        />
        <Example>
          <p>Encode the string "pepper" using Huffman encoding</p>
        </Example>
      </Slide>
      <Slide title="Huffman: pseudo-code">
        <pre>
          {dedent`
            Huffman(S) {
              if |S|=2 {
                return tree with root and 2 leaves
              } else {
                let y and z be lowest-frequency letters in S
                S’ = S
                remove y and z from S’
                insert new letter ω in S’ with fω=fy+fz
                T’ = Huffman(S’)
                T = add two children y and z to leaf ω from T’
                return T
              }
            } 
          `}
        </pre>
        <Question>
          <p>What's the time complexity?</p>
        </Question>
      </Slide>
      <Slide title="Huffman: correctness">
        <Proposition>
          <p>
            Let T' be the tree obtained by removing two sibling leaves {tex`x, y`}, and relabelling
            the parent {tex`\omega`} with frequency {tex`f_x + f(y)`}.
          </p>
          {tex`
            \text{ABL}(T') = \text{ABL}(T) - f_\omega
          `}
        </Proposition>
        <Proposition>
          <p>Huffman code for S achives the minimum ABL of any prefix code</p>
        </Proposition>
      </Slide>
      <Slide title="Priority queue">
        <p>
          We need a <strong>priority queue</strong> model so we can associate shorter encodings with
          the most frequent letters. The following method should be implemented and run "fast".
        </p>
        <ul>
          <li>
            <code>insert(S, x)</code>
          </li>
          <li>
            <code>max(S)</code>
          </li>
          <li>
            <code>extract_max(S)</code>
          </li>
          <li>
            <code>increase_key(S, x, k)</code>
          </li>
        </ul>
      </Slide>
      <Slide title="Data structure: Heaps">
        <Definition title="Heap">
          <p>A heap is an array visualized as a nearly complete binary trees.</p>
        </Definition>
        <Example>
          <p>Represent the following array as a heap</p>
          <table>
            <tbody>
              <tr>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <td>{i}</td>
                ))}
              </tr>
              <tr>
                {[23, 12, 34, 4, 5, 10, 7, 8, 29, 1].map((i) => (
                  <td>{i}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </Example>
        <Question>
          <p>
            Given a node {tex`i`}, what are the indices of its children? What about the index of the
            parent?
          </p>
        </Question>
      </Slide>
      <Slide title="Max and min-heaps">
        <Definition title="Max/min-heaps">
          <p>
            A max (resp. min) heap is a heap that has the additional property that a parent is
            always greater (resp. less) than or equal to its children.
          </p>
        </Definition>
        <p>A min heap is ideal to find the two least frequent letters!</p>
      </Slide>
      <Slide title="Min-Heaps in Python's standard library">
        <Editor>
          {py.raw`
            import heapq

            # Transform list into heap in O(n)
            heapq.heapify(x)

            # Pop smallest item O(log n)
            heapq.heappop(heap)

            # Push a value on the heap O(log n)
            heapq.heappush(heap, item)
          `}
        </Editor>
        <Question>
          <p>
            How are these methods implemented to keep the heap invariant? Why do we sift down
            instead of up?
          </p>
        </Question>
        <Jupyter>
          {py.raw`
            import heapq
            S = [100, 4, 7, 10, 3, 2, 0]
            heapq.heapify(S)
            S
          `}
        </Jupyter>
      </Slide>
      <Slide title="Huffman encoding: implementation">
        <Jupyter>
          {treeNode}
          {py.raw`
            a = Node(0.1, 'a')
            a.left, a.right = Node(0.1, 'b'), Node(0.1, 'c')
            list(a.encode())
          `}
        </Jupyter>
      </Slide>
      <Slide title="Huffman encoding: implementation">
        <Exercise>
          <p>
            Implement Huffman's encoding. How many bits do you save on Shakespeare's 18th sonnet?
          </p>
        </Exercise>
        <Jupyter
          before={treeNode}
          hideUntil={new Date('2023-10-06')}
          solution={py.raw`
            import heapq

            freq = {}
            text = "eeeeaazeeabbbaabeaeab"
            for l in text:
                freq[l] = freq[l] + 1 if l in freq else 1
            # Priority queue
            pq = []
            for l in freq:
                pq.append(Node(freq[l], l))
            heapq.heapify(pq)

            while len(pq) > 1:
                y, z = heapq.heappop(pq), heapq.heappop(pq)
                w = Node(y.frequency + z.frequency)
                w.left, w.right = y, z
                heapq.heappush(pq, w)

            list(pq[0].encode())
          `}
        >
          {py.raw`
            import heapq

            freq = {}
            text = "eeeeaazeeabbbaabeaeab"
          `}
        </Jupyter>
      </Slide>
      <Slide title="Huffman code: exercises">
        <Iframe src="https://www.cimt.org.uk/resources/codes/codes_u17_text.pdf" />
      </Slide>
      <Slide title="Huffman code: exercises">
        <Iframe src="https://ranger.uta.edu/~alex/courses/3318/practice/quiz4/2_Huffman_practice_Solution.pdf" />
      </Slide>
      <Slide title="Exercices: homework">
        <ul>
          <li>
            <a href="https://leetcode.com/problems/largest-number/">Largest number</a>
          </li>
          <li>
            <a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/">
              Best time to buy and sell stock
            </a>
          </li>
          <li>
            <a href="https://leetcode.com/problems/gas-station/description/">Gas station</a>
          </li>
          <li>
            <a href="https://leetcode.com/problems/queue-reconstruction-by-height/?envType=list&envId=50f6p33i">
              Queue reconstruction by height
            </a>
          </li>
        </ul>
      </Slide>
    </Slideshow>
  )
}
