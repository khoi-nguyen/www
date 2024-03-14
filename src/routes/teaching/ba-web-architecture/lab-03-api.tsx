const meta: Metadata = {
  title: 'API',
  subtitle: 'Labo 3',
  lang: 'fr',
  description: 'Composants, état',
  current: true,
}

function Die() {
  const [roll, setRoll] = createSignal<number | undefined>()

  function rollDie() {
    setRoll(Math.floor(Math.random() * 6) + 1)
  }

  return (
    <>
      <Button onClick={rollDie}>Roll</Button>
      <Show when={roll()}>
        <p>Result is {roll()}</p>
      </Show>
    </>
  )
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Objectif de la session">
        <ul>
          <li>
            Comprendre comment fonctionne les <Abbr key="API" />
          </li>
          <li>
            Consommer une <Abbr key="API" /> avec Postman ou avec fetch
          </li>
          <li>
            Employer un <Abbr key="ORM" />
          </li>
          <li>
            Comprendre les avantages architecturaux d'une <Abbr key="API" /> et des{' '}
            <Abbr key="ORM" />s
          </li>
        </ul>
      </Slide>
      <Slide title="Installation de SvelteKit">
        <p>Utilisez le dossier de la dernière fois, ou créez un nouveau projet.</p>
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
      <Slide title="Postman">
        <Instruction>
          <ol>
            <li>
              Installez <a href="https://www.postman.com/">Postman</a> qui vous permettra de tester
              vos <Abbr key="API" />
              s.
            </li>
            <li>
              Dans le fichier <code>svelte.config.js</code> de votre projet, assurez-vous d'avoir
              {js.hl`
                const config = {
                  kit: {
                    adapter: adapter(),
                    csrf: {
                      checkOrigin: false,
                    }
                  },
                }
              `}
            </li>
          </ol>
        </Instruction>
      </Slide>
      <Slide title="Une première API" columns>
        <Idea>
          <p>
            Pour ouvrir le point d'entrée <code>/api/une/adresse/arbitraire</code>, créez une
            fonction exportable <code>GET</code> dans le fichier{' '}
            <code>/src/routes/api/une/adresse/arbitraire/+server.js</code>.
          </p>
          {ts.hl`
            import { json } from '@sveltejs/kit';

            export function GET() {
              // Remplacez par la valeur que vous voulez renvoyer
              const value = 3

              return json(value);
            }
          `}
        </Idea>
        <div>
          <Exercise>
            <ol>
              <li>
                Créez une <Abbr key="API" /> de telle sorte qu'une requête{' '}
                <code>GET /api/roll</code> vous donne un nombre aléatoire entre 1 et 6.
              </li>
              <li>Testez votre code avec Postman</li>
              <li>
                Ensuite, créer une page qui possède un bouton appelant cette <Abbr key="API" />
              </li>
            </ol>
          </Exercise>
          <Die />
        </div>
      </Slide>
      <Slide title="Todo app">
        <Exercise>
          <p>
            Créez une <Abbr key="API" /> pour une todo list.
          </p>
          <ul>
            <li>
              <code>GET /api/todos</code> doit lister la liste des tâches
            </li>
            <li>
              <code>POST /api/todos</code> doit permetre l'ajout d'une nouvelle tâche
            </li>
            <li>
              <code>DELETE /api/todos/0</code> doit supprimer la première tâche
            </li>
            <p>
              Créez ensuite une application qui appelle cette <Abbr key="API" />
            </p>
          </ul>
        </Exercise>
        <p>
          Maintenez la liste des tâches dans le fichier <code>src/todos.js</code>:
        </p>
        {js.hl`
          export const todos = []
        `}
        <Remark>
          <ul>
            <li>
              Pour récupérer les données d'un formulaire, utilisez{' '}
              <code>await event.request.json()</code> si <code>event</code> est le nom du paramètre
              de la fonction <code>POST</code>.
            </li>
            <li>
              Pour l'id de la tâche, elle se récupère via <code>event.params.id</code>
            </li>
          </ul>
        </Remark>
      </Slide>
      <Slide title="Persistence des données" columns>
        <div>
          <p>
            Nous allons maintant employer un <Abbr key="ORM" /> pour stocker les tâches dans une
            base de données
          </p>
          <Instruction pluralize>
            <ol>
              <li>
                Installez Prisma
                <Editor lang="bash">
                  {dedent`
                    npm install prisma --save-dev
                    npx prisma init --datasource-provider sqlite 
                  `}
                </Editor>
              </li>
              <li>
                Spécifiez le format de votre base de données en ajoutant ceci dans{' '}
                <code>prisma/schema.prisma</code>:
                <pre>
                  {dedent`
                    model Task {
                      id Int @id @default(autoincrement())
                      task String
                    }
                  `}
                </pre>
              </li>
              <li>
                Demandez à Prisma de générer la DB:
                {js.hl`
                  npx prisma migrate dev --name init
                `}
              </li>
            </ol>
          </Instruction>
        </div>
        <div>
          <Exercise>
            <p>Adaptez l'exercice précédent pour qu'il fonctionne avec une base de données.</p>
          </Exercise>
          {js.hl`
            import { PrismaClient } from '@prisma/client'
            const prisma = new PrismaClient()
            // Récupérer les tâches
            await prisma.task.findMany()
            // Créer une tâche
            const task = await prisma.task.create({
              data: {
                task: 'Buy milk',
              }
            })
            // Suppression
            const deletedTask = await prisma.task.delete({
              where: {
                id: 34,
              }
            })
          `}
        </div>
      </Slide>
    </Slideshow>
  )
}
