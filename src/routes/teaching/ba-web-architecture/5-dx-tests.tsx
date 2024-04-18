const meta: Metadata = {
  title: 'Tests et Expérience Développeur',
  subtitle: 'Chapitre 6',
  lang: 'fr',
  description: 'DX et tests ',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Outline">
        <ul>
          <li>Type safety: TypeScript</li>
          <li>Tests</li>
          <li>Contrôle de version et intégration</li>
        </ul>
      </Slide>
      <Slide title="Type Safety">
        <p>Le JavaScript est lentement remplacé par le TypeScript.</p>
        <Figure
          src="state-dev-ecosystem-2023.png"
          alt="Use of technologies over time"
          height={800}
        />
      </Slide>
      <Slide title="TypeScript">
        <Definition>
          <p>
            TypeScript est un superset de JavaScript avec des annotations de types. Il est ensuite
            retransformé en JavaScript.
          </p>
        </Definition>
        <Question>
          <p>Pourquoi employer TypeScript?</p>
        </Question>
        <ul>
          <li>Permet aux éditeurs de texte de guider le programmeur</li>
          <li>Le compilateur peut repérer des erreurs à l'avance</li>
          <li>Permet de structurer la communication de données</li>
        </ul>
      </Slide>
      <Slide title="GraphQL vs REST">
        <Recall>
          <p>
            GraphQL et <Abbr key="REST" /> sont deux styles d'
            <Abbr key="API" />
          </p>
        </Recall>
        <p>
          Un avantage non-négligeable de GraphQL est le typage. Même si l'
          <Abbr key="API" /> est externe ou écrite en un autre langage, il existe des outils pour
          générer des annotations TypeScript.
        </p>
      </Slide>
      <Slide title="Tests">
        <p>Il existe plusieurs types de tests</p>
        <ul>
          <li>
            Tests <strong>unitaires</strong>: concerne une petite portion de code (unité) (e.g.
            fonction)
          </li>
          <li>
            Tests d'<strong>intégration</strong>: vérifie comment plusieurs portions de code se
            comportent (i.e. fonctionnalité)
          </li>
          <li>
            Tests <strong>end-to-end</strong>: fonctionnalité et performance de l'
            <strong>application entière</strong> en simulant des scénarios réels
          </li>
        </ul>
      </Slide>
      <Slide title="Tests unitaires: pourquoi?">
        <Question pluralize>
          <p>Pourquoi écrire des tests unitaires?</p>
        </Question>
        <ul>
          <li>
            Repère les erreurs <strong>plus tôt</strong> dans le cycle de développement
          </li>
          <li>Force les développeurs à découper leur code</li>
          <li>Filet de sécurité contre les régressions en cas de modifications</li>
          <li>Est une forme de documentation et spécification développeur</li>
        </ul>
      </Slide>
      <Slide title="Tests unitaires: interface utilisateur">
        <Example>
          <p>Voici un exemple de test unitaire.</p>
        </Example>
        {js.hl`
          test('Le compteur fonctionne', async function() {
            render(Counter, {value: 5})
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            expect(button).toHaveTextContent('5')

            const user = userEvent.setup()
            await user.click(button)
            expect(button).toHaveTextContent('6')
          })
        `}
        <Question>
          <p>Quel est le but du test unitaire ci-dessus?</p>
        </Question>
        <Remark>
          <p>
            L'arrivée des frameworks de composants a fortement simplifié le développement de tests
            unitaires.
          </p>
        </Remark>
      </Slide>
      <Slide title="Mocking">
        <p>
          Parfois, il est utile de <strong>simuler</strong> des interactions pour cibler un test ou
          pour des raisons de performances.
        </p>
        {js.hl`
        const server = setupServer(
          http.get('/greeting', () => {
            return HttpResponse.json({greeting: 'hello there'})
          }),
        )

        beforeAll(() => server.listen())
        afterEach(() => server.resetHandlers())
        afterAll(() => server.close())

        test('loads and displays greeting', async () => {
          render(<Fetch url="/greeting" />)

          fireEvent.click(screen.findByRole('button'))

          const greeting = screen.findByRole('heading')
          await greeting
          await screen.findByRole('heading')
          expect(greeting).toHaveTextContent('hello there')
        })
        `}
      </Slide>
      <Slide title="Tests end-to-end">
        <p>
          Teste <strong>toute l'application</strong>.
        </p>
        {js.hl`
          test('has title', async ({ page }) => {
            await page.goto('https://playwright.dev/');
            await expect(page).toHaveTitle(/Playwright/);
          });

          test('get started link', async ({ page }) => {
            await page.goto('https://playwright.dev/');
            await page.getByRole('link', { name: 'Get started' }).click();
            await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
          });
        `}
      </Slide>
      <Slide title="Contrôle de version et intégration">
        <Question>
          <p>Comment et quand sont exécutés les tests?</p>
        </Question>
        <p>
          Ils sont normalement exécutés lorsque on pousse du code sur le système de contrôle de
          version.
        </p>
        <h3>Déroulement classique</h3>
        <ul>
          <li>Le développeur développe une fonctionnalité sur sa branche</li>
          <li>Elle ou il écrit des tests pour sa fonctionnalité</li>
          <li>Elle ou il pousse sa branche</li>
          <li>Les tests sont exécutés</li>
          <li>
            Si les tests sont réussis, la fonctionnalité est intégrée dans la branche principale
          </li>
        </ul>
      </Slide>
    </Slideshow>
  )
}
