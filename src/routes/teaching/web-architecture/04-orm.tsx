const meta: Metadata = {
  title: 'Chapter 4: ORM',
  description: 'Prisma',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title={() => <Abbr key="ORM" />}>
        <Idea>
          <p>
            Use <strong>object-oriended programming</strong> (in particular inheritance) to simplify
            data manipulation.
          </p>
        </Idea>
        <Question>
          <p>
            What is an <Abbr key="ORM" />?
          </p>
        </Question>
        <Definition>
          <p>
            It is a programming technique for converting data in a relational database to simulate
            an object-oriented database.
          </p>
        </Definition>
      </Slide>
      <Slide title="Examples" split={false}>
        <div class="grid">
          <h2>
            <Abbr key="SQL" /> query
          </h2>
          <h2>
            <Abbr key="ORM" /> (example syntax)
          </h2>
          <Editor lang="sql" code={`SELECT * FROM users`} />
          {js.hl`Users.findAll()`}
          <Editor
            lang="sql"
            code={`INSERT INTO users (nick, email) VALUES ('tuxie', 'TUX@ecam.be')`}
          />
          {js.hl`
            const tux = new User({
              nick: 'tuxie',
              email: 'TUX@ecam.be'
            })
            await tux.save()
          `}
          <Editor lang="sql" code={`UPDATE users SET email='TUXIE@ecam.be' WHERE nick='tuxie'`} />
          {js.hl`
            const tux = await User.find({ nick: 'tuxie' })
            tux.email = 'TUXIE@ecam.be'
            await tux.save()
          `}
          <Editor lang="sql" code={`DELETE FROM users WHERE nick='tuxie'`} />
          {js.hl`
            await User.delete({ nick: 'tuxie' })
          `}
        </div>
      </Slide>
      <Slide title="How does it typically work?">
        <ul>
          <li>One class per table</li>
          <li>One instance correspond to a record in the database</li>
          <li>
            Tables are associated with classes that all inherit from the same base class. These
            children classes typically contain at least table specific information (e.g. name,
            primary keys, relationships, field names for typing)
            {js.hl`
              class User extends Model {
                static table = "users";
                static primary = ["id"];
              }
            `}
          </li>
          <li>
            The base class implements the methods to generate and execute queries.
            {js.hl`
              class Model {
                static async load(where) { }
                async save() { }
                // ...
              }
            `}
          </li>
        </ul>
      </Slide>
      <Slide
        title={() => (
          <>
            Un <Abbr key="ORM" /> simple
          </>
        )}
      >
        <Github repo="khoi-nguyen/LW3L-orm" path="models/Model.js" lang="js" />
      </Slide>
      <Slide
        title={() => (
          <>
            Todo app avec un <Abbr key="ORM" />
          </>
        )}
      >
        <Github repo="khoi-nguyen/LW3L-orm" path="server.js" lang="js" />
      </Slide>
      <Slide title="Advantages">
        <ul>
          <li>
            No need to write <Abbr key="SQL" /> queries
            <ul>
              <li>Better for security</li>
              <li>Better to manage relationships</li>
            </ul>
          </li>
          <li>Type safety</li>
          <li>Handle migrations</li>
        </ul>
        <p>
          However, using has an <Abbr key="ORM" /> has a performance cost.
        </p>
      </Slide>
      <Slide title="Using Prisma">
        <p>
          <a href="https://www.prisma.io/docs/getting-started/quickstart">Prisma Quickstart</a>
        </p>
        <ul>
          <li>You can use SQLite for your project</li>
          <li>Read the quickstart, and the documentation page for CRUD and relation queries</li>
        </ul>
      </Slide>
    </Slideshow>
  )
}
