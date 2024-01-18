const meta: Metadata = {
  title: 'Single Page Applications',
  subtitle: 'Chapitre 3',
  lang: 'fr',
  description: 'Protocole HTTP, Routing, Client Side Rendering',
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
            actor user as Tuxie
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
    </Slideshow>
  )
}
