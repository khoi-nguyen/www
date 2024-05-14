const meta: Metadata = {
  title: 'Tests',
  subtitle: 'Labo 5',
  lang: 'fr',
  description: 'Tests unitaires et end-to-end',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Set up" columns>
        <Iframe src="https://testing-library.com/docs/svelte-testing-library/setup" />
        <div>
          <Instruction>
            <p>Exécutez les instructions de la section Vitest</p>
          </Instruction>
        </div>
      </Slide>
      <Slide title="Tests unitaire: compteur">
        <p>
          Créez un fichier <code>Counter.svelte</code> avec le code suivant.
        </p>
        {svelte.jupyter`
          <script>
            export let count = 0
          </script>

          <button on:click={() => count--}>-</button>
          {count}
          <button on:click={() => count++}>+</button>
        `}
      </Slide>
      <Slide title="Tests unitaires: exercices" columns>
        <Iframe src="https://testing-library.com/docs/svelte-testing-library/example" />
        <div>
          <Instruction>
            <p>Imaginez des tests unitaires pertinents pour le compteur et implémentez-les</p>
          </Instruction>
        </div>
      </Slide>
      <Slide title="End-to-end: installation de Playwright">
        <Iframe src="https://playwright.dev/docs/intro" />
      </Slide>
      <Slide title="Test end-to-end">
        <Iframe src="https://playwright.dev/docs/writing-tests" />
      </Slide>
      <Slide title="Exercice">
        <Instruction pluralize>
          <p>Écrivez un test end-to-end qui teste votre écran de login</p>
        </Instruction>
      </Slide>
    </Slideshow>
  )
}
