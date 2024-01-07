const meta: Metadata = {
  title: 'Syllabus',
  description: 'Syllabus for the NYU Algorithms course',
}

export const chapters = [
  () => (
    <>
      <hgroup>
        <h2>Chapter 1: Foundations</h2>
        <p>
          Reference: <Cite key="clrs">Chapters 1, 2, 3, 4</Cite>
        </p>
      </hgroup>
      <ul>
        <li>First examples</li>
        <li>Run-time analysis</li>
        <li>{tex`\bigo`}-notation</li>
        <li>Divide and conquer</li>
      </ul>
    </>
  ),
  () => (
    <>
      <hgroup>
        <h2>Chapter 2: Sorting and Order Statistics</h2>
        <p>
          Reference: <Cite key="clrs">Chapters 7, 8, 9</Cite>
        </p>
      </hgroup>
      <ul>
        <li>Comparison sorts</li>
        <li>Counting Sort, Radix sort</li>
        <li>Median and order statistics</li>
      </ul>
    </>
  ),
  () => (
    <>
      <hgroup>
        <h2>Chapter 3: Advanced Design and Analysis Techniques</h2>
        <p>
          Reference: <Cite key="clrs">Chapters 14, 15, 16</Cite>
        </p>
      </hgroup>
      <ul>
        <li>Dynamic Programming: RodCutting, Longest Common Subsequence, Knapsack</li>
        <li>Greedy: Interval scheduling, Huffman Code</li>
      </ul>
    </>
  ),
  () => (
    <>
      <hgroup>
        <h2>Chapter 4: Graph Algorithms</h2>
        <p>
          Reference: <Cite key="clrs">Chapters 22, 23, 24, 25</Cite>
        </p>
      </hgroup>
      <ul>
        <li>Graph: basics</li>
        <li>Classical algorithms: Kruskal, Prim, Dijkstra, Floyd-Warshall, etc.</li>
        <li>P vs NP, NP completeness</li>
      </ul>
    </>
  ),
]

export default () => (
  <Page meta={meta}>
    <For each={chapters}>{(chapter) => chapter()}</For>
  </Page>
)
