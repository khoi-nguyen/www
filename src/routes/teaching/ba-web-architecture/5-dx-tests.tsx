const meta: Metadata = {
  title: 'Tests et Expérience Développeur',
  subtitle: 'Chapitre 6',
  lang: 'fr',
  description: 'DX, tests unitaires et end-to-end',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Tests">
        <p>Il existe plusieurs types de tests</p>
        <ul>
          <li>
            Tests <strong>unitaires</strong>: concerne une petite portion de code (unité)
          </li>
          <li>
            Tests d'<strong>intégration</strong>
          </li>
          <li>
            Tests <strong>end-to-end</strong>: fonctionnalité et performance de l'application
            entière en simulant des scénarios réels
          </li>
        </ul>
      </Slide>
      <Slide title="Tests unitaires">
        <Example>
          <p>Voici un exemple de test unitaire</p>
        </Example>
        {js.hl`
          import { describe, test, expect } from 'vitest'

          describe("My first group of tests", function () {
            test("My first test", function () {
              expect(1 + 3).equal(4)
            })
          });
        `}
      </Slide>
      <Slide title="Tests end-to-end"></Slide>
      <Slide title="Type Safety"></Slide>
    </Slideshow>
  )
}
