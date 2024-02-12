const meta: Metadata = {
  title: 'Welcome',
  description: 'My personal webpage, which mostly contains my teaching resources,',
}

export default () => (
  <Page meta={meta}>
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
)
