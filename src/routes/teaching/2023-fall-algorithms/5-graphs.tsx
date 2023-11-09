import meta from './5-graphs.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Graphs">
        <Definition title="Graph">
          <p>An undirected graph is a set {tex`G = V \times E`} where</p>
          {tex`
            E \subset \{ \{v, w\} : v, w \in V \}
          `}
        </Definition>
        <Remark pluralize>
          <ul>
            <li>
              The elements of V are called <em>vertices</em>
            </li>
            <li>
              The elements of E are called <em>edges</em>
            </li>
            <li>
              If instead {tex`E \subset \{ (v, w) : v, w \in V \}`}, the graph is called{' '}
              <strong>directed</strong>
            </li>
          </ul>
        </Remark>
      </Slide>
      <Slide title="Adjacency matrix">
        <Definition title="Adjacency matrix">
          <p>Assume {tex`V = \{1, \dots, n\}`}</p>
          {tex`
            a_{ij} =
            \begin{cases}
              1 & \text{if there's an edge from } i { to } j\\
              0 & \text{otherwise}
            \end{cases}
          `}
        </Definition>
      </Slide>
      <Slide title="Random browsing">
        <ul>
          <li>Each page has the same probability of being the start page</li>
          <li>
            There is <strong>at most one</strong> link from one page to any other
          </li>
          <li>On each page, each link has the same probability of being clicked</li>
          <li>If there are no links, the next page can be any page with equal probability</li>
        </ul>
        <div class="has-text-centered">
          <img
            src="https://pi.math.cornell.edu/~mec/Winter2009/RalucaRemus/Lecture3/Images/graf1.PNG"
            style="width: 60%"
          />
        </div>
      </Slide>
      <Slide title="Ranking webpages">
        <ul>
          <li>{tex`X_k`}: k-th page visited</li>
          <li>
            {tex`\P(X_k = i)`}: probability that the k-th page is page {tex`i`}
          </li>
        </ul>
        <Idea>
          <p>
            If {tex`k`} is small, {tex`\P(X_k = i)`} depends too much on {tex`X_0`}. A good way to
            measure the popularity of page {tex`i`} would be
          </p>
          {tex`
            p_i \defeq \lim_{k \to +\infty} \P(X_k = i)
          `}
        </Idea>
      </Slide>
      <Slide title="Rank and PageRank">
        {tex`
          \bvec p^{(k)} \defeq \begin{pmatrix}
          \P(X_k = 1)\\
          \P(X_k = 2)\\
          \vdots\\
          \P(X_k = n - 1)\\
          \P(X_k = n)\\
          \end{pmatrix}
        `}
        <Definition title="PageRank vector">
          {tex`
            \bvec p^{(\infty)} = \lim_{k \to +\infty} \bvec p^{(k)}
          `}
        </Definition>
      </Slide>
      <Slide title="Transition Matrix">
        {tex`
          T_{ij} \defeq \P(X_{k + 1} = i | X_k = j)
        `}
        <div class="has-text-centered">
          <img
            src="https://pi.math.cornell.edu/~mec/Winter2009/RalucaRemus/Lecture3/Images/graf2.PNG"
            style="width: 80%"
          />
        </div>
      </Slide>
      <Slide title="Properties of the transition matrix">
        <Proposition>
          {tex`
            \bvec p^{(k + 1)} = \mat T \bvec p^{(k)}
          `}
        </Proposition>
        <Corollary>
          <p>The PageRank vector satisfies</p>
          {tex`
            \bvec p^{(\infty)} = \mat T \bvec p^{(\infty)}
          `}
        </Corollary>
      </Slide>
      <Slide title="Weakness of naive PageRank">
        <div class="has-text-centered">
          <img
            src="https://www.cs.cornell.edu/~rafael/networks-html/images/Figure15-1.png"
            style="width: 80%"
          />
          <img
            src="https://www.cs.cornell.edu/~rafael/networks-html/images/Figure15-2.png"
            style="width: 80%"
          />
        </div>
        <Question>
          <p>What's the issue with the above graphs? How would you fix it?</p>
        </Question>
      </Slide>
      <Slide title="PageRank algorithm">
        <Idea>
          <p>
            Approximate {tex`\bvec p^{(\infty)} \approx \bvec p^{(k)}`} for some large {tex`k`} via
          </p>
          {tex`
          \bvec p^{(k + 1)} = \mat T \bvec p^{(k)}
        `}
        </Idea>
        <Exercise>
          <p>
            Implement it on{' '}
            <a href="https://urbain.vaes.uk/static/teaching/numerical_analysis/misc/data_hw7.tar.gz">
              this dataset
            </a>
          </p>
          <p>Show the ten highest ranked pages.</p>
        </Exercise>
      </Slide>
      <Slide title="PageRank: solution" columns>
        <Editor>
          {py`
            import pandas as pd
            from scipy import sparse
            from numpy import array, sqrt, argmax
            import numpy as np

            websites = pd.read_csv('names.csv')
            links = pd.read_csv('edges.csv')
            N = len(websites)

            link_count= {}
            for node in links.FromNode:
                if node in link_count:
                    link_count[node] =+ 1
                else:
                    link_count[node] = 1
          `}
        </Editor>
        <Editor>
          {py`
            # Adjacency matrix
            I, J, V = [], [], []
            for link in links.iterrows():
                if len(link) < 1:
                    break
                from_node = link[1].FromNode
                to_node = link[1].ToNode
                if from_node < N and to_node < N:
                    J.append(from_node)
                    I.append(to_node)
                    V.append(1. / link_count[from_node])
            T = sparse.coo_matrix((V, (I, J)), shape=(N, N))

            # PageRank
            norm_squared = lambda x: x.dot(x)
            x = array([1./N for n in range(N)])
            while norm_squared(T @ x - x) / norm_squared(x) > 10**(-15):
                x = T @ x

            # Displaying results
            for i in reversed(np.argsort(x)[-10:]):
                print(websites.Name[i - 1])
          `}
        </Editor>
      </Slide>
      <Slide title="Graph Exploration">
        <Question>
          <p>From a given set of nodes, which vertices can I reach?</p>
        </Question>
        <ul>
          <li>Web crawling</li>
          <li>Social networking</li>
          <li>Network Broadcast</li>
          <li>Garbage collection</li>
        </ul>
      </Slide>
      <Slide title="Adjacency list">
        <Definition title="Adjacency list">
          {tex`
            \text{Adj}[u] = \{v \in V | (u, v) \in E\}
          `}
        </Definition>
        <Question>
          <p>How much space does that representation required?</p>
          <p>{tex`\bigtheta(V + E)`}</p>
        </Question>
      </Slide>
      <Slide title="Adjacency list/matrix">
        <Iframe src="https://visualgo.net/en/graphds" />
      </Slide>
      <Slide title="Breadth-first search">
        <ul>
          <li>Visit all the nodes reachable from a given node {tex`s \in V`}</li>
          <li>We want to achieve {tex`\bigo(V + E)`} time</li>
          <li>Look at nodes reachable in {tex`0, 1, 2, \dots`} moves</li>
          <li>Careful to avoid duplicates (otherwise running time could be infinite)</li>
        </ul>
      </Slide>
      <Slide title="Breadth-First Search">
        <Exercise>
          <p>Write an algorithm that perform breadth-first search from a given source node s.</p>
        </Exercise>
        <Editor>
          {py`
            V = [0, 1, 2]
            Adj = {
              0: [1, 2],
              1: [2],
            }
            def BFS(s, Adj):
              level = {s: 0}
              i = 1
              frontier = [s]
              while frontier:
                  next = []
                  for u in frontier:
                      for v in Adj[u]:
                          if v not in level:
                              level[v] = i
                              next.append(v)
                  frontier = next
                  i += 1
          `}
        </Editor>
      </Slide>
      <Slide title="Shortest paths">
        <Exercise title="Shortest paths">
          <p>
            Change the BFS algorithm so that you can keep track of a shortest path from s to any
            node.
          </p>
          <Editor
            solution={py`
              def BFS(s, Adj):
                level = {s: 0}
                i = 1
                frontier = [s]
                parent = {s: None}
                while frontier:
                    next = []
                    for u in frontier:
                        for v in Adj[u]:
                            if v not in level:
                                level[v] = i
                                next.append(v)
                                parent[v] = u
                    frontier = next
                    i += 1
            `}
            hideUntil={new Date('2023-10-20')}
          >
            {py`
              def BFS(s, Adj):
                level = {s: 0}
                i = 1
                frontier = [s]
                while frontier:
                    next = []
                    for u in frontier:
                        for v in Adj[u]:
                            if v not in level:
                                level[v] = i
                                next.append(v)
                    frontier = next
                    i += 1
            `}
          </Editor>
        </Exercise>
      </Slide>
      <Slide title="Running Time">
        <Proposition>
          {tex`
            \sum_{v \in V} |\text{Adj}[v]| = \bigtheta(E)
          `}
        </Proposition>
      </Slide>
      <Slide title="Depth-first search">
        <ul>
          <li>Recursively explore graph, backtracking as necessary</li>
          <li>Careful not to repeat</li>
        </ul>
        <Exercise>
          <p>Implement DFS, when you're given the set of vertices and an adjacency list.</p>
        </Exercise>
        <Editor
          solution={py`
            parent = {}

            def DFS_visit(Adj, s):
                for v in Adj[s]:
                    if v not in parent:
                        parent[v] = s
                        DFS_visit(Adj, u)

            def DFS(V, Adj):
              for s in V:
                  if s not in parent:
                      parent[s] = None
                      DFS_visit(Adj, s)
          `}
        >
          {py`
          `}
        </Editor>
      </Slide>
      <Slide title="DFS: Running time">
        <Proposition>
          <p>The Running time of DFS is {tex`\bigtheta (V + E)`}</p>
        </Proposition>
      </Slide>
      <Slide title="Exercise: Sudoku solving">
        <Exercise title="Sudoku Solving">
          <p>
            Sudoku is a puzzle where you're given a 9 by 9 grid partially filled with digits. The
            objective is to fill the grid subject to the constraint that every row, column, and box
            (3 by 3 subgrid) must contain all of the digits from 1 to 9.
          </p>
        </Exercise>
      </Slide>
      <Slide title="Exercise: N queens problem">
        <Iframe src="https://en.wikipedia.org/wiki/Eight_queens_puzzle" />
      </Slide>
      <Slide title="Recall: DFS">
        <ul>
          <li>Recursively explore graph, backtracking as necessary</li>
          <li>Careful not to repeat</li>
        </ul>
        <Editor>
          {py`
            parent = {}

            def DFS_visit(Adj, s):
                for v in Adj[s]:
                    if v not in parent:
                        parent[v] = s
                        DFS_visit(Adj, u)

            def DFS(V, Adj):
              for s in V:
                  if s not in parent:
                      parent[s] = None
                      DFS_visit(Adj, s)
          `}
        </Editor>
      </Slide>
      <Slide title="Sudoku: solution" split={false}>
        <Jupyter>
          {py`
            def sudoku(grid):
                if 0 not in grid:
                    return grid
                n = grid.index(0)
                for i in range(1, 10):
                    grid[n] = i
                    if valid_so_far(grid):
                        result = sudoku(grid)
                        if 0 not in result:
                            return result
                    grid[n] = 0
                return grid
            box_positions = [9 * (3 * i) + 3 * j for i in range(3) for j in range(3)]
            def valid_so_far(grid):
                for i in range(9):
                    if has_duplicates([grid[9 * i + j] for j in range(9)]):
                        return False
                    if has_duplicates([grid[9 * j + i] for j in range(9)]):
                        return False
                    indices = [0, 1, 2, 9, 10, 11, 18, 19, 20]
                    if has_duplicates([grid[box_positions[i] + j] for j in indices]):
                        return False
                return True
            def has_duplicates(numbers):
                nonzero = [x for x in numbers if x > 0]
                return len(nonzero) != len(set(nonzero))
            print(sudoku(81*[0])
          `}
        </Jupyter>
      </Slide>
      <Slide title="Edge classification">
        <ul>
          <li>Tree edge: visit new vertex via edge</li>
          <li>Forward edge: node to descendant in a tree but not a tree edge</li>
          <li>Backward edge: node to ancestor in tree, indicate a cycle</li>
          <li>Cross edge: between two non-ancestor related vertices</li>
        </ul>
        <Question>
          <p>How can we know what type of edge {tex`(u, v)`} is?</p>
        </Question>
        <ul>
          <li>Tree edges: {tex`v`} is white when we explore edge</li>
          <li>Forward edge: {tex`v`} is black when we explore edge</li>
          <li>Back edge: {tex`v`} is gray when we explore edge</li>
          <li>Cross edge: {tex`v`} is black when we explore edge</li>
        </ul>
      </Slide>
      <Slide title="Edge classification in undirected graphs">
        <Proposition>
          <p>In an undirected graph, every edge is either a tree or a backedge.</p>
        </Proposition>
        <Corollary>
          <p>An undirected graph is acyclic if and only if there are no back edges</p>
        </Corollary>
      </Slide>
      <Slide title="Acyclic directed graphs">
        <Proposition>
          <p>A directed graph is acyclic if and only if there are no back edges.</p>
        </Proposition>
      </Slide>
      <Slide title="Topological Sort">
        <Problem>
          <p>
            Given a directed acyclic graph, "sort" the vertices in such a way that the edges are
            always pointing to the right.
          </p>
        </Problem>
        <p>Applications include:</p>
        <ul>
          <li>Building software</li>
          <li>Job scheduling</li>
          <li>Select courses with prerequisites</li>
        </ul>
      </Slide>
      <Slide title="Topological sort: example">
        <img
          src="https://www.interviewcake.com/images/svgs/directed_graph__example_2.svg?bust=210"
          style={{ width: '80%' }}
        />
      </Slide>
      <Slide title="Topological sort: algorithm and proof of correctness">
        <ul>
          <li>Run DFS</li>
          <li>Output vertices in decreasing order of finish time</li>
        </ul>
        <Proposition>
          <p>If {tex`(u, v) \in E`}, then</p>
          {tex`
            u.f \geq v.f
          `}
        </Proposition>
      </Slide>
      <Slide title="Topological sort: implementation">
        <Exercise>
          <p>Modify DFS to implement topological sort</p>
        </Exercise>
        <Editor
          solution={py`
            parent = {}
            topologically_sorted = []

            def DFS_visit(Adj, s):
                for v in Adj[s]:
                    if v not in parent:
                        parent[v] = s
                        DFS_visit(Adj, u)
                topologically_sorted.append(s)

            def DFS(V, Adj):
              for s in V:
                  if s not in parent:
                      parent[s] = None
                      DFS_visit(Adj, s)
          `}
          hideUntil={new Date('2023-10-25')}
        >
          {py`
            parent = {}

            def DFS_visit(Adj, s):
                for v in Adj[s]:
                    if v not in parent:
                        parent[v] = s
                        DFS_visit(Adj, u)

            def DFS(V, Adj):
              for s in V:
                  if s not in parent:
                      parent[s] = None
                      DFS_visit(Adj, s)
          `}
        </Editor>
      </Slide>
      <Slide title="Exercices">
        <ul>
          <li>
            <a href="https://leetcode.com/problems/course-schedule">Course Schedule</a>
          </li>
          <li>
            <a href="https://leetcode.com/problems/course-schedule-ii">Course Schedule II</a>
          </li>
        </ul>
      </Slide>
      <Slide title="Strongly Connected Component">
        <Definition title="Strongly connected component">
          <p>
            Let {tex`G = (V, E)`} be a directed graph. A subset {tex`C \subset V`} is a{' '}
            <strong>strongly connected component</strong> if for every pair {tex`u, v \in C`}, there
            is a path from {tex`u`} to {tex`v`} and from {tex`v`} to {tex`u`}.
          </p>
        </Definition>
        <Definition title="Component graph">
          <p>
            Let {tex`G = (V, E)`} be a directed graph with connected connected{' '}
            {tex`C_1, \dots, C_n`}. The component graph is the graph
          </p>
          {tex`
            \{C_i : 1 \leq i \leq n\} \times \{(C_i, C_j) : 1 \leq i, j \leq n \text{ and there's a path between } C_i \text{ and } C_j\}
          `}
        </Definition>
      </Slide>
      <Slide title="Strongly connected components">
        <Problem>
          <p>Given a directed graph G, find its connected components</p>
        </Problem>
        <Remark>
          <ul>
            <li>
              DFS-Visit will always visit <em>at least</em> the connected component of the starting
              point, but might visit other connected components too.
            </li>
            <li>
              Between two strongly connected components, there's a one-way bridge between them.
            </li>
          </ul>
        </Remark>
      </Slide>
      <Slide title="Transpose graph">
        <Definition title="Transpose graph">
          <p>
            Let {tex`G = (V, E)`} be a graph. Its <em>transpose graph</em> is the graph
          </p>
          {tex`
            V \times \{ (v, u) : (u, v) \in E \}
          `}
        </Definition>
        <div class="has-text-centered">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Amirali_reverse.jpg" />
        </div>
        <Question>
          <p>
            Why is it called the transpose graph? What happens to the{' '}
            <strong>adjacency matrix</strong> when we transpose the graph?
          </p>
        </Question>
        <Exercise>
          <p>
            Write a Python code that transforms a graph (given via an adjacency list) to its
            transpose.
          </p>
        </Exercise>
      </Slide>
      <Slide title="Strongly connected components: algorithm">
        <ol>
          <li>Topological sort the edges of the graphs</li>
          <li>Transpose the graph</li>
          <li>Run DFS visit on unvisited nodes in the order given in Step I.</li>
        </ol>
        <Exercise>
          <p>Implement it</p>
        </Exercise>
      </Slide>
      <Slide title="Strongly connected components: proof of correctness">
        <Proposition>
          <p>
            Assume that {tex`S_1, \dots, S_n`} are the strongly connected components of a graph{' '}
            {tex`G = (V, E)`} in the order given by the SCC algorithm.
          </p>
          <p>
            If {tex`s \in S_i`}, then DFS-Visit will only reach the vertices in{' '}
            {tex`S_1, \dots, S_i`} in the transpose of {tex`G`}.
          </p>
        </Proposition>
        <Corollary>
          <p>The SSC algorithm is correct.</p>
        </Corollary>
      </Slide>
      <Slide title="Weighted graph">
        <Definition>
          <p>
            A graph {tex`G = (V, E)`} is <strong>weighted</strong> if it's given with a function{' '}
            {tex`w : E \to \R`}.
          </p>
        </Definition>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Weighted_network.svg/1024px-Weighted_network.svg.png" />
      </Slide>
      <Slide title="Minimum spanning tree">
        <Problem>
          <p>
            Given an undirected weighted and connected graph {tex`((V, E), w)`}, find a spanning
            subtree {tex`T \sub E`} with smallest total weight.
          </p>
        </Problem>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Minimum_spanning_tree.svg/1024px-Minimum_spanning_tree.svg.png"
          height={600}
        />
      </Slide>
      <Slide title="Edge contraction">
        <Definition title="Edge contraction">
          <p>{tex`G / e`}: Remove edge and merge the vertices it previously joined</p>
        </Definition>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Edge_contraction.svg"
          height={400}
        />
        <Question>
          <p>What did we do about common neighbours?</p>
        </Question>
      </Slide>
      <Slide title="Dynamic programming solution">
        <ol>
          <li>
            <strong>Guess edge {tex`e`} in a MST</strong>
          </li>
          <li>Contract {tex`e`}</li>
          <li>Recurse</li>
          <li>
            Decontract {tex`e`} and add {tex`e`} to MST
          </li>
        </ol>
        <Remark title="Greedy">
          <p>We will remove the guessing part by proving that the greedy choice is optimal</p>
        </Remark>
        <Question>
          <p>What's the time complexity?</p>
        </Question>
      </Slide>
      <Slide title="Correctness of the DP algorithm">
        <Proposition>
          <p>
            Assume {tex`e`} belongs to some MST {tex`T^*`} of {tex`G`}. If {tex`T'`} is a MST of{' '}
            {tex`G / e`}, then {tex`T' \cup \{e\}`} is a MST of G
          </p>
        </Proposition>
        <p>Sketch proof</p>
        {tex`
          \begin{align*}
            w(T' \cup \{e\}) &= w(T') + w(e)\\
            &\leq w(T^* \setminus \{e\}) + w(e) = w(T^*)
          \end{align*}
        `}
      </Slide>
      <Slide title="Definitions">
        <ul>
          <li>Cut: partition of the vertices in two sets {tex`(S, V \setminus S)`}</li>
          <li>
            Edge {tex`(u, v)`} <strong>crosses cut</strong> {tex`S`} if{' '}
            {tex`u \in S, v \in V \setminus S`} or vice-versa.
          </li>
          <li>
            Cut <strong>respects</strong> {tex`A`} if no edge in {tex`A`} crosses the cut.
          </li>
          <li>
            <strong>light edge crossing a cut</strong>: minimal weight of any edge entering the cut.
          </li>
        </ul>
      </Slide>
      <Slide title="Criterion for safe edge">
        <p>The greedy choice works.</p>
        <Proposition>
          <p>Assume {tex`A \subset E`} is a subset of some MST.</p>
          <p>
            If {tex`S`} is a cut respecting {tex`A`} and {tex`(u, v)`} is a light edge crossing{' '}
            {tex`(S, V \setminus S)`}, then {tex`(u, v)`} is also part of some MST.
          </p>
        </Proposition>
        <p>We've reduced guessing an edge to using a particular cut respecting {tex`A`}.</p>
      </Slide>
      <Slide title="Greedy Generic MST algorithm">
        <pre>
          {py`
            A = {}
            while A is not spanning:
                find safe edge e
                A.add(e)
            return A
          `}
        </pre>
        <p>We'll see: Prims, Kruskal</p>
      </Slide>
      <Slide title="Prim's Algorithm: Idea">
        <ul>
          <li>Start at vertex {tex`s`}</li>
          <li>
            Cut will be the <strong>visited vertices</strong>
          </li>
          <li>
            Maintain a priority queue containing <strong>crossing edges</strong>. Prioritize lighter
            edges.
          </li>
        </ul>
        <Example>
          <p>Find the MST of the following graph</p>
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230223140007/mstdrawio.png" />
        </Example>
      </Slide>
      <Slide title="Prim's Algorithm: Python implementation">
        <Jupyter
          solution={py`
            import heapq
            def MST(V, adj):
                pq = [] # (weight, vertex)
                visited = [False] * len(V)
                total_weight = 0
                heapq.heappush(pq, (0, 0))
                while pq:
                    w, u = heapq.heappop(pq)
                    if visited[u]:
                        continue
                    total_weight += w
                    visited[u] = True
                    for v, w in adj[u]:
                        if not visited[v]:
                            heapq.heappush(pq, (w, v))
                return total_weight
          `}
        >
          {py`
            import heapq
            def MST(V, adj):
                pq = [] # (weight, vertex)
                visited = [False] * len(V)
                total_weight = 0
                return total_weight
          `}
        </Jupyter>
        <Question>
          <p>How would we get the tree itself?</p>
        </Question>
      </Slide>
      <Slide title="Prim: Time complexity">
        <Proposition>
          <p>The time complexity of this algorithm is {tex`\bigo((V + E) \log V)`}</p>
        </Proposition>
        {tex`
          V \times \left(
            \bigo(1) +
            \underbrace{\bigo(V \log V)}_{\text{pop}}
            + \underbrace{\bigo(E \log V)}_{\text{push}}
          \right)
        `}
      </Slide>
      <Slide title="Kruskal's algorithm">
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20210727035309/UntitledDiagram92.png"
          width="100%"
        />
      </Slide>
      <Slide title="Union-Find structure">
        <Idea>
          <p>Keep track of connected components</p>
        </Idea>
        <p>We'll need two operations to apply Kruskal</p>
        <ul>
          <li>
            <strong>Union</strong>: unites two components
          </li>
          <li>
            <strong>Find</strong>: finds an element's component
          </li>
        </ul>
      </Slide>
      <Slide title="Union-Find structure: Python implementation">
        <Jupyter>
          {py`
            class UnionFind:
                def __init__(self, n):
                    self.parent = list(range(n))

                def find(self, x):
                    if self.parent[x] != x:
                        self.parent[x] = self.find(self.parent[x])
                    return self.parent[x]

                def union(self, x, y):
                    root_x = self.find(x)
                    root_y = self.find(y)
                    if root_x != root_y:
                        self.parent[root_x] = root_y
          `}
        </Jupyter>
      </Slide>
      <Slide title="Kruskal's implementation">
        <Jupyter
          before={py`
            class UnionFind:
                def __init__(self, n):
                    self.parent = list(range(n))

                def find(self, x):
                    if self.parent[x] != x:
                        self.parent[x] = self.find(self.parent[x])
                    return self.parent[x]

                def union(self, x, y):
                    root_x = self.find(x)
                    root_y = self.find(y)
                    if root_x != root_y:
                        self.parent[root_x] = root_y
          `}
          solution={py`
            def kruskal(edges, n):
                edges.sort(key=lambda edge: edge[2])
                mst = []
                uf = UnionFind(n)

                for edge in edges:
                    u, v, weight = edge
                    if uf.find(u) != uf.find(v):
                        mst.append(edge)
                        uf.union(u, v)
                return mst
          `}
          hideUntil={new Date('2023-11-09')}
        >
          {py`
            def kruskal(edges, n):
                pass
          `}
        </Jupyter>
      </Slide>
      <Slide title="Kruskal: correctness">
        <Proposition title="Kruskal: correctness">
          <p>Kruskal's algorithm gives a MST.</p>
        </Proposition>
      </Slide>
    </Slideshow>
  );
};
