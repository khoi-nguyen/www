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
          <dd>Chemin de la ressource, transmise au serveur</dd>
          <dt>Query string</dt>
          <dd>Contient des informations sur l'état de l'application</dd>
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
      >
        <p>
          Lorsque vous chargez une page ou une image, vous effectuez une requête GET. Voici un
          exemple de réponse.
        </p>
        <pre>
          <code>{dedent`
            HTTP/1.1 200 OK
            Access-Control-Allow-Origin: *
            content-type: text/html
            Date: Fri, 02 Feb 2024 04:16:38 GMT
            Connection: keep-alive
            Keep-Alive: timeout=5
            Transfer-Encoding: chunked

            [Contenu de la page HTML]
          `}</code>
        </pre>
        <ul>
          <li>Première ligne: Protocole et code réponse</li>
          <li>Content-Type: text/javascript, image/png, application/json, ...</li>
        </ul>
      </Slide>
      <Slide title="Exemple d'une requête POST">
        <p>Voici ce qui se passe lorsque l'on soumet un formulaire:</p>
        <pre>
          {dedent`
            POST /test HTTP/1.1
            Host: foo.example
            Content-Type: application/x-www-form-urlencoded
            Content-Length: 27

            field1=value1&field2=value2
          `}
        </pre>
        <p>
          Les requêtes sont souvent faites en <Abbr key="JSON" />
        </p>
        <pre>
          {dedent`
            POST /test HTTP/1.1
            Host: foo.example
            Content-Type: application/json
            Content-Length: ??

            {
              "field1": "value1",
              "field2": "value2"
            }
          `}
        </pre>
      </Slide>
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
      <Slide title="Codes Réponse">
        <ul>
          <li>Réponses informatives (100-199)</li>
          <li>Réponses de succès (200-299)</li>
          <li>Messages de redirection (300-399)</li>
          <li>Erreurs Client (400-499)</li>
          <li>Erreurs serveur (500-599)</li>
        </ul>
        <Example pluralize>
          <dl>
            <dt>200 OK</dt>
            <dd>La requête a réussi</dd>
            <dt>403 Forbidden</dt>
            <dd>Le client n'a pas les droits d'accès au contenu</dd>
            <dt>404 Not Found</dt>
            <dd>Le serveur n'a pas trouvé la ressource demandée</dd>
          </dl>
        </Example>
        <p>
          Pour plus d'information, consultez la{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">documentation</a>
        </p>
      </Slide>
      <Slide title="Cookies 🍪">
        <p>
          Les cookies sont des sortes de document d'identité générés par le serveur mais stockés
          côté client.
        </p>
        <ol>
          <li>
            Le serveur envoie une réponse avec dans l'entête une ou plusieurs instructions{' '}
            <code>Set-Cookie</code>, éventuellement avec une <em>date d'expiration</em>:
            <pre>
              {dedent`
                HTTP/2.0 200 OK
                Content-Type: text/html
                Set-Cookie: name=tuxie; Expires=Fri, 31 Jan 2024 20:00:00 GMT;
                Set-Cookie: age=8

                [page content]
              `}
            </pre>
          </li>
          <li>
            Le navigateur fait toutes les requêtes suivantes en renvoyant les cookies non-expirés:
            <pre>
              {dedent`
                GET /teaching HTTP/1.1
                Cookie: name=tuxie; age=8
              `}
            </pre>
          </li>
        </ol>
        {mermaid`
          sequenceDiagram
            participant browser as Navigateur
            participant server as Server
            browser ->> server: Requête
            server ->> browser: Réponse + 🍪
            browser ->> server: Requête + 🍪
        `}
      </Slide>
      <Slide title="Authentification">
        <Question>
          <p>Comment implémenteriez-vous l'authentification?</p>
        </Question>
        <Remark>
          <p>L'utilisateur peut modifier le cookie à la main!</p>
        </Remark>
      </Slide>
      <Slide title="Sites statiques">
        <p>
          Dans un site statique, le serveur ne traite généralement que les requêtes GET. Les chemins
          de l'
          <Abbr key="URL" /> font référence à un chemin sur le disque dur du serveur relativement à
          un dossier racine.
        </p>
        {mermaid`
          sequenceDiagram
            participant browser as Navigateur
            participant server as Serveur
            browser ->> server: GET /un/chemin.html
            server ->> browser: Réponse avec le contenu de /var/www/un/chemin.html
        `}
      </Slide>
      <Slide title={() => <Abbr key="MPA" />}>
        <p>
          Dans une <Abbr key="SPA" />, les requêtes sont redirigées vers une{' '}
          <strong>application</strong> qui se charge de <strong>dynamiquement</strong> créer une
          réponse.
        </p>
        <p>
          Une page générée peut de cette façon dépendre de l'
          <Abbr key="URL" /> (en particulier du chemin et de la query string), mais également des{' '}
          <strong>cookies</strong>.
        </p>
        {mermaid`
          sequenceDiagram
            participant browser as Navigateur
            participant server as Serveur
            participant app as Application
            browser ->> server: Requête
            server ->> app: Redirection de la requête
            app ->> app: Génération dynamique de la réponse
            app ->> server: Réponse
            server ->> browser: Réponse
        `}
      </Slide>
      <Slide title="Exemples notables">
        <dl>
          <dt>Python</dt>
          <dd>
            <a href="https://djangoproject.com/">Django</a>,{' '}
            <a href="https://flask.palletsprojects.com/">Flask</a>
          </dd>
          <dt>Ruby</dt>
          <dd>
            <a href="https://rubyonrails.org">Ruby on Rails</a>
          </dd>
          <dt>
            <Abbr key="PHP" />
          </dt>
          <dd>
            <a href="https://laravel.com">Laravel</a>, <a href="http://symfony.com">Symfony</a>
          </dd>
          <dt>JavaScript</dt>
          <dd>
            <a href="https://expressjs.com">Express</a>
          </dd>
        </dl>
      </Slide>
      <Slide title="Exemple: contenu dynamique">
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
            Note over browser, server: Demande de la première page
            user ->> browser: https://ecam.be
            browser ->> server: Requête (e.g. GET /)
            server ->> server: Génère la page
            server ->> browser: Réponse contenant le code HTML
            Note over browser, server: Demande d'une autre page
            user ->> browser: Lien: ecam.be/about
            browser ->> server: GET /about
            server ->> server: Génère la page
            server ->> browser: Réponse contenant le code HTML
        `}
      </Slide>
      <Slide title={() => <Abbr key="SPA" />}>
        <Definition title="SPA">
          <p>
            Une <Abbr key="SPA" /> est un site web qui interagit avec l'utilisateur en modifiant la
            page web courante au lieu de recharger entièrement la page.
          </p>
        </Definition>
        <p>
          L'objectif est d'obtenir une navigation plus <strong>fluide</strong> pour l'utilisateur.
          Deux ingrédients sont essentiels pour que cela soit possible:
        </p>
        <ul>
          <li>Pouvoir manuellement déclencher des requêtes (fetch)</li>
          <li>
            Contrôler l'adresse dans la barre et l'historique de navigation (client-side routing)
          </li>
        </ul>
        <Question>
          <p>
            Pourriez-vous penser à des fonctionnalités qui ne sont possibles que dans les{' '}
            <Abbr key="SPA" />?
          </p>
        </Question>
      </Slide>
      <Slide
        title={() => (
          <>
            L'
            <Abbr key="API" /> Fetch
          </>
        )}
      >
        <p>
          Les requêtes sont normalement effectuées chaque fois qu'un utilisateur clique sur un lien
          ou soumet un formulaire. Il est cependant possible d'en effectuer directement en
          JavaScript avec la fonction <code>fetch</code>.
        </p>
        <Definition>
          {js.hl`
            fetch(url, options)
          `}
          <ul>
            <li>Commence le processus de recherche de resource sur un serveur</li>
            <li>
              Retourne une <strong>promesse</strong> de réponse
            </li>
          </ul>
        </Definition>
        <Recall>
          <p>
            Pour obtenir la valeur de la promesse lorsqu'elle sera résolue, utilisez le mot-clé{' '}
            <code>await</code>
          </p>
        </Recall>
      </Slide>
      <Slide title="Exemple: fetch" columns>
        <Jupyter lang="svelte" columns>
          {svelte.raw`
            <script>
              let name = 'pikachu'
              
              async function fetchPokemonData(name) {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
                return await res.json()
              }

              $: dataPromise = fetchPokemonData(name)
            </script>

            <input bind:value={name} />

            {#await dataPromise}
              <p>Loading...</p>
            {:then data}
              <pre>{JSON.stringify(data, null, 2).substring(0, 600)}</pre>
            {/await}
          `}
        </Jupyter>
      </Slide>
      <Slide title="Exemple: utilisation de fetch" columns>
        <Jupyter lang="svelte" columns>
          {svelte.raw`
            <script>
              let name = 'pikachu'

              async function fetchImage(name) {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
                const data = await res.json()
                return data.sprites.other['official-artwork']['front_default']
              }

              $: picturePromise = fetchImage(name)
            </script>

            <input bind:value={name} />

            {#await picturePromise}
              <p>Loading...</p>
            {:then path}
              <img src={path} alt={name} />
            {/await}
          `}
        </Jupyter>
      </Slide>
      <Slide title="Client-Side Routing" columns>
        <div>
          <h2>Rendu initial</h2>
          <p>
            Quelques soit l'
            <Abbr key="URL" />, le point d'entrée dans l'application est le même. L'application
            utilise ensuite la variable
            {js.hl`
              window.location.pathname
            `}
          </p>
        </div>
        <div>
          <h2>Faux Liens</h2>
          <p>
            Lorsque l'on clique sur un "lien", l'application change d'état, et fait semblant de
            changer l'
            <Abbr key="URL" />.
          </p>
          {js.hl`
            // Exemple d'action lorsqu'on clique sur un lien "About"
            history.pushState({ component: 'About' }, '/about')
          `}
          <Remark>
            <p>
              Implémenter le <strong>Client-Side Routing</strong> est complexe. En plus de devoir
              bien lier les <Abbr key="URL" /> à des états de l'application, il faut aussi gérer les
              boutons tels que précédent (cf. popstate)
            </p>
          </Remark>
        </div>
      </Slide>
      <Slide title="En pratique">
        <p>
          Bonne nouvelle, vous ne devrez en pratique jamais implémenter le Client-Side Routing.
          Regardons comment c'est implémenté dans <a href="https://kit.svelte.dev">SvelteKit</a>.
        </p>
        <h2>File-Based Routing</h2>
        <p>
          SvelteKit lie l'
          <Abbr key="URL" /> <code>/about</code> au composant{' '}
          <code>src/routes/about/+page.svelte</code>
        </p>
        <h2>Liens</h2>
        <p>
          Utilisez la syntaxe <Abbr key="HTML" /> habituelle:
        </p>
        {html.hl`
          <a href="/about">About</a>
        `}
        <Remark>
          <p>
            SvelteKit va beaucoup plus loin que ça. Nous expliquerons ça plus loin, mais pour
            l'instant, contentons-nous de dire que l'application fonctionnerait sur un navigateur
            sans JavaScript.
          </p>
        </Remark>
      </Slide>
      <Slide title={() => <Abbr key="API" />}>
        <p>
          En plus de "fausses routes" dans l'application, le backend doit pouvoir servir de vraies
          routes dont le seul but sera de servir des <strong>données brutes</strong>. Le backend ne
          répondra plus par du code <Abbr key="HTML" /> mais dans un format tel que le{' '}
          <Abbr key="JSON" /> ou l'
          <Abbr key="XML" />.
        </p>
        <Figure src="rest.png" alt="REST API" />
        <Question>
          <p>
            Cette façon de procéder est en fait très pratique lorsque vous avez également une
            application mobile. Voyez-vous pourquoi?
          </p>
        </Question>
      </Slide>
      <Slide title="Kim Kardashian">
        <Figure src="kardashian.png" alt="Kardashian's Instagram page throughout the years" />
        <Question>
          <p>Que s'est-il passé en 2016?</p>
        </Question>
      </Slide>
      <Slide
        title={() => (
          <>
            Routes <Abbr key="API" /> dans SvelteKit
          </>
        )}
      >
        <p>
          Le fichier <code>/src/routes/test/+server.js</code> permet de définir une route{' '}
          <Abbr key="API" /> à l'adresse <code>routes/test</code>. Dans ce fichier, on peut définir
          des fonctions correspondant aux verbes <Abbr key="HTTP" />.
        </p>
        <p>
          Exemple: <code>src/routes/api/random-number/+server.js</code>
        </p>
        {js.hl`
          import { json } from '@sveltejs/kit';
          export function GET(event) {
            const min = Number(event.url.searchParams.get('min'))
            const max = Number(event.url.searchParams.get('max'))
            const random = min + Math.random() * (max - min)
            return json(random)
          }
        `}
      </Slide>
      <Slide
        title={() => (
          <>
            Fonctionnement d'une <Abbr key="SPA" />
          </>
        )}
      >
        <ol>
          <li>
            Le serveur redirige toutes les <strong>pages</strong> vers la même page (e.g.{' '}
            <code>/index.html</code>)
          </li>
          <li>
            L'application regarde l'adresse (<code>window.location.pathname</code>) pour déterminer
            l'état initial de l'application
          </li>
          <li>
            Des requêtes supplémentaires (via fetch) sont effectuées vers un backend ou d'autres{' '}
            <Abbr key="API" />
          </li>
          <li>
            Lorsque l'on clique sur un lien, on change l'état de l'application et l'adresse dans le
            navigateur.
          </li>
        </ol>
        <Question>
          <p>
            Quelles sont les avantages et les désavantages d'une <Abbr key="SPA" />?
          </p>
        </Question>
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
      <Slide
        title={() => (
          <>
            <Abbr key="MPA" /> vs <Abbr key="SPA" />
          </>
        )}
      >
        <SpeechBubble>
          <p>
            Quelles sont les différences entre les <Abbr key="SPA" /> et les <Abbr key="MPA" />?
          </p>
        </SpeechBubble>
      </Slide>
      <Slide
        title={() => (
          <>
            <Abbr key="SSR" />
          </>
        )}
      >
        <p>
          Le but du <Abbr key="SSR" /> est d'obtenir le meilleur des deux mondes. Il nécéssite
          l'emploi du <strong>JavaScript isomorphe</strong> (c'est-à-dire côté client et serveur).
        </p>
        <ul>
          <li>
            Au premier rendu (First Contentful Paint), le code est entièrement exécuté{' '}
            <strong>côté serveur</strong> pour donner du <Abbr key="HTML" />. Il ne devrait pas y
            avoir des aller-retours.
          </li>
          <li>
            Après ce premier rendu, l'application n'est pas fonctionnelle. Le JavaScript est
            téléchargé et est exécuté <strong>côté client</strong> et l'application devient une{' '}
            <Abbr key="SPA" />. Ce processus est appelé <strong>hydration</strong>.
          </li>
          <li>
            L'application fonctionne comme une <Abbr key="SPA" />.
          </li>
        </ul>
      </Slide>
      <Slide title="L'importance du JavaScript" columns>
        <div>
          <Figure src="js-for-babies.png" alt="JavaScript for babies" width={500} />
          <p>
            Rappelons que pour faire du <Abbr key="SSR" />, le rendu <Abbr key="HTML" /> doit se
            faire JavaScript du côté backend et du côté frontend. Cela n'exclut pas qu'il y ait des{' '}
            <Abbr key="API" /> supplémentaires écrites dans d'autres langages de programmation.
          </p>
        </div>
        <div>
          <SpeechBubble>
            <p>
              ¿Por qué me regalaste un libro en inglés? ¿No encontraste la traducción casteshana?
            </p>
          </SpeechBubble>
        </div>
      </Slide>
      <Slide title="Hydration">
        <p>
          Chaque fois qu'on résoud un problème en frontend, on en crée un nouveau. Le{' '}
          <Abbr key="SSR" /> crée le problème de l'<em>hydration</em>, une période durant laquelle
          la page est affichée mais <em>pas interactive</em>.
        </p>
        <Figure src="hydration.png" alt="Le processus d'hydration" />
        <p>
          Ce problème n'est pas encore résolu de manière satisfaisante, bien qu'il existe des
          projets prometteurs tels que <a href="https://qwik.dev">Qwik</a> ou{' '}
          <a href="https://astro.build">Astro</a>
        </p>
      </Slide>
      <Slide
        title={() => (
          <>
            Modèles d'
            <Abbr key="API" />
          </>
        )}
      >
        <p>
          Plusieurs modèles d'
          <Abbr key="API" /> dominent:
        </p>
        <ul>
          <li>
            <Abbr key="SOAP" />
          </li>
          <li>
            <Abbr key="REST" />
          </li>
          <li>GraphQL (Facebook, 2015)</li>
        </ul>
        <p>
          L'importance des <Abbr key="API" /> est expliquée principalement par
        </p>
        <ul>
          <li>La flexibilité qu'elle permet aux utilisateurs avancés</li>
          <li>la montée en popularité du mobile</li>
          <li>
            Les frameworks JavaScript ont poussé le rendu côté client, laissant principalement le
            rôle de générer des données brutes au backend
          </li>
        </ul>
      </Slide>
      <Slide title={() => <Abbr key="REST" />}>
        <p>
          L'idée de <Abbr key="REST" /> est d'utiliser nativement les méthodes <Abbr key="HTTP" />{' '}
          et différentes <Abbr key="URL" /> pour donner accès au client aux données qu'elle ou il
          recherche.
        </p>
        <p>Par exemple,</p>
        <ul>
          <li>
            <code>GET /pokemons</code> peut donner la liste de tous les pokemons en{' '}
            <Abbr key="JSON" />
          </li>
          <li>
            <code>GET /pokemons/pikachu</code> peut donner les informations à propos de Pikachu
          </li>
          <li>
            <code>PUT/PATCH/POST /pokemons/pikachu</code> Envoie des changements
          </li>
          <li>
            <code>DELETE /pokemons/pikachu</code> supprimerait Pikachu (le pauvre)
          </li>
        </ul>
      </Slide>
    </Slideshow>
  )
}
