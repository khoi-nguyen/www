import meta from './2-sorting.json';

export default () => (
  <Slideshow meta={meta}>
    <Slide title="Why is sorting important?"></Slide>
    <Slide title="Counting sort">
      <Jupyter>
        {py`
          def counting_sort(A, max):
              count, result = [0] * max, []
              for element in A:
                  count[element] += 1
              for value, frequency in enumerate(count):
                  result += [value] * frequency
              return result

          counting_sort([0, 4, 3, 2, 7, 3, 4], 10)
        `}
      </Jupyter>
    </Slide>
  </Slideshow>
);
