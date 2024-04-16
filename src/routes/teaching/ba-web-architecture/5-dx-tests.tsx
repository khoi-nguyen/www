const meta: Metadata = {
  title: 'Tests et Expérience Développeur',
  subtitle: 'Chapitre 6',
  lang: 'fr',
  description: 'DX, tests unitaires et end-to-end',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Tests"></Slide>
      <Slide title="Tests unitaires">
        {js.jupyter`
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
