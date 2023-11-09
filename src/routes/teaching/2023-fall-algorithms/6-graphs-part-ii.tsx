import meta from './6-graphs-part-ii.json';

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
          solution={py`
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
          hideUntil={new Date('2023-11-10')}
        >
          {py`
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
          {py`
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
    </Slideshow>
  );
};
