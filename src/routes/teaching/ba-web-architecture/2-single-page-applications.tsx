const meta: Metadata = {
  title: 'MPA, SPA et SSR',
  subtitle: 'Chapitre 3',
  lang: 'fr',
  description: 'Protocole HTTP, routing, Client Side Rendering, Server Side Rendering, hydration',
}

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Structure du chapitre">
        <ol>
          <li>
            Fonctionnement de <Abbr key="HTTP" />
          </li>
          <li>
            <Abbr key="MPA" />
          </li>
          <li>
            <Abbr key="SPA" />
          </li>
          <li>
            <Abbr key="SSR" />
          </li>
          <li>État de l'art (si on a le temps)</li>
        </ol>
        <Idea>
          <ul>
            <li>
              Les besoins business poussent vers plus de performance et plus d'interactivité{' '}
              {tex`\to`} <Abbr key="SPA" />.
            </li>
            <li>
              Le code d'une <Abbr key="SPA" /> doit altérer le comportement du navigateur et faire
              les requêtes <Abbr key="HTTP" /> lui-même.
            </li>
            <li>
              Le but du <Abbr key="SSR" /> est de mitiger les désavantages des <Abbr key="SPA" />.
            </li>
          </ul>
        </Idea>
      </Slide>
      <Slide title="Fonctionnement">
        <Question>
          <p>Que se passe-t-il lorsque le navigateur demande une page?</p>
        </Question>
        <p>Par exemple, supposons qu'on veuille charger</p>
        {tex`
          \underbrace{\texttt{https://}}_{\text{Protocole}}
          \overbrace{\texttt{instagram.com}}^{\text{Nom de domaine}}
          \underbrace{\texttt{/kimkardashian}}_{\text{Chemin}}
        `}
        {mermaid`
          sequenceDiagram
            participant browser as Navigateur
            participant dns as Serveur DNS<br />8.8.8.8
            participant server as Serveur instagram<br />179.60.195.174
            browser ->> dns: Adresse de instagram.com?
            dns ->> browser: 179.60.195.174
            browser ->> server: GET /kimkardashian
            server ->> browser: Réponse avec code HTML
        `}
        <p>
          Le navigateur va ensuite faire des requêtes pour chaque image, fichier <Abbr key="CSS" />{' '}
          ou script JavaScript.
        </p>
      </Slide>
      <Slide title={() => <Abbr key="URL" />}>
        <Figure src="URI_syntax_diagram.svg" alt="Syntaxe d'une URL" />
        {tex`
          \texttt{http(s)://}
          \underbrace{\texttt{example.com}}_{\text{domaine}}
          \overbrace{\texttt{/chemin/vers/une/page}}^{\text{chemin}}
          \underbrace{\texttt{?a=3\&b=hello}}_{\text{query}}
        `}
        <dl>
          <dt>Domaine</dt>
          <dd>Adresse du serveur, lisible pour un être humain</dd>
          <dt>Chemin</dt>
        </dl>
      </Slide>
      <Slide
        title={() => (
          <>
            Requêtes <Abbr key="HTTP" />
          </>
        )}
      >
        <p>
          Les échanges <Abbr key="HTTP" /> se font en texte clair. Nous parlerons du{' '}
          <Abbr key="HTTPS" /> plus tard dans le cours.
        </p>
        <Example
          title={() => (
            <>
              Requête <Abbr key="HTTP" />
            </>
          )}
        >
          <pre>
            {dedent`
              GET /teaching HTTP/1.1
              Accept: text/html,[...]
              Accept-Encoding: gzip, deflate, br
              Accept-Language: en-BE,en;q=0.9,es-ES;q=0.8,es;q=0.7,[...]
              Cache-Control: no-cache
              Connection: keep-alive
              Host: nguyen.me.uk
              Pragma: no-cache
              Sec-Fetch-Dest: document
              Sec-Fetch-Mode: navigate
              Sec-Fetch-Site: none
              Sec-Fetch-User: ?1
              Upgrade-Insecure-Requests: 1
              User-Agent: Mozilla/5.0 (X11; Linux x86_64) [...]
              sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", [...]
              sec-ch-ua-mobile: ?0
              sec-ch-ua-platform: "Linux"
            `}
          </pre>
        </Example>
        <p>
          Le rôle du <strong>serveur</strong> est de <strong>répondre</strong> à une requête comme
          celle-ci.
        </p>
      </Slide>
      <Slide
        title={() => (
          <>
            Exemple d'une réponse <Abbr key="HTTP" />
          </>
        )}
      ></Slide>
      <Slide
        title={() => (
          <>
            Diagramme de séquence d'une <Abbr key="MPA" />
          </>
        )}
      >
        {mermaid`
          sequenceDiagram
            actor user as Tuxie le manchot
            participant browser as Navigateur
            participant server as ecam.be
            Note over browser, server: Demande de la page d'accueil
            user ->> browser: https://ecam.be
            browser ->> server: GET /
            server ->> server: Génère la page
            server ->> browser: Réponse contenant le code HTML
            browser ->> browser: Rendu du code HTML
            Note over browser, server: Demande d'une autre page
            user ->> browser: Lien: ecam.be/about
            browser ->> server: GET /about
            server ->> server: Génère la page
            server ->> browser: Réponse contenant le code HTML
            browser ->> browser: Rendu du code HTML
        `}
      </Slide>
      <Slide
        title={() => (
          <>
            Diagramme de séquence d'une <Abbr key="SPA" />
          </>
        )}
      >
        {mermaid`
          sequenceDiagram
            participant browser as Navigateur
            participant app as Application
            participant server as Serveur
            Note over browser, server: Première requête
            browser ->> server: GET /about
            server ->> browser: Renvoie l'application complète
            app -->> server: Requêtes
            server -->> app: Réponses
            app ->> browser: Affiche /about
            Note over browser, server: Liens
            browser ->> app: demande /autre-page
            app -->> server: Requêtes
            server -->> app: Réponses
            app ->> browser: Affiche /autre-page
        `}
      </Slide>
      <Slide title={() => <Abbr key="MPA" />}>
        <p>
          Les pages <Abbr key="HTML" /> sont <strong>générées par le serveur</strong> en utilisant
          un langage de programmation tel que le <Abbr key="PHP" />, le Python ou le JavaScript.
        </p>
      </Slide>
    </Slideshow>
  )
}
