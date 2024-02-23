const meta: Metadata = {
  title: 'Backend et API',
  subtitle: 'Chapitre 4',
  lang: 'fr',
  description: 'REST, GraphQL, ORM',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Résumé du cours jusqu'à présent">
        <ul>
          <li>
            <strong>Composants</strong>: transformer le <Abbr key="DOM" /> avec la même simplicité
            que si on le recréait de zéro avec d'autres avantages:
            <ul>
              <li>Encapsulation</li>
              <li>Réutilisabilité</li>
              <li>Testabilité</li>
            </ul>
          </li>
          <li>
            <Abbr key="SPA" />
            <ul>
              <li>
                Répond aux besoins d'
                <Abbr key="UX" /> de plus en plus exigents
              </li>
              <li>
                Relativement faciles à développer depuis l'apparition des frameworks à componsants
              </li>
              <li>
                Crée des difficultés supplémentaires
                <ul>
                  <li>Référencement</li>
                  <li>Accessibilité</li>
                  <li>Premier chargement lent</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            Les difficultés des <Abbr key="SPA" /> peuvent être mitigées via le <Abbr key="SSR" />
          </li>
        </ul>
      </Slide>
      <Slide title="Outline du chapitre">
        <ul>
          <li>Quel langage de programmation pour le backend?</li>
          <li>
            <Abbr key="API" />
            <ul>
              <li>
                Qu'est-ce qu'une <Abbr key="API" />?
              </li>
              <li>
                <Abbr key="REST" />
              </li>
              <li>Underfetching, overfetching</li>
              <li>GraphQL</li>
            </ul>
          </li>
          <li>
            Persistence de données
            <ul>
              <li>
                <Abbr key="ORM" />
              </li>
            </ul>
          </li>
        </ul>
      </Slide>
      <Slide title="Interlude: la montée du mobile">
        <Figure src="mobile-traffic.webp" alt="Mobile traffic" height={600}>
          <p>
            Les smartphones sont moins performants et ont des connexions plus lente. Ces deux
            facteurs influent sur l'autonomie de la batterie. En terme d'
            <Abbr key="UX" />, il est également pertinent d'offrir une interface adaptée à la taille
            de l'écran.
          </p>
        </Figure>
      </Slide>
      <Slide title="Choix du langage côté serveur">
        <p>
          Contrairement au front-end où le JavaScript est pratiquement imposé, le choix est plus
          libre pour le backend, qui peut être écrit en Python, <Abbr key="PHP" />, etc.
        </p>
        <Question>
          <p>
            Pourriez-vous penser à des raisons pour lesquelles le JavaScript a un avantage sur les
            autres langages?
          </p>
        </Question>
      </Slide>
      <Slide title={() => <Abbr key="API" />}>
        <Remark>
          <p>
            Nous emploierons le terme <Abbr key="API" /> pour désigner une <Abbr key="API" />{' '}
            <strong>Web côté serveur</strong>.
          </p>
        </Remark>
        <Definition>
          <p>
            Une <Abbr key="API" /> web côté serveur consiste en un ou plusieurs points d'accès
            exposés publiquement répondant avec des <strong>données</strong> (par exemple, en{' '}
            <Abbr key="XML" /> ou <Abbr key="JSON" />
            ).
          </p>
        </Definition>
      </Slide>
      <Slide title="Exemple: Poké API">
        <Iframe src="http://pokeapi.co" height={900} />
      </Slide>
      <Slide title="Poké API">
        <Api src="https://pokeapi.co/api/v2/pokemon/pikachu" />
      </Slide>
      <Slide title="Exemple: NASA">
        <Api src="https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY" />
      </Slide>
      <Slide title="Chess.com">
        <Api src="https://api.chess.com/pub/player/hikaru" />
      </Slide>
      <Slide title="Pourquoi?">
        <Question>
          <ul>
            <li>
              Pourquoi utilise-t-on des <Abbr key="API" /> publiques?
            </li>
            <li>
              Quels sont les avantages à écrire une <Abbr key="API" /> pour une application web?
            </li>
          </ul>
        </Question>
      </Slide>
      <Slide title={() => <Abbr key="REST" />}>
        <p>
          <Abbr key="REST" /> est un <strong>style d'architecture</strong> web
        </p>
        <ul>
          <li>Architecture client/serveur</li>
          <li>Sans état</li>
          <li>Avec mise en cache</li>
          <li>En couches</li>
          <li>Avec une interface uniforme</li>
        </ul>
        <p>
          En pratique, une <Abbr key="API" /> <Abbr key="REST" /> associe des <Abbr key="URL" />s à
          des ressources, et le verbe <Abbr key="HTTP" /> décrit comment la manipuler. Ce type
          d'architecture est performant (grâce à la mise en cache) et scalable.
        </p>
      </Slide>
      <Slide
        title={() => (
          <>
            Désavantages de <Abbr key="REST" />
          </>
        )}
      >
        <Question>
          <p>
            Quelles sont les inconvénients d'une <Abbr key="API" /> <Abbr key="REST" />
          </p>
        </Question>
        <ul>
          <li>Underfetching</li>
          <li>Overfetching</li>
          <li>
            Il faut connaître les <Abbr key="URL" />
          </li>
          <li>
            L'
            <Abbr key="API" /> doit être documentée
          </li>
          <li>
            <Abbr key="DX" />
          </li>
        </ul>
      </Slide>
      <Slide title="GraphQL: présentation">
        <Figure src="graphql.svg" alt="GraphQL logo" height={300} />
        <ul>
          <li>
            Objectif: flexibilité pour obtenir les données <strong>en une requête</strong>
          </li>
          <li>Développé par Facebook (2015) pour répondre aux exigences de l'application mobile</li>
          <li>Un seul point d'entrée</li>
          <li>
            L'
            <Abbr key="API" /> peut être explorée sans documentation
          </li>
          <li>
            Meilleure <Abbr key="DX" />
          </li>
        </ul>
      </Slide>
      <Slide title="GraphQL" columns>
        <div>
          <Question>
            <p>Qu'est-ce qu'un graphe?</p>
          </Question>
          <Figure src="graphql-graph.png" alt="GraphQL Graph" />
        </div>
        <div>
          <h2>Caractéristiques de GraphQL</h2>
          <ul>
            <li>
              Un point d'entrée (souvent <code>/graphql</code>)
            </li>
            <li>
              On envoie via <code>POST</code> exactement les données que l'on veut avec une syntaxe
              qui ressemble à la structure des données de retour.
              <Editor>
                {dedent`
                  Query {
                    movie(title: "Toy Story") {
                      year
                      style
                      cast {
                        name
                      }
                    }
                  }
                `}
              </Editor>
            </li>
            <li></li>
          </ul>
        </div>
      </Slide>
      <Slide title="GraphQL: exemple" split={false}>
        <Iframe src="https://graphql-pokeapi.vercel.app/" />
      </Slide>
      <Slide title="GraphQL: remarques">
        <ul>
          <li>La mise en cache doit être implémentée</li>
        </ul>
      </Slide>
      <Slide title="Persistence des données">
        <ul>
          <li>Fichiers</li>
          <li>Base de données relationnelles</li>
          <li>
            No
            <Abbr key="SQL" />
          </li>
        </ul>
        <p>
          Vous avez eu un cours sur cela au premier quadrimestre, nous nous contenterons seulement
          de discuter l'aspect pratique dans le cas du Web.
        </p>
        <Question>
          <p>Quelle solution employeriez-vous et pourquoi?</p>
        </Question>
      </Slide>
      <Slide title="Base de données: aspects développeur">
        <ul>
          <li>
            Que faire si l'on change de serveur de base de données (e.g. MariaDB {tex`\to`}{' '}
            Postgres)?
          </li>
          <li>
            Que faire pour éviter les erreurs de sécurité telles que les injections{' '}
            <Abbr key="SQL" />
          </li>
          <li>Comment manier les données plus rapidement?</li>
          <li>
            Comment écrire du code réutilisable et plus maintenable pour manipuler les données?
          </li>
        </ul>
      </Slide>
      <Slide title={() => <Abbr key="ORM" />}>
        <Idea>
          <p>
            Utiliser la <strong>programmation orientée objet</strong> (en particulier l'héritage)
            pour simplifier la manipulation de données.
          </p>
        </Idea>
        <Question>
          <p>
            Qu'est-ce qu'un <Abbr key="ORM" />?
          </p>
        </Question>
        <Definition>
          <p>
            Un <Abbr key="ORM" /> (mapping objet-relationnel) est une couche entre une base de
            données relationnelle dont le but est de simuler une base de données orientée objet.
          </p>
        </Definition>
      </Slide>
      <Slide title="Exemples" split={false}>
        <div class="grid">
          <h2>
            Requête <Abbr key="SQL" />
          </h2>
          <h2>
            <Abbr key="ORM" />
          </h2>
          <Editor lang="sql" code={`SELECT * FROM users`} />
          {js.hl`Users.findAll()`}
          <Editor
            lang="sql"
            code={`INSERT INTO users (nick, email) VALUES ('tuxie', 'TUX@ecam.be')`}
          />
          {js.hl`
            const tux = new User({ nick: 'tuxie', email: 'TUX@ecam.be' })
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
      <Slide title="Avantages et inconvénients"></Slide>
    </Slideshow>
  )
}
