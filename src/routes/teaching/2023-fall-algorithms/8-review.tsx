import meta from './8-review.json';

export default () => (
  <Slideshow meta={meta}>
    <Slide title="Exam structure">
      <ol>
        <li>
          Apply a graph algorithm by hand and show your work
          <ul>
            <li>BFS, DFS, Topological sort</li>
            <li>Dijkstra/Ford-Bellman, A*</li>
            <li>Kruskal, Prim</li>
          </ul>
        </li>
        <li>One dynamic programming or divide-and-conquer question</li>
        <li>One or two graphs questions (a variation of an algorithm seen in class)</li>
      </ol>
    </Slide>
    <Slide title="Divide and conquer">
      <p>Divide and conquer with arrays. Note that strings are arrays too.</p>
      <Editor>
        {py`
          def divide_and_conquer(A):
              # Base cases: A = [], A = [x]
              # TODO: complete

              # Divide
              n = len(A) // 2
              L = divide_and_conquer(A[:n])
              R = divide_and_conquer(A[n:])

              # Conquering steps
              # TODO: complete
              return ...
        `}
      </Editor>
    </Slide>
    <Slide title="Dynamic programming">
      <Editor>
        {py`
          cache = {}
          def DP(*args):
              # Check cache
              if args in cache:
                  return cache[args]

              # Base cases
              if ...:
                  result = ...

              else:
                  # Recursive calls
                  # Compute the result
                  result = ...

              cache[args] = result
              return result
        `}
      </Editor>
    </Slide>
    <Slide title="Dijkstra">
      <Iframe src="https://opendsa-server.cs.vt.edu/embed/DijkstraPE" />
    </Slide>
    <Slide title="Dijkstra 2">
      <Iframe src="https://courses.cs.washington.edu/courses/cse373/13au/more_examples_midterm2_solved.pdf" />
    </Slide>
    <Slide title="Bellman-Ford">
      <Iframe src="https://algorithms.discrete.ma.tum.de/graph-algorithms/spp-bellman-ford/index_en.html" />
    </Slide>
    <Slide title="Exercise 1: find the town judge">
      <p>
        <a href="https://leetcode.com/problems/find-the-town-judge/">Leetcode</a>
      </p>
      <Jupyter>
        {py`
        `}
      </Jupyter>
    </Slide>
    <Slide title="Exercise 2: Find the center of a star graph">
      <p>
        <a href="https://leetcode.com/problems/find-center-of-star-graph/">Leetcode</a>
      </p>
      <Jupyter>
        {py`
        `}
      </Jupyter>
    </Slide>
    <Slide title="Exercise 3: Connecting cities with minimum cost">
      <p>
        <a href="https://leetcode.ca/all/1135.html">Leetcode</a>
      </p>
      <Jupyter>
        {py`
        `}
      </Jupyter>
    </Slide>
    <Slide title="Exercise 4">
      <Exercise>
        <p>
          Given a string {tex`s`} and a set of valid words {tex`D`}, design an algorithm that
          determines if the input string can be segmented into a space-separated sequence of valid
          words.
        </p>
        <p>
          For example, if {tex`D = \{am, are, I, important, is, you\}`} and the input string is
          "Iamimportant", the string can be split into <em>I am important</em>
        </p>
      </Exercise>
      <p>
        Assuming that checking containment in {tex`D`} takes constant time, your algorithm should
        run in {tex`\bigo(n^2)`}.
      </p>
    </Slide>
    <Slide title="Exercise 5: Graphs">
      <Exercise>
        <p>
          Let {tex`G`} be a directed graph, whose edges are coloured either red or blue. We want to
          find the shortest path from some vertex {tex`s`} to some vertex {tex`t`}.
        </p>
        <p>
          One additional constaint: our shortest path must consist of first red edges (though
          potentially 0 of them), and then exclusively blue edges (or 0).
        </p>
      </Exercise>
      <p>Hints:</p>
      <ul>
        <li>Consider the graph {tex`G`} with only the red edges</li>
        <li>Consider the graph {tex`G^T`} with only the blue edges</li>
      </ul>
    </Slide>
    <Slide title="Coloured graphs again">
      <p>
        Consider a connected undirected graph where each edge has an integer weight as well as a
        color which is either red or blue. Give an efficient algorithm to find an MST of the graph
        with the smallest number of red edges. In other words, among all possible MSTs, the
        algorithm should output one that has the least number of red edges. Your algorithm should
        run in time O(|E| log |V |). Prove the correctness of your solution. (Hint: reduce the
        problem to a standard MST problem on weighted graphs without edge colors).
      </p>
    </Slide>
  </Slideshow>
);
