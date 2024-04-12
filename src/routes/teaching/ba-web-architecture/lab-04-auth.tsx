const meta: Metadata = {
  title: 'Authentification',
  subtitle: 'Labo 4',
  lang: 'fr',
  description: 'Hachage, cookies, et signature',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Objectifs">
        <p>
          Bien que ce travail soit normalement fait par des librairies, nous allons créer un système
          d'authentification dans le but de solidifier les acquis du cours théoriques.
        </p>
        <h3>Étapes</h3>
        <ul>
          <li>Formulaire HTML et authentification naïve</li>
          <li>Base de données</li>
          <li>Inscription</li>
          <li>Connexion</li>
          <li>Création de cookie de session</li>
          <li>Vérification du cookie</li>
        </ul>
      </Slide>
      <Slide title="Frontend">
        <Exercise>
          <p>
            Améliorez le code suivant dans <code>src/routes/login/+page.svelte</code>
          </p>
        </Exercise>
        {svelte.jupyter`
          <script>
            /** @type {import('./$types').PageData} */
            export let data;
            /** @type {import('./$types').ActionData} */
            export let form;
          </script>

          <form method="POST">
            <label>Email: <input name="email" type="email" /></label>
            <label>Password: <input name="password" type="password" /></label>
            <button formaction="?/login">Log in</button>
            <button formaction="?/register">Register</button>
          </form>

          {#if form?.success}
            <p>Successfully logged in!</p>
          {/if}
          {#if form?.incorrect}
            <p>Invalid credentials!</p>
          {/if}
        `}
      </Slide>
      <Slide title="Authentification simple">
        <p>
          Dans <code>src/routes/login/+page.server.js</code>
        </p>
        <div class="clickable">
          {js.hl`
            import { fail } from '@sveltejs/kit'

            /** @type {import('./$types').Actions} */
            export const actions = {
              login: async (event) => {
                const form = await event.request.formData();
                if (form.get('email') === 'admin@admin.com' && password === 'password') {
                  return { success: true }
                } else {
                  return fail(400, { incorrect: true })
                }
              },
            };
          `}
        </div>
      </Slide>
      <Slide title="Installation de Prisma">
        <pre class="clickable">
          {dedent`
            npm install prisma --save-dev
            npx prisma init --datasource-provider sqlite
          `}
        </pre>
      </Slide>
      <Slide title="Schéma de la base de données">
        <p>
          Dans le fichier <code>prisma/schema.prisma</code>
        </p>
        <pre class="clickable">
          {dedent`
            model User {
              id        Int     @id @default(autoincrement())
              email     String  @unique
              password  String
            }
          `}
        </pre>
        <p>
          Ensuite, lancez la commande{' '}
          <code class="clickable">npx prisma migrate dev --name init</code>
        </p>
        <p>
          Pour regarder les données en DB, utilisez la commande{' '}
          <code class="clickable">npx prisma studio</code>
        </p>
      </Slide>
      <Slide title="Inscription">
        <div class="clickable">
          {js.hl`
            import { PrismaClient } from '@prisma/client'
            const prisma = new PrismaClient()

            export const actions = {
              register: async (event) => {
                const form = await event.request.formData();
                await prisma.user.create({
                  data: {
                    email: form.get('email'),
                    password: form.get('password'),
                  }
                })
              }
            }
          `}
        </div>
      </Slide>
      <Slide title="Hachage">
        <Remark>
          <p>
            Stocker le mot de passe en clair n'est pas une bonne pratique. Il faut le saler et le
            hacher. Pour cela, nous utiliserons la librairie <strong>bcrypt</strong> (
            <code>npm install bcrypt</code>).
          </p>
        </Remark>
        {svelte.jupyter`
          <script>
            import bcrypt from 'bcryptjs'
            let password = ''
            $: hash = bcrypt.hashSync(password)
          </script>

          <input bind:value={password} />
          <pre>{hash}</pre>
        `}
        <Exercise>
          <p>Modifiez l'inscription pour que les mots de passe soient hachés en base de données.</p>
        </Exercise>
      </Slide>
      <Slide title="Connexion">
        <p>
          Pour l'authentification, on compare les mots de passe <strong>hachés</strong>.
        </p>
        {js.hl`
          const user = prisma.user.findUnique({ 
            where: { email: 'khoi@nguyen.me.uk' }
          })
          const correct = bcrypt.compareSync('hello', user.password)
        `}
        <Exercise>
          <p>Implémentez la connexion</p>
        </Exercise>
      </Slide>
      <Slide title="Création du cookie de session">
        <p>Dans une action, on peut utiliser</p>
        {js.hl`
          event.cookies.set(cookieName, cookieValue)
        `}
        <p>pour créer un cookie.</p>
        <p>
          Le but est de faire persister la session en créant une <strong>"carte d'identité"</strong>{' '}
          pour que l'utilisateur n'ait pas à se reconnecter.
        </p>
        <Remark>
          <p>N'oubliez pas que les cookies peuvent être faussés par l'utilisateur!</p>
        </Remark>
      </Slide>
      <Slide title="Signature du cookie">
        <Exercise>
          <p>
            Créez un <strong>cookie signé</strong> lorsque l'authentification est réussie.
          </p>
        </Exercise>
        <p>Nous créerons un cookie de la forme suivante:</p>
        {tex`
          \text{email};\text{signature}
        `}
        {js.hl`
          import bcrypt from 'bcryptjs'
          const email = 'khoi@nguyen.me.uk'
          const cookie = email + ';' + bcrypt.hashSync('secret' + cookie)
        `}
        {svelte.run`
          <script>
            import bcrypt from 'bcryptjs'
            let email = 'khoi@nguyen.me.uk'
            $: cookie = email + ';' + bcrypt.hashSync('secret' + cookie)
          </script>

          <p><label>Email: <input bind:value={email} /></label></p>
          Cookie: <code>{cookie}</code>
        `}
        <Remark>
          <p>Veillez à garder la clé secrète côté serveur!</p>
        </Remark>
      </Slide>
      <Slide title="Persistence">
        <p>Il reste maintenant à vérifier si l'utilisateur est connecté!</p>
        {js.hl`
          export async function load({ cookies }) {
            if (cookies.get('session')) {
              const [email, signature] = cookies.get('session').split(';')
              // Vérifier la signature
              // Retourner le nom 'utilisateur
              return { email }
            }
          }
        `}
      </Slide>
    </Slideshow>
  )
}
