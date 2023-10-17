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
    </Slideshow>
  );
};
