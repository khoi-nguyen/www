import meta from './6-graphs-part-ii.json'

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Single-Source Shortest paths">
        <Problem>
          <p>
            Given a directed graph with nonnegative weights on the edges and a source vertex{' '}
            {tex`s \in V`}, find a shortest path from {tex`s`} to any {tex`v \in V`}.
          </p>
        </Problem>
        <Remark>
          <ul>
            <li>
              We might only care about one pair of vertices, but these problems have the same time
              complexity.
            </li>
            <li>If the weights are all one, this was solved by {tex`BFS`}.</li>
            <li>Later: negative weights with Bellman-Ford.</li>
          </ul>
        </Remark>
      </Slide>
      <Slide title="Animation" split={false}>
        <Iframe src="https://honzaap.github.io/Pathfinding/" />
      </Slide>
      <Slide title="Dijkstra's algorithm: idea">
        <ul>
          <li>Start at {tex`s`}</li>
          <li>Keep a heap with a good guess of the distance</li>
          <li>Go to the next vertex in the queue</li>
          <li>Update distances for the neighbours of that vertex</li>
        </ul>
        <img src="https://www.geeksforgeeks.org/wp-content/uploads/Fig-11.jpg" />
      </Slide>
      <Slide title="Dijkstra's algorithm">
        <Jupyter
          solution={py.raw`
            def dijkstra(V, adj, w, s):
                distances = { u: 0 if s == u else float('inf') for u in V }
                pq = [(0, s)]
                while pq:
                    dist_from_s, u = heapq.heappop(pq)
                    if dist_from_s > distances[current_node]:
                        continue
                    for v in adj[u]:
                        distance = dist_from_s + w[u]
                        if distance < distances[v]:
                            distances[v] = distance
                            heapq.heappush(pq, (distance, v))
                return distances
          `}
          hideUntil={new Date('2023-11-15')}
        >
          {py.raw`
            def dijkstra(V, adj, w, s):
                distances = { u: 0 if s == u else float('inf') for u in V }
                pq = [(0, s)]
                while pq:
                    dist_from_s, u = heapq.heappop(pq)
                    # Skip visited nodes

                    # Push neighbours onto heap and update distances

                return distances
          `}
        </Jupyter>
      </Slide>
      <Slide title="Dijkstra: correctness and complexity">
        {tex`
          \delta(s, v) \defeq \min_{s \rightsquigarrow v} \sum_{e \in \text{edge}(s \rightsquigarrow v)} w(e)
        `}
        <Proposition title="Dijkstra: correctness">
          <p>After a vertex {tex`v`} leaves the queue,</p>
          {tex`
            \text{distances}[v] = \delta(s, v)
          `}
        </Proposition>
        <p>Sketch proof</p>
        <ul>
          <li>Assume we're about to add {tex`u`}</li>
          <li>Shortest path: {tex`s \rightsquigarrow x \to y \rightsquigarrow u`}</li>
          {tex`
            \text{distances}[u] \leq \text{distances}[y] \leq \delta(s, y) \leq \delta(s, u)
          `}
        </ul>
        <Proposition>
          <p>The time complexity is {tex`\bigo((V + E) \log V)`}</p>
        </Proposition>
      </Slide>
      <Slide title="A*">
        <Exercise>
          <p>
            Implement the {tex`A^\star`} algorithm, which brings the following changes to Dijkstra:
          </p>
          <ul>
            <li>Stop as soon as we've reached our goal</li>
            <li>
              Instead of pushing the distance to the heap, use
              {tex`
                \text{dist}(v) + \text{heuristic}(v)
              `}
            </li>
          </ul>
        </Exercise>
        <p>Apply A* to the graph below:</p>
        <Editor>
          {py.raw`
            V = ['JFK', 'SFO', 'ORL', 'LAX', 'DFW']
            adj = {
              'JFK': [('SFO',1), ('LAX',2)],
              'SFO': [('ORL',2)],
              'ORL': [('JFK',3), ('LAX',1), ('DFW',2)],
              'LAX': [('DFW',2)],
              'DFW': [],
            }
          `}
        </Editor>
      </Slide>
      <Slide title="Exercises: A*">
        <Exercise>
          <p>How would you find the actual shortest path?</p>
          <p>Define a heuristic to avoid a particular airport</p>
        </Exercise>
        <Exercise>
          <p>Why doesn't the algorithm work for negative weights?</p>
        </Exercise>
      </Slide>
      <Slide title="Exercises">
        <Iframe src="https://cims.nyu.edu/~regev/teaching/basic_algorithms_spring_2022/hw12.pdf" />
      </Slide>
      <Slide title="Dijkstra: recap">
        <Youtube src="https://www.youtube.com/watch?v=EFg3u_E6eHU" zoom={2} />
      </Slide>
      <Slide title="Bellman-Ford">
        <p>
          Dijkstra is an efficient algorithm if the weights associated with the edges are{' '}
          <strong>nonnegative</strong>.
        </p>
        <img
          src="https://cdn.programiz.com/sites/tutorial2program/files/Bellman-Ford-Algorithm-1.png"
          width="100%"
        />
        <Example>
          <p>
            Apply Dijkstra to this graph (we'll apply Bellman-Ford afterwards) with {tex`A`} as a
            starting point
          </p>
        </Example>
      </Slide>
      <Slide title="Bellman-Ford: implementation">
        <Exercise>
          <p>
            Implement Bellman-Ford to find the length of the shortest path. What's its time
            complexity?
          </p>
        </Exercise>
        <Jupyter
          solution={py.raw`
            def bellman_ford(V, E, s):
                d = { u: 0 if u == s else float('inf') for u in V }
                for i in range(len(V) - 1):
                    for u, v, w in E:
                        # Relax edge
                        dist_via_u = d[u] + w
                        if dist_via_u < dist[v]:
                            d[v] = dist_via_u
                return d
          `}
          hideUntil={new Date('2023-11-17')}
        >
          {py.raw`
            def bellman_ford(V, E, s):
                d = { u: 0 if u == s else float('inf') for u in V }
                for i in range(len(V) - 1):
                    for u, v, w in E:
                        pass
                return d
          `}
        </Jupyter>
        <Exercise>
          <p>How would you get the actual path as well?</p>
        </Exercise>
      </Slide>
      <Slide title="Bellman-Ford: correctness">
        <Theorem title="Correctness of Bellman-Ford">
          <p>
            Assume {tex`G`} has no negative-weight cycles that are reachable from {tex`s`}.
          </p>
          <p>At the end of the algorithm,</p>
          {tex`
            d[v] = \delta(s, v).
          `}
          <p>
            for all vertices {tex`v`} that are reachable from {tex`s`}.
          </p>
        </Theorem>
        <h4>Sketch proof</h4>
        <ul>
          <li>
            Let {tex`\underbrace{v_0}_s, v_1, \dots, v_{k - 1}, \underbrace{v_k}_{v}`} be a shortest
            path.
          </li>
          <li>{tex`k \leq \abs V - 1`}</li>
          <li>
            <strong>Loop invariant</strong>: at the beginning of each iteration
            {tex`
              d[v_0] = \delta(s, v_0) \quad
              d[v_1] = \delta(s, v_1) \quad
              \dots \quad
              d[v_i] = \delta(s, v_i)
            `}
          </li>
        </ul>
      </Slide>
      <Slide title="Detecting negative-weight cycles">
        <Proposition>
          <p>
            A graph contains a negative cycle reachable from {tex`s`} if and only if one edge can be
            relaxed at the end of Bellman-Ford.
          </p>
        </Proposition>
        <h4>Sketch proof</h4>
        <ul>
          <li>{tex`\Leftarrow`}: previous correctness result</li>
          <li>
            {tex`\Rightarrow`}:
            {tex`
              \begin{align*}
                \sum_{i = 1}^k d[v_i] &\leq \sum_{i = 1}^k \left(d[v_{i - 1}] + w(v_{i - 1}, v_i)\right)\\
              \end{align*}
            `}
          </li>
        </ul>
      </Slide>
      <Slide title="Detecting negative-weight cycles: implementation">
        <Exercise>
          <p>
            Change your Bellman-Ford code so that it detects negative cycle reachable from the
            source
          </p>
        </Exercise>
        <Jupyter
          solution={py.raw`
            def bellman_ford(V, E, s):
                d = { u: 0 if u == s else float('inf') for u in V }
                for i in range(len(V) - 1):
                    for u, v, w in E:
                        # Relax edge
                        dist_via_u = d[u] + w
                        if dist_via_u < dist[v]:
                            d[v] = dist_via_u
                return d
          `}
          hideUntil={new Date('2023-11-17')}
        >
          {py.raw`
            def bellman_ford(V, E, s):
                pass
          `}
        </Jupyter>
      </Slide>
      <Slide title="Exercises">
        <Iframe src="https://cims.nyu.edu/~regev/teaching/basic_algorithms_spring_2022/hw12.pdf" />
      </Slide>
      <Slide title="All Pairs Shortest Paths">
        <Problem>
          <p>
            Find the shortest path between <strong>all pairs</strong> of vertices
          </p>
        </Problem>
        <Question>
          <p>
            What would the time complexities be if we applied Bellman-Ford or Dijkstra and iterate
            through all vertices for the source node?
          </p>
        </Question>
        <p>
          We'll try to use <strong>dynamic programming</strong> to get a better time complexity.
        </p>
      </Slide>
      <Slide title="1st attempt: guess next-to-last vertex">
        <dl>
          <dt>Subproblem</dt>
          <dd>
            <code>DP(u, v, k)</code>: length of shortest path {tex`u \rightsquigarrow v`} using at
            most {tex`k`} edges
          </dd>
          <dt>Guess</dt>
          <dd>Next-to-last vertex</dd>
          <dt>Base cases</dt>
          <dd>{tex`\text{DP}(u, v, 0) = \begin{cases}0 &\text{if } u = v \\ +\infty\end{cases}`}</dd>
          <dt>Recurrence</dt>
          <dd>
            {tex`
              \text{DP}(u, v, k) = \min\left\{
                \text{DP}(u, v, k - 1),
                \min_{y \in V} \left[ DP(u, y, k - 1) + w(y, v) \right]
              \right\}
            `}
          </dd>
        </dl>
      </Slide>
      <Slide title="Python implementation of the first attempt">
        <Jupyter
          solution={py.raw`
            cache = {}
            V = [] # set of vertices
            def APSP(u, v, k):
                if (u, v, k) in cache:
                    return cache[(u, v, k)]
                if k == 0:
                    ans = 0 if u == v else float('inf')
                else:
                    ans = APSP(u, v, k - 1)
                    for y in V:
                        ans = min(ans, APSP(u, y, k-1) + w[y, v])
                cache[(u, v, k)] = ans
                return ans
          `}
          hideUntil={new Date('2023-11-18')}
        >
          {py.raw`
            cache = {}
            def APSP(u, v, k):
                if (u, v, k) in cache:
                    return cache[(u, v, k)]
                # Base cases
                # Recursion
                # Caching & return
          `}
        </Jupyter>
        <Exercise>
          <p>What is the time complexity?</p>
        </Exercise>
      </Slide>
      <Slide title="Combining DP and D&C">
        <Question>
          <p>
            What if we guess the middle vertex instead of the penultimate? What would the time
            complexity be?
          </p>
        </Question>
      </Slide>
      <Slide title="Floyd-Warshall">
        <p>
          Before, <code>APSP(u, v, k)</code> added the constraint that the SP used at most {tex`k`}{' '}
          edges. The guessing part is {tex`\bigo(V)`}.
        </p>
        <Idea>
          <p>
            <code>FW(u, v, k)</code>: minimum weight of a path via first {tex`k`} vertices.
          </p>
        </Idea>
        <Fragment>
          <dl>
            <dt>Subproblem</dt>
            <dd>
              <code>FW(u, v, k)</code>: minimum weight of path via first {tex`k`} vertices
            </dd>
            <dt>Guess</dt>
            <dd>Should we include the {tex`(k+1)`}th vertex?</dd>
            <dt>Base cases</dt>
            <dd>
              {tex`
                \text{FW}(u, u, k) =
              `}
              {tex`
                \text{FW}(u, v, 0) =
                \begin{cases}
                  \\ \\
                \end{cases}
              `}
            </dd>
            <dt>Recursion</dt>
            <dd>
              {tex`
                \text{FW}(u, v, k) = \qquad \qquad \\ \qquad
              `}
            </dd>
            <dt>Time complexity</dt>
            <dd>
              <p></p>
            </dd>
          </dl>
        </Fragment>
      </Slide>
      <Slide title="Python implementation of Floyd-Warshall">
        <Jupyter
          solution={py.raw`
            V = []
            adj = {}
            w = {} # w[(u, v)]
            def FW(u, v, k):
                if (u, v, k) in cache:
                    return cache[(u, v, k)]
                if u == v:
                    weight = 0
                elif k == 0:
                    weight = w[(u,v)] if (u, v) in w else float("inf")
                else:
                    weight = FW(u, k, k - 1) + FW(k, v, k - 1)
                    weight = min(weight, FW(u v, k - 1))
                cache[(u, v, k)] = weight
                return weight
          `}
          hideUntil={new Date('2023-11-18')}
        >
          {py.raw`
            V = []
            adj = {}
            w = {} # w[(u, v)]
            def FW(u, v, k):
                pass
          `}
        </Jupyter>
      </Slide>
    </Slideshow>
  )
}
