import meta from './2-sorting.json';

const CountTable = (props: { max: number }) => (
  <table>
    <thead>
      <tr>
        {[...Array(props.max).keys()].map((i) => (
          <th>{i}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        {[...Array(props.max).keys()].map((_) => (
          <td>&nbsp;</td>
        ))}
      </tr>
    </tbody>
  </table>
);

const countingSort = py`
  def counting_sort(A, max):
      count, result = [0] * max, []
      for element in A:
          count[element] += 1
      for value, frequency in enumerate(count):
          result += [value] * frequency
      return result
`;

export default () => (
  <Slideshow meta={meta}>
    <Slide title="Why is sorting important?"></Slide>
    <Slide title={() => <>Optimality of {tex`\bigo(n \log n)`} for comparison sorts</>}>
      <Theorem>
        <p>
          The running time of a <strong>comparison sorting algorithm</strong> is at best{' '}
          {tex`\bigo(n \log n)`}.
        </p>
      </Theorem>
    </Slide>
    <Slide title="Counting sort: an example">
      <Example>
        Sort the list
        <table>
          <tbody>
            <tr>
              {[3, 2, 2, 7, 2, 4, 6, 1, 8, 1].map((i) => (
                <td>{i}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </Example>
      <CountTable max={10} />
    </Slide>
    <Slide title="Counting sort: Python implementation">
      <Jupyter>
        {countingSort}
        {py`

          counting_sort([0, 4, 3, 2, 7, 3, 4], 10)
        `}
      </Jupyter>
    </Slide>
    <Slide title="Counting sort: running time">
      <Editor>{countingSort}</Editor>
      <Proposition>
        <p>
          The running time of counting sort is {tex`\bigo(n + k)`}, where {tex`k`} is the number of
          admissible elements.
        </p>
      </Proposition>
    </Slide>
  </Slideshow>
);
