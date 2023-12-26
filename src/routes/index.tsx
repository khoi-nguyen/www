import meta from './index.json';

export default () => (
  <Page meta={meta}>
    <h2>About me</h2>
    <p>
      Hi everyone! My name is <strong>Khôi Nguyễn</strong> (he/him) and I'm a mathematician and a
      programmer who is passionate about education. Currently, I work at{' '}
      <a href="https://ecam.be">
        <Abbr key="ECAM" />
      </a>{' '}
      and{' '}
      <a href="https://nyu.edu">
        <Abbr key="NYU" />
      </a>{' '}
      as a lecturer in Mathematics and Computer Science. The main purpose of this website is to host
      my <A href="/teaching">teaching resources</A> for my students.
    </p>
    <p>
      I studied pure mathematics at the <a href="https://cam.ac.uk">University of Cambridge</a> and
      obtained my <Abbr key="PhD" /> from{' '}
      <a href="https://imperial.ac.uk">Imperial College London</a> in 2016. I specialized in
      Analysis and Differential Geometry, and was part of the effort to extend global
      Pseudo-Differential Calculus to non-compact Lie Groups.
    </p>
    <p>
      I started teaching in 2017, obtaining my teaching qualification from the{' '}
      <a href="https://ox.ac.uk">University of Oxford</a> in 2019. Before becoming a lecturer, I
      mostly worked as a Teacher of Mathematics in international schools such as{' '}
      <a href="https://britishschool.be">The British School of Brussels</a> and{' '}
      <a href="https://www.madrid-soto.kingscollegeschools.org/en">
        King's College, The British School of Madrid
      </a>
      . I think a lot about how to use front-end technologies to better teach mathematics and
      programming.
    </p>
    <h2>Useful Links</h2>
    <ul>
      <li>
        <A href="/cv">Curriculum Vitæ</A>
      </li>
      <li>
        <A href="/teaching/">Teaching</A>
      </li>
      <li>
        <a href="https://spiral.imperial.ac.uk/handle/10044/1/44081">
          <Abbr key="PhD" /> Thesis
        </a>
      </li>
      <li>
        <a href="https://github.com/khoi-nguyen">GitHub</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/binh-khoi-nguyen/">LinkedIn</a>
      </li>
    </ul>
  </Page>
);
