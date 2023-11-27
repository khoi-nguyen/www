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
  </Slideshow>
);
