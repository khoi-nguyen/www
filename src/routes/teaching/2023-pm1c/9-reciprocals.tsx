import meta from './9-reciprocals.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Injectivité et inversibilité">
        <Definition>
          <p>
            Une fonction est <strong>injective</strong> ssi
          </p>
          {tex`
            x_1 \neq x_2
            \implies f(x_1) \neq f(x_2)
          `}
        </Definition>
        <Remark>
          <p>Une fonction est inversible ssi elle est injective.</p>
        </Remark>
      </Slide>
      <Slide title="Fonctions réciproques">
        <Proposition>
          <p>Dérivée</p>
          {tex`
            (f^{-1})'(x) = 
            \frac 1 { f'(f^{-1}(x)) }
          `}
        </Proposition>
      </Slide>
      <Slide title="Arcsin">
        <Definition>
          <p>
            La fonction {tex`\arcsin`} est la réciproque de {tex`\sin x`} restreinte à{' '}
            {tex`[-\pi/2, \pi/2]`}
          </p>
        </Definition>
        <Geogebra id="sU9ejBpP" />
      </Slide>
      <Slide title="Arccos">
        <Definition>
          <p>
            La fonction {tex`\arccos`} est la réciproque de {tex`\cos x`} restreinte à{' '}
            {tex`[0, \pi]`}
          </p>
        </Definition>
        <Geogebra id="FecpCqjW" />
      </Slide>
      <Slide title="Arctangente">
        <Definition>
          <p>
            La fonction {tex`\arctan`} est la réciproque de {tex`\tan x`} restreinte à{' '}
            {tex`[-\pi/2, \pi/2]`}
          </p>
        </Definition>
        <Geogebra id="wzAjzaEt" />
      </Slide>
      <Slide title="Théorème de l'Hôpital">
        <Proposition>
          <p>
            Soient {tex`f`} et {tex`g`} deux fonctions telles que
          </p>
          {tex`
            \lim_{x \to a} f(x) = \lim_{x \to a} g(x) =
            \begin{cases}
              0\\ \pm \infty
            \end{cases}
          `}
          <p>Alors on a</p>
          {tex`
            \lim_{x \to a} \frac {f(x)} {g(x)}
            = \lim_{x \to a} \frac {f'(x)} {g'(x)}
          `}
          <p>à condition que la limite à droite existe (elle peut être infinie) et ait un sens.</p>
        </Proposition>
        <Example pluralize>
          <p>Calculer les limites suivantes:</p>
          {tex`
            \lim_{x \to 0} \frac {\sin x} x,
            \quad
            \lim_{x \to 0} \frac {1 - \cos x} {x^2},
            \quad
            \lim_{x \to +\infty} \left(1 + \frac a x\right)^x
          `}
        </Example>
      </Slide>
      <Slide title="The limit does not exist">
        <Exercise>
          {tex`
            \lim_{x \to 0} \frac {\ln (1 - x) - \sin x} {1 - \cos^2 x}
          `}
        </Exercise>
        <Youtube src="https://www.youtube.com/watch?v=oDAKKQuBtDo" />
        <Quote title="Lindsay Lohan">
          <p>
            Calling somebody fat doesn't make you any skinnier, calling somebody stupid doesn't make
            you any smarter [...] If the limit never approaches everything, the limit does not
            exist!
          </p>
        </Quote>
      </Slide>
      <Slide title="Exercices">
        <Iframe src="https://www.math.cmu.edu/~bkell/lhopital.pdf" />
      </Slide>
      <Slide title="Équations différentielles">
        <p>Suppose que {tex`f(x) = e^{\lambda x}`}. Montrer que</p>
        {tex`
          a f'' + b f' + c f = 0
          \iff a \lambda^2 + b \lambda + c = 0.
        `}
        <Example>
          <p>Trouve deux solutions à l'équation</p>
          {tex`
            2 \frac {\dd^2 y} {\dd x^2}
            + 5 \frac {\dd y} {\dd x}
            + 3 y = 0.
          `}
        </Example>
        <Remark>
          <p>
            Le polynôme du second degré associée à une équation différentielle s'appelle le{' '}
            <strong>polynôme caractéristique</strong>.
          </p>
        </Remark>
      </Slide>
      <Slide title="Équations différentielles et racines doubles">
        <Proposition>
          <p>
            Si l'équation charactéristique admet une solution double {tex`\lambda`}, les solutions
            sont données par
          </p>
          {tex`
            e^{\lambda x}, \quad x e^{\lambda x}
          `}
        </Proposition>
        <Example>
          <p>Trouve deux solutions à l'équation</p>
          {tex`
            \frac {\dd^2 y} {\dd x^2}
            - 6 \frac {\dd y} {\dd x}
            + 9 y = 0.
          `}
        </Example>
      </Slide>
      <Slide title="Équations différentielles et racines complexes">
        <p>
          Quand les racines sont complexes, il est utile d'appliquer la formule d'Euler pour revenir
          à deux solutions réelles.
        </p>
        <Example>
          <p>Trouve deux solutions réelles à l'équation</p>
          {tex`
            \frac {\dd^2 y} {\dd x^2}
            - 6 \frac {\dd y} {\dd x}
            + 34 y = 0.
          `}
        </Example>
      </Slide>
      <Slide title="Exercises">
        <Iframe src="https://www.salfordphysics.com/gsmcdonald/H-Tutorials/second-order-differential-equations-homog.pdf" />
      </Slide>
      <Slide title="C'est fini">
        <p>
          Voici une larme versée pour <s>chacunes de vos copies</s> chacun·e de vous.
        </p>
        {[...Array(451).keys()].map((_) => (
          <span class="emoji">😭</span>
        ))}
        <p>(Ne partez pas, je parle juste de la matière)</p>
      </Slide>
      <Slide title="Trigonométrie">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Trigonometry-2/OCR-Set-A/Further%20Trigonometric%20Identities%20and%20Equations.pdf" />
      </Slide>
    </Slideshow>
  );
};
