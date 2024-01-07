const meta: Metadata = {
  title: 'Chapter 6: P vs NP',
  description: 'Classification and reductions',
}

export default () => (
  <Slideshow meta={meta}>
    <Slide title="Introduction: the Travelling Salesman Problem">
      <Problem>
        <p>
          Given a list of cities and the distances between each pair of cities, what is the shortest
          possible route that visits each city exactly once and returns to the origin city?
        </p>
      </Problem>
      <Remark>
        <p>
          No polynomial algorithm exists to solve this problem. If someone could find one, it would
          solve one of the most important open problems in Computer Science. The consequences would
          be huge.
        </p>
      </Remark>
      <Jupyter>
        {py.raw`
          from math import factorial
          factorial(14)
        `}
      </Jupyter>
    </Slide>
    <Slide title="P vs NP">
      <Definition title="P">
        {tex`
          \text P = \{\text{Problems solvable in poly time}\}
        `}
      </Definition>
      <p>All the problems (excluding Knapsack) that we've seen so far are in {tex`P`}.</p>
      <Definition title="NP">
        {tex`
          \begin{align*}
            \text {NP} = \{ \text{Decision problems involving poly-size guesses} \\
            \text{and verifiable in poly time for YES} \}
          \end{align*}
        `}
      </Definition>
      <p>Here comes the millon dollar question:</p>
      <Question>
        <p>Does P equal NP?</p>
      </Question>
    </Slide>
    <Slide title="Millenium Prize Problems">
      <Iframe src="https://www.claymath.org/millennium-problems/" />
    </Slide>
    <Slide title="NP-hard">
      <Definition title="Reduction">
        <p>
          A problem {tex`A`} <strong>reduces</strong> to {tex`B`} ({tex`A \leq B`}) if there is a
          polytime algorithm converting {tex`A`} inputs to equivalent {tex`B`} inputs.
        </p>
      </Definition>
      <Definition title="NP-hard">
        <p>
          A problem {tex`X`} is NP-hard if every NP problem reduces to {tex`X`}
        </p>
      </Definition>
      <Definition title="NP-complete">
        <p>A problem {tex`X`} is NP-complete if it's NP and NP-hard.</p>
      </Definition>
    </Slide>
    <Slide title="Classification">
      <p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/P_np_np-complete_np-hard.svg/1920px-P_np_np-complete_np-hard.svg.png"
          width="100%"
        />
      </p>
    </Slide>
    <Slide title="3SAT">
      <Problem>
        <p>Given a boolean formula such as</p>
        {tex`
          (x_1 \lor x_3 \lor \overline{x_6}) \land (x_2 \lor \overline{x_3} \lor x_7) \land \dots
        `}
        <p>
          can you find values of {tex`x_1, \dots, x_{k} \subset \{\text{true}, \text{false}\}`} for
          which the expression is true.
        </p>
      </Problem>
      <Theorem>
        <p>The 3SAT problem is NP-hard.</p>
      </Theorem>
    </Slide>
    <Slide title="Super Mario Brothers">
      <Problem title="Super Mario Brothers">
        <p>Given a Super Mario Brothers level, is it solvable?</p>
      </Problem>
      <p class="has-text-centered">
        <img src="https://i.insider.com/560ebbe8dd0895325c8b4597?width=600&format=jpeg&auto=webp" />
      </p>
      <Theorem title="Demaine et al">
        <p>The Super Mario Brothers problem is NP-hard.</p>
      </Theorem>
    </Slide>
    <Slide title="Independent set">
      <p>
        An independent set of an undirected graph {tex`G = (V, E)`} is a subset {tex`S \subset V`}{' '}
        with no edges between the vertices of {tex`S`}
      </p>
      <Problem title="Independent set problem">
        <p>Given an undirected graph, is there an independent set of size {tex`\geq m`}?</p>
      </Problem>
      <Proposition>
        <p>The IS problem is NP-hard.</p>
      </Proposition>
    </Slide>
  </Slideshow>
)
