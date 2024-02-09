const meta: Metadata = {
  title: 'HTTP, MPA, SPA et SSR',
  subtitle: 'Chapitre 3',
  lang: 'fr',
  description: 'Protocole HTTP, routing, Client Side Rendering, Server Side Rendering, hydration',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Acteurs du Web">
        <p>
          La particularité du Web est qu'elle réside sur une architecture{' '}
          <strong>client-serveur</strong>.
        </p>
        <Figure src="server-client.jpg" alt="Client/Serveur" />
        <p>
          Ceci requiert une <strong>connectivité permanente</strong> mais donne également énormément
          de possibilités.
        </p>
        <p>
          Par exemple, ChatGPT requiert une puissance de calcul gigantesque (258 000 cores de
          processeurs pour GPT-3) mais est accessible via n'importe quel ordinateur ou smartphone.
        </p>
      </Slide>
      <Slide title="Le client">
        <Definition title="Client">
          <p>
            Programme qui effectue des requêtes <Abbr key="HTTP" /> pour accéder à un service ou une
            ressource fourni par un serveur.
          </p>
        </Definition>
        <Example>
          <ul>
            <li>Le navigateur de votre ordinateur ou smartphone</li>
            <li>L'application calendrier sur votre téléphone</li>
            <li>Dropbox, Google Drive</li>
            <li>Un programme/script qui accède à des ressources sur le Web</li>
          </ul>
        </Example>
        <Remark>
          <p>
            Par abus de langage, nous utiliserons parfois le terme <strong>client</strong> pour
            désigner l'<strong>ordinateur</strong> sur lequel tourne le navigateur.
          </p>
        </Remark>
      </Slide>
      <Slide title="Le serveur">
        <Figure src="server-room.webp" alt="Server room" height={250} />
        <Definition title="Serveur">
          <p>
            Le serveur est un programme qui écoute sur le réseau et qui répond aux requêtes{' '}
            <Abbr key="HTTP" /> des clients.
          </p>
        </Definition>
        {mermaid`
          sequenceDiagram
            participant client as Client
            participant server as Serveur
            client ->> server: Requête HTTP
            server ->> client: Réponse HTTP
        `}
        <p>Analogie douteuse: cuisiniers du McDonalds</p>
      </Slide>
      <Slide
        title={() => (
          <>
            Le protocole <Abbr key="HTTP" />
          </>
        )}
      >
        <Definition>
          <p>
            Le protocole <Abbr key="HTTP" /> est le standard qui dictent comment serveurs et clients
            communiquent.
          </p>
        </Definition>
        <p>
          Clients et serveurs communiquent par message structuré (première ligne, l'en-tête, corps).
        </p>
        <Figure src="http-message.png" alt="Messages HTTP" />
      </Slide>
      <Slide title="Stateless">
        <Figure src="dory.png" alt="Dory">
          <p>
            Le protocole <Abbr key="HTTP" /> est comme Dory, il oublie les requêtes des clients dès
            qu'il les a traitées.
          </p>
        </Figure>
        <Remark>
          <p>
            Le protocole <Abbr key="HTTP" /> est <em>stateless</em>: les requêtes sont traitées
            indépendemment des requêtes précédentes et les communications sont coupées dès qu'elles
            sont terminées.
          </p>
        </Remark>
        <p>
          Le client doit rappeler <strong>à chaque requête</strong> qui il est via ce qu'on appelle
          des <strong>cookies</strong> (dans quelques slides)
        </p>
      </Slide>
      <Slide title="Cookies">
        <p>
          L'idée des cookie est que le client rappelle au serveur qui il est à chaque requête parce
          que le serveur a oublié (une promenade en mer, une promenade en mer).
        </p>
        <Figure src="http-cookie.png" alt="Cookie HTTP" />
        <Remark>
          <p>
            Généralement les cookies sont chiffrés par le serveur pour qu'ils soient plus difficiles
            à falsifier.
          </p>
        </Remark>
      </Slide>
      <Slide title="Cryptographie asymétrique">
        <p>
          La sécurité du Web fonctionne sur la <strong>cryptographie asymétrique</strong>.
        </p>
        <Figure src="public-key-cryptography-fr.png" alt="Cryptographie asymétrique" width={600} />
        <ul>
          <li>
            Deux <strong>clés inverses</strong> l'une de l'autre: un message crypté avec l'un peut
            être déchiffré avec l'autre.
          </li>
          <li>
            <strong>Objectifs</strong>:
            <ul>
              <li>
                <strong>Confidentialité</strong>
              </li>
              <li>
                <strong>Authentification de l'expéditeur</strong>
              </li>
            </ul>
          </li>
          <li>Le nom public/privé vient de si cette clé est partagée ou non.</li>
        </ul>
      </Slide>
      <Slide title={() => <Abbr key="HTTPS" />}>
        <p>
          Les requêtes <Abbr key="HTTP" /> sont lisibles par toute personne qui se trouve sur le
          réseau entre le client et le serveur. En particulier, une personne peut lire vos mots de
          passe et données bancaires.
        </p>
        {mermaid`
          sequenceDiagram
            participant client as Client
            participant server as Serveur
            client ->> server: ClientHello
            server ->> client: ServerHello, Certificat, Clé publique
            client ->> client: Génération d'une clé de session
            client ->> server: Envoi de la clé de session (encryptée)
            server ->> client: Cookie lié à la clé de session
            client ->> server: Requête + cookie (Encryptée deux fois)
            server ->> client: Réponse (encryptée une fois)
        `}
      </Slide>
      <Slide title="Requêtes GET">
        <Definition title="Requête GET">
          <p>
            Une requête GET est une demande faite par un client au serveur de consulter une
            ressource à une <Abbr key="URL" /> donnée. Le serveur y répond ou renvoie une erreur.
          </p>
        </Definition>
        <Example pluralize>
          <ul>
            <li>Consulter une page</li>
            <li>Consulter une image</li>
          </ul>
        </Example>
      </Slide>
      <Slide title="Requêtes POST">
        <Definition title="Requête POST">
          <p>
            Une requête POST est utilisée par un client pour <strong>envoyer</strong> des données
            supplémentaires au serveur.
          </p>
        </Definition>
        <Example pluralize>
          <ul>
            <li>Envoi de formulaire</li>
          </ul>
        </Example>
      </Slide>
      <Slide title="Différentes architectures">
        <p>
          Il existe plusieurs manières de créer un site ou une application web. La décision qui
          différencie ces architectures est la{' '}
          <strong>répartition du travail entre serveur et client</strong>.
        </p>
        <ol>
          <li>Sites statiques</li>
          <li>
            <Abbr key="MPA" />
          </li>
          <li>
            <Abbr key="SPA" />
          </li>
          <li>
            <Abbr key="SSR" />
          </li>
        </ol>
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
            participant browser as Client
            participant server as Serveur
            browser ->> server: GET /un/chemin.html
            server ->> browser: Réponse avec le contenu de /var/www/un/chemin.html
        `}
        <p>
          En particulier, on n'a pas accès à des base de données, on ne peut pas traiter de
          formulaires, etc.
        </p>
      </Slide>
      <Slide title="Applications">
        <p>
          Pour fournir une expérience personnalisée à l'utilisateur, nous voulons que la page soit
          potentiellement différente pour chaque utilisateur. On parle alors d'
          <strong>application</strong>.
        </p>
        <Definition>
          <p>
            Une <strong>application web</strong> utilise un <strong>programme</strong> pour répondre
            aux requêtes.
          </p>
        </Definition>
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
        <p>Nous distinguerons deux types d'application:</p>
        <ul>
          <li>
            <Abbr key="MPA" />
          </li>
          <li>
            <Abbr key="SPA" />
          </li>
        </ul>
      </Slide>
      <Slide
        title={() => (
          <>
            <Abbr key="SPA" /> vs <Abbr key="MPA" />
          </>
        )}
      >
        <p>
          La distinction <Abbr key="SPA" />/<Abbr key="MPA" /> se fait sur le{' '}
          <strong>nombre de pages</strong> que comporte l'application.
        </p>
        <ul>
          <li>
            Si l'application a une page, c'est une <Abbr key="SPA" />.
          </li>
          <li>
            Si l'application a plusieurs page, c'est une <Abbr key="MPA" />.
          </li>
        </ul>
        <Remark>
          <p>
            Ce critère n'est pas aussi simple qu'il en a l'air, puisque les <Abbr key="SPA" /> font
            souvent semblant de se comporter comme des <Abbr key="MPA" />. Les applications plus
            complexes et plus interactives ont tendance à être des <Abbr key="SPA" />.
          </p>
        </Remark>
        <Idea>
          <p>
            Le but d'une <Abbr key="SPA" /> est de se comporter plus comme un "vrai" programme
            natif, et d'éviter les rechargements complets de page.
          </p>
        </Idea>
        <Example pluralize>
          <ul>
            <li>
              WhatsApp Web, Facebook, Instagram, YouTube sont des <Abbr key="SPA" />
            </li>
            <li>
              Versions web de Teams, Word, Excel, Google Sheets sont des <Abbr key="SPA" />
            </li>
            <li>
              Wikipedia, Moodle, etc. sont des <Abbr key="MPA" />
            </li>
          </ul>
        </Example>
      </Slide>
      <Slide
        title={() => (
          <>
            Avantages des <Abbr key="SPA" />
          </>
        )}
      >
        <ul>
          <li>
            Les <Abbr key="SPA" /> sont <strong>plus rapides</strong> (après le premier chargement)
            puisqu'elles ne contactent le serveur spécifiquement que pour des informations
            manquantes.
          </li>
          <li>
            Les <Abbr key="SPA" /> surchargent moins le serveur puisque plus de travail est effectué
            côté client.
          </li>
          <li>
            Les <Abbr key="SPA" /> offrent plus de possibilités d'
            <Abbr key="UX" /> (scroll infini, offline mode, position du curseur, etc.)
          </li>
        </ul>
        <Remark>
          <p>
            Un argument clé pour l'emloi de l'usage des <Abbr key="SPA" /> est qu'elles sont faciles
            à créer avec des frameworks (comme React, Svelte, Angular, etc.)
          </p>
        </Remark>
      </Slide>
      <Slide title="Client-Side Routing">
        <Question>
          <p>
            Dans une <Abbr key="SPA" />, vous remarquerez que votre navigateur change d'
            <Abbr key="URL" /> mais pas de page. Pourquoi?
          </p>
        </Question>
        <Example>
          <p>
            Regardez vos conversations dans Facebook ou instagram. Rechargez la page. Ensuite faites
            la même chose avec WhatsApp Web. Que remarquez-vous?
          </p>
        </Example>
        <p>
          Cette technique s'appelle le <strong>client-side routing</strong>: on emploie le
          JavaScript pour faire semblant de changer de page.
        </p>
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
            Fonctionnement d'une <Abbr key="MPA" />
          </>
        )}
      >
        {mermaid`
          sequenceDiagram
            actor user as L'utilisateur
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
      <Slide
        title={() => (
          <>
            Fonctionnement d'une <Abbr key="SPA" />
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
            app ->> browser: Routing vers /about
            app -->> server: Requêtes (fetch)
            server -->> app: Réponses (JSON)
            Note over browser, server: Liens
            browser ->> app: demande /autre-page
            app ->> browser: Routing vers /autre-page
            app -->> server: Requêtes (fetch)
            server -->> app: Réponses (JSON)
        `}
        <Remark>
          <p>
            Au premier rendu, l'application renvoie une "shell page", c'est-à-dire une page blanche
            que avec du JavaScript. Ceci a une consequence pour le <Abbr key="SEO" />. Remarquons
            également qu'il y a plusieurs aller-retours pour la première requête.
          </p>
        </Remark>
      </Slide>
      <Slide
        title={() => (
          <>
            <Abbr key="MPA" /> vs <Abbr key="SPA" />
          </>
        )}
        columns
      >
        <div>
          <h2>
            <Abbr key="MPA" />
          </h2>
          <ul>
            <li>
              Rendu effectué côté <strong>serveur</strong>
            </li>
            <li>Premier rendu plus rapide</li>
            <li>Accessibilité</li>
            <li>
              Meilleur référencement (<Abbr key="SEO" />)
            </li>
            <li>Peut fonctionner sans JavaScript</li>
            <li>Moins de problèmes et de bugs</li>
          </ul>
        </div>
        <div>
          <h2>
            <Abbr key="SPA" />
          </h2>
          <ul>
            <li>
              Rendu effectué côté <strong>client</strong>
            </li>
            <li>Performance après le premier rendu</li>
            <li>
              Meilleure <Abbr key="UX" />
            </li>
            <li>Intégration plus simple avec d'autres applications/services</li>
            <li>Meilleure architecture si on veut rajouter une application mobile</li>
          </ul>
        </div>
      </Slide>
      <Slide
        title={() => (
          <>
            Le <Abbr key="SSR" />
          </>
        )}
      >
        <Question>
          <p>
            Serait-il possible d'avoir le meilleur des deux mondes et de combiner les avantages des{' '}
            <Abbr key="SPA" /> et des <Abbr key="MPA" />?
          </p>
        </Question>
        <Idea>
          <p>
            Le JavaScript est un langage de programmation qui peut s'exécuter côté serveur et côté
            client. On laisserait les <strong>deux côtés</strong> s'occuper du rendu.
          </p>
        </Idea>
      </Slide>
      <Slide
        title={() => (
          <>
            <Abbr key="SSR" />: fonctionnement
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
            server ->> server: Rendu de la page /about
            server ->> browser: Renvoi de la page /about prête
            server ->> browser: Envoi du JavaScript
            browser ->> browser: Hydration
            Note over browser, server: Liens
            browser ->> app: demande /autre-page
            app ->> browser: Routing vers /autre-page
            app -->> server: Requêtes (fetch)
            server -->> app: Réponses (JSON)
        `}
      </Slide>
    </Slideshow>
  )
}
