export default {
  clrs: [
    'Cormen et al., 2022',
    'Cormen et al. (2022)',
    () => (
      <>
        Cormen, T. H., Leiserson, C. E., Rivest, R. L., &amp; Stein, C. (2022).{' '}
        <a href="https://en.wikipedia.org/wiki/Introduction_to_Algorithms">
          <em>Introduction to algorithms, fourth edition</em>
        </a>
        . <Abbr key="MIT" /> press.
      </>
    ),
  ],
  clrss: [
    'Lohr & Bodnar, 2017',
    'Lohr and Bodnar (2017)',
    () => (
      <>
        Lohr, A., & Bodnar, M. (2017).{' '}
        <em>
          <abbr title="Cormen, Leiserson, Rivest, Stein">CLRS</abbr> Solutions
        </em>
        .{' '}
        <a href="https://sites.math.rutgers.edu/~ajl213/CLRS/CLRS.html">
          https://sites.math.rutgers.edu/~ajl213/CLRS/CLRS.html
        </a>
      </>
    ),
  ],
} as const;
