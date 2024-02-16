import { io } from 'socket.io-client'

const meta: Metadata = {
  title: 'SPA + SSR',
  subtitle: 'Labo 2',
  lang: 'fr',
  description: 'Composants, état',
  current: true,
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Objectif de la session">
        <p>
          Le but d'aujourd'hui est de créer une <Abbr key="SPA" /> (une messagerie instantannée)
          avec <Abbr key="SSR" />.
        </p>
        <Recall>
          <p>
            Une application <Abbr key="SPA" /> avec <Abbr key="SSR" /> se comporte:
          </p>
          <ul>
            <li>
              Comme une <Abbr key="MPA" /> au premier chargement
            </li>
            <li>
              Si l'utilisateur possède JavaScript, la page se convertit en une <Abbr key="SPA" />{' '}
              (on parle d'<em>hydration</em>)
            </li>
            <li>
              Pour le référencement et utilisateurs sans JavaScript, la page reste une{' '}
              <Abbr key="MPA" />
            </li>
          </ul>
        </Recall>
      </Slide>
      <Slide title="Installation de SvelteKit">
        <Instruction>
          <ol>
            <li>Créez un nouveau dossier pour le projet</li>
            <li>Ouvrez le avec Visual Studio</li>
            <li>Ouvrez le terminal</li>
            <li>
              <code>npm create svelte@latest</code>
              <ul>
                <li>Dans le dossier courant</li>
                <li>Pas de TypeScript</li>
              </ul>
            </li>
            <li>Suivez les instructions qu'ils vous donnent</li>
          </ol>
        </Instruction>
      </Slide>
      <Slide title="Client-Side Routing">
        <p>
          SvelteKit utilise une convention pour déterminer quel composant/fichier est employé en
          fonction de l'
          <Abbr key="URL" />.
        </p>
        {tex`
          \texttt{/votre/page} \to \texttt{src/routes/}
          \boxed{\texttt{votre/page}}
          \texttt{/+page.svelte}
        `}
        <Example>
          <ul>
            <li>{tex`\texttt{/} \to \texttt{src/routes/+page.svelte}`}</li>
            <li>{tex`\texttt{/about} \to \texttt{src/routes/about/+page.svelte}`}</li>
          </ul>
        </Example>
        <Exercise>
          <p>
            Créez-vous un petit site personnel avec au moins deux pages et des liens qui les
            relient.
          </p>
        </Exercise>
      </Slide>
      <Slide title="Layout">
        <Definition>
          <p>
            Dans SvelteKit, un <strong>layout</strong> est un composant qui contient la{' '}
            <strong>partie commune</strong> de plusieurs pages.
          </p>
        </Definition>
        <p>
          Un composant placé dans {tex`\texttt{src/routes/dossier/+layout.svelte}`} sera appliqué
          aux routes {tex`\texttt{dossier/*}`}. Ces composants doivent obligatoirement contenir une
          balise <code>&lt;slot /&gt;</code>.
        </p>
        <Example>
          <ul>
            <li>{tex`\texttt{src/routes/+layout.svelte}`} s'applique à tout le site</li>
            <li>
              {tex`\texttt{src/routes/blog/+layout.svelte}`} s'applique à tout le dossier blog
            </li>
          </ul>
        </Example>
        <Exercise>
          <p>Ajoutez une barre de navigation et un footer à votre site.</p>
        </Exercise>
      </Slide>
      <Slide title="Une application de messagerie: partie I">
        <Exercise>
          <p>
            Créez la base d'une application de messagerie. Elle doit afficher les messages provenant
            de la variable <code>messages</code> et contenir deux champs de texte et un bouton pour
            que l'utilisateur puisse préciser son nom et envoyer un message.
          </p>
        </Exercise>
        <p>
          Indication: regardez l'
          <A href="/teaching/ba-web-architecture/1-components#/24">exemple de la todo list</A>
        </p>
        {svelte.hl`
          <script>
            let messages = [
              {
                name: 'Tuxie',
                message: 'Hola, me shamo Tuxie, y vos? Cómo te shamás?',
              },
              {
                name: 'Khoi',
                message: 'Por qué hablas así? No hay pinguinos en Buenos Aires'
              }
            ]
            let message = ''
          </script>
        `}
      </Slide>
      <Slide title="Une application de messagerie: envoi de message" columns>
        <div>
          <p>
            Nous allons maintenant faire en sorte que vous puissiez{' '}
            <strong>envoyer un message.</strong>
          </p>
          <Exercise>
            <p>
              Quand vous cliquez sur le bouton envoyer, votre code doit effectuer une requête{' '}
              <code>POST</code> (via <code>fetch</code>) vers l'adresse
            </p>
            {tex`
            \texttt{https://nguyen.me.uk/api/messenger}
            `}
            <p>
              La requête <code>POST</code> doit contenir du <Abbr key="JSON" /> et préciser au moins
              les champs <code>name</code> et <code>message</code>.
            </p>
            <p>Si tout fonctionne bien, votre message devrait apparaître à droite.</p>
          </Exercise>
          <Remark>
            <p>N'hésitez pas à employer ChatGPT pour de l'aide</p>
          </Remark>
        </div>
        <div>
          <Chat />
        </div>
      </Slide>
      <Slide title="Application de messagerie: réception de message">
        <p>
          Normalement, un serveur ne fait que répondre aux requêtes du client. Pourtant, lorsque le
          serveur reçoit un message, il doit l'envoyer à tous les clients. Ceci se fait via les
          Websockets.
        </p>
        <Instruction>
          <ul>
            <li>
              Installez socket-io: <code>npm install socket.io-client</code>
            </li>
            <li>
              Dans la partie <code>script</code> de votre code, insérez le code suivant:
            </li>
          </ul>
        </Instruction>
        {js.hl`
          import { onMount } from 'svelte'
          import { io } from 'socket.io-client'

          let messages = []
          onMount(function () {
            const socket = io({
              path: 'https://nguyen.me.uk/api/messenger'
            })
            socket.on('message', (received) => {
              messages = [...messages, received]
            })
          })
        `}
      </Slide>
      <Slide title="Pistes d'amélioration">
        <ul>
          <li>Messages privés entre utilisateurs</li>
          <li>Améliorer l'interface</li>
          <li>Empêcher les messages vides, erreurs</li>
        </ul>
      </Slide>
    </Slideshow>
  )
}

interface Message {
  name: string
  message: string
}

function Chat() {
  const [messages, setMessages] = createStore<Message[]>([])
  const [message, setMessage] = createSignal('')
  const [name, setName] = createSignal('')

  onMount(() => {
    const socket = io({ path: '/api/messenger' })

    socket.on('message', (message: Message) => {
      setMessages([...messages, message])
    })
  })

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      fetch('/api/messenger', {
        method: 'POST',
        body: JSON.stringify({
          name: name(),
          message: message(),
        }),
      })
      setMessage('')
    }
  }

  return (
    <>
      <For each={messages}>
        {(message) => (
          <div class="block">
            <strong>{message.name}</strong>: {message.message}
          </div>
        )}
      </For>
      <p class="columns">
        <input
          value={name()}
          onInput={(e) => setName(e.target.value)}
          class="clickable is-1"
          placeholder="Name"
        />
        <input
          value={message()}
          onInput={(e) => setMessage(e.target.value)}
          class="clickable is-9"
          onKeyDown={handleKeyDown}
          placeholder="Message"
        />
      </p>
    </>
  )
}
