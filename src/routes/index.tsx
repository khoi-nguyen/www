import meta from './index.json';

export default () => (
  <Page meta={meta}>
    <p>
      Hi everyone! My name is <strong>Khôi Nguyễn</strong> and I'm a mathematician and a programmer
      who is passionate about education. Currently, I work at <Abbr key="ECAM" /> and{' '}
      <Abbr key="NYU" /> as a lecturer in Mathematics and Computer Science.
    </p>
    <p>
      Previously, I taught Mathematics and Computer Science in international schools such as the{' '}
      <a href="https://britishschool.be">The British School of Brussels</a> or{' '}
      <a href="https://www.kingscollegeschools.org/">
        King's College, The British School of Madrid
      </a>
      . And before that, I worked as a <Abbr key="PhD" /> student at{' '}
      <a href="https://imperial.ac.uk">Imperial College</a>. My focus was on developing global
      Pseudo-Differential Calculus on Lie groups.
    </p>
    <p>
      The main purpose of this website is to host my <A href="/teaching">teaching resources</A> for
      my students. It is <strong>under construction</strong>. <A href="/stack">This page</A> gives
      more details about how the website works from a technical point of view.
    </p>
    <h2>Useful Links</h2>
    <ul>
      <li>
        <A href="/teaching/">My teaching page</A>
      </li>
      <li>
        <a href="https://spiral.imperial.ac.uk/handle/10044/1/44081">My Thesis</a>
      </li>
      <li>
        <a href="https://github.com/khoi-nguyen">My GitHub page</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/binh-khoi-nguyen/">My LinkedIn page</a>
      </li>
    </ul>
  </Page>
);
