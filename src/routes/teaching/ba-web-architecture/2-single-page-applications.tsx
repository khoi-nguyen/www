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
        columns
      >
        <div>
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
        </div>
        <div>
          <p>Une requête contient</p>
          <ul>
            <li>Une méthode (GET, POST, PUT, DELETE, PATCH)</li>
            <li>la page ou ressource demandée</li>
            <li>les formats acceptés</li>
            <li>
              des informations sur la plateforme et le navigateur:
              <ul>
                <li>type d'appareil</li>
                <li>langue</li>
                <li>système d'exploitation</li>
                <li>version du navigateur</li>
              </ul>
            </li>
            <li>La valeur des cookies (🍪)</li>
            <li>etc.</li>
          </ul>
        </div>
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
            Méthodes <Abbr key="HTTP" />
          </>
        )}
      >
        <p>
          Voici les principales méthodes <Abbr key="HTTP" />
        </p>
        <dl>
          <dt>GET</dt>
          <dd>Demande de récupération de données (par défaut)</dd>
          <dt>POST</dt>
          <dd>Envoi de données via un formulaire</dd>
          <dt>DELETE</dt>
          <dd>Demande de suppression</dd>
          <dt>PATCH</dt>
          <dd>Demande de modification partielles</dd>
          <dt>PUT</dt>
          <dd>Demande de modification</dd>
        </dl>
        <p>
          Pour plus de détails, vous pouvez visiter la{' '}
          <a href="https://developer.mozilla.org/fr/docs/Web/HTTP/Methods">documentation</a>
        </p>
        <Remark>
          <p>
            Ceci est ce qui se passe en théorie. En pratique, le programmeur backend n'est pas
            obligé d'honorer ces conventions.
          </p>
        </Remark>
      </Slide>
      <Slide title="Exemple d'implémentation côté serveur en JavaScript">
        <p>
          Réponse à <code>GET /pokemon/pikachu</code>:
        </p>
        {js.hl`
          app.get('/pokemon/pikachu'), function(request, response) {
            response.send('Pika Pika!')
          })
        `}
        <p>
          Réponse à <code>DELETE /pokemon/pikachu</code>:
        </p>
        {js.hl`
          app.delete('/pokemon/pikachu'), function(request, response) {
            response.send('Pikachu refuse d\'être supprimé')
          })
        `}
        <Remark>
          <p>
            Cette fois-ci, le JavaScript est exécuté <strong>côté serveur</strong>
          </p>
        </Remark>
        {mermaid`
          sequenceDiagram
            participant browser as Navigateur
            participant server as Serveur
            browser ->> server: Requête
            server ->> server: Node.js traite la requête
            server ->> browser: Réponse
        `}
      </Slide>
      <Slide title="Contenu dynamique">
        <p>
          Voici un exemple où on utilise l'
          <Abbr key="URL" /> pour générer une page <Abbr key="HTML" />
        </p>
        {js.hl`
          app.get('/pokemon/:name', function(request, response) {
            const pokemonName = request.params.name
            // Étape 1: on cherche le pokemon dans la DB
            // Étape 2: on renvoie une erreur 404 si on ne trouve rien
            // Étape 3: on génère une page HTML
          })
        `}
        <p>On peut également utiliser</p>
        <ul>
          <li>
            La <code>query</code> (e.g. <code>?param=value</code>)
          </li>
          <li>Les données du formulaires</li>
          <li>Les cookies</li>
        </ul>
      </Slide>
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
