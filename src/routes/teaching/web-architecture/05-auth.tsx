const meta: Metadata = {
  title: 'Chapter 5: Authentication',
  description: 'Principles and next-auth',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Basic Authentication: flow">
        <ol>
          <li>Login: the user sends a POST request with their login and password</li>
          <li>Verification: the credentials are checked to see if they belong to a user</li>
          <li>
            Session ID: the server gives the client a unique session id and stores it to recognise
            the user
          </li>
          <li>The client presents the cookie with the session id for subsequent requests</li>
        </ol>
        <p>We shall focus on Step 2.</p>
      </Slide>
      <Slide title="Storing passwords and verification">
        <p>Passwords should not be stored as plain text in case the database gets compromised.</p>
        <Figure src="hash.png" alt="Hash function" />
        <Definition>
          <dl>
            <dt>Hash function</dt>
            <dd>
              Function that transforms a string into a fixed-size string of bytes. It should be
              deterministic, non-invertible, be subject to the avalanche effect, and be resistent to
              collision and pre-image.
            </dd>
            <dt>Salt</dt>
            <dd>Value that is added to the password before hashing</dd>
          </dl>
        </Definition>
      </Slide>
      <Slide title="Bcrypt">
        <Question>
          <p>Best practice dictates that a salt be generated randomly each time. Why?</p>
        </Question>
        <h3>Hash a password</h3>
        {js.jupyter`
          import bcrypt from 'bcryptjs'
          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync('hello', salt)
          alert(salt + ', ' + hash)
        `}
        <h3>Check a password</h3>
        {js.jupyter`
          import bcrypt from 'bcryptjs'
          const hashed = '$2a$10$bbKbGSuWgXdYYDsdW8jSgOxTMf/pHJx0UecGN2mKn6PMgXif3diKu'
          if (bcrypt.compareSync('hello', hashed)) {
            alert('Hello')
          } else {
            alert('The password is incorrect')
          }
        `}
      </Slide>
      <Slide title="Session ID">
        <p>After a successful authentication, we need to create a cookie.</p>
        <Question>
          <p>How could we do that?</p>
        </Question>
      </Slide>
      <Slide title="OAuth">
        <a href="https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbb375f63-bf06-4956-b3a3-914fd6aa2d91_1280x1664.jpeg">
          <Figure src="oauth.webp" alt="OAuth" height="" />
        </a>
      </Slide>
      <Slide title="With Next.js">
        <a href="https://nextjs.org/docs/app/building-your-application/authentication">
          https://nextjs.org/docs/app/building-your-application/authentication
        </a>
      </Slide>
    </Slideshow>
  )
}
