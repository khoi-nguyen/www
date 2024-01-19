const meta: Metadata = {
  title: 'MPA et SPA',
  subtitle: 'Chapitre 3',
  lang: 'fr',
  description: 'Protocole HTTP, routing, Client Side Rendering, Server Side Rendering, hydration',
}

export default () => {
  return (
    <Slideshow meta={meta}>
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
    </Slideshow>
  )
}
