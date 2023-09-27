import meta from './6-functions.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Fonctions">
        <ul>
          <li>
            Une fonction est une relation associant à chaque nombre {tex`x`} au plus un nombre{' '}
            {tex`f(x)`} (si défini)
          </li>
          <li>
            <strong>Domaine</strong>: ensemble des nombres qui ont une valeur par la fonction
          </li>
          <li>
            <strong>Image</strong>: ensemble des valeurs atteintes
          </li>
          <li>
            Fonction <strong>paire</strong>: symmétrique en l'axe des {tex`y`}
          </li>
          <li>
            Fonction <strong>impaire</strong>: symmétrie centrale autour de l'origine
          </li>
          <li>Croissance: fonction n'affecte pas l'ordre</li>
        </ul>
      </Slide>
      <Slide title="Fonctions usuelles">
        <img
          src="https://www.onlinemathlearning.com/image-files/parent-functions.png"
          alt="Graphes des fonctions usuelles"
        />
      </Slide>
      <Slide title="Transformations de graphes" columns>
        <div>
          {tex`
            y = a f(bx + c) + d
          `}
          <ul>
            <li>Compression verticale de facteur {tex`b`}</li>
            <li>Translation horizontale de {tex`\frac{-c} b`}</li>
            <li>Étirement vertical de facteur {tex`a`}</li>
            <li>Translation verticale de {tex`d`}</li>
          </ul>
        </div>
        <div>
          <Iframe src="https://www.geogebra.org/calculator" width="100%" />
        </div>
      </Slide>
      <Slide title="Opérations de fonctions">
        <p>A partir de fonctions élémentaires, on peut en créer d'autres</p>
        {tex`
          (f \pm g)(x) = f(x) \pm g(x)\\
          (f \cdot g)(x) = f(x) g(x)\\
          \frac f g(x) = \frac {f(x)} {g(x)}\\
        `}
        <Definition title="Fonctions composées">
          {tex`
            (f \circ g)(x) = f(g(x))
          `}
        </Definition>
        <Example>
          <p>
            Si {tex`f(x) = x^2`} et {tex`g(x) = x - 3`}, trouver {tex`f \circ g`} et{' '}
            {tex`g \circ f`}.
          </p>
        </Example>
      </Slide>
      <Slide title="Limites: introduction">
        <p>Parfois, on aimerait calculer la valeur d'une fonction en dehors du domaine.</p>
        {tex`
          f(x) = \frac {x^3 - x} {x - 1}
        `}
        <Python>
          {py`
            import matplotlib.pyplot as plt
            import numpy as np
            x = np.linspace(0.9, 1.1, 1000)
            y = (x ** 3 - x) / (x - 1)
            plt.plot(x, y)
          `}
        </Python>
        <p>
          Dans l'exemple ci-dessus, {tex`f(1)`} n'a pas de sens, mais on peut parler de valeur de{' '}
          {tex`f(x)`} lorsque {tex`x`} <em>tend vers</em> {tex`1`}.
        </p>
        {tex`
          \lim_{x \to 1} f(x) = 2.
        `}
      </Slide>
      <Slide title="Limites en un réel">
        <Definition title="Limite en un réel">
          <p>
            On écrira
            {tex`
              \lim_{x \to a} f(x) = L
            `}
            si {tex`f(x)`} peut être arbitrairement proche de {tex`L`} en imposant seulement que{' '}
            {tex`x`} soit suffisament proche mais différent de {tex`a`}.
          </p>
        </Definition>
      </Slide>
      <Slide title="Continuité">
        <Definition title="Continuité">
          <p>
            Une fonction est <strong>continue</strong> en {tex`a`} si
          </p>
          {tex`
            \lim_{x \to a} f(x) = f(a).
          `}
        </Definition>
        <Remark>
          <p>
            On dira qu'une fonction est <strong>continue</strong> si elle est continue en tout point
            de son domaine.
          </p>
        </Remark>
      </Slide>
      <Slide title="Opérations sur les limites">
        <Proposition>
          <p>On a les propriétés suivantes:</p>
          {tex`
            \lim_{x \to a} (f(x) \pm g(x)) = \lim_{x \to a} f(x) \pm \lim_{x \to a} g(x)\\
            \lim_{x \to a} f(x)g(x) = \lim_{x \to a} f(x) \lim_{x \to a} g(x)\\
            \lim_{x \to a} \frac {f(x)} {g(x)} = \frac {\lim_{x \to a} f(x)} {\lim_{x \to a} g(x)}\\
          `}
          <p>à condition que le membre de droite ait un sens.</p>
        </Proposition>
        <Proposition>
          Si {tex`f`} est <strong>continue</strong>, alors
          {tex`
            \lim_{x \to a} f(g(x))
            = f\left( \lim_{x \to a} g(x) \right)
          `}
          si le membre de droit a un sens.
        </Proposition>
      </Slide>
      <Slide title="Limites en un réel: guide pratique">
        <Question>
          <p>Comment calculer {tex`\lim_{x \to a} f(x)`}?</p>
        </Question>
        <ul>
          <li>
            Essayer de remplacer {tex`x`} par {tex`a`}
          </li>
          <li>
            Le <strong>binôme conjugué</strong> est pratique pour se débarasser des racines
            embêtantes
          </li>
          <li>
            <strong>Factoriser et simplifier</strong> est la méthode principale pour lever les
            indéterminations
          </li>
          <li>
            Une expression "{tex`\frac k 0`}" tendra en général vers {tex`\pm \infty`}. On sépare
            gauche/droite et on utilise un tableau de signe.
          </li>
        </ul>
      </Slide>
      <Slide title="Limites: exemples">
        <Example>
          <p>Calculer les limites suivantes</p>
          {tex`
            \lim_{x \to 1} \frac {x - 1} {x^2 - 1}
            \qquad
            \lim_{x \to 3} \frac {2x} {x - 3}
            \qquad
            \lim_{t \to 0} \frac {\sqrt{t^2 + 9} - 3} {t^2}
          `}
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x = Symbol("x")
            limit((x - 1) / (x**2 - 1), x, 1)
            # limit(2 * x / (x - 3), x, 3, '-')
          `}
        </Jupyter>
      </Slide>
      <Slide
        title={() => (
          <>
            Théorème du <span class="emoji">🥪</span>
          </>
        )}
      >
        <Theorem title="Teorema del sándwich">
          {tex`
            \begin{cases}
              g(x) \leq f(x) \leq h(x)\\
              \lim_{x \to a} g(x) = \lim_{x \to a} h(x)
            \end{cases}
            \implies
            \lim_{x \to a} g(x) = \lim_{x \to a} f(x) = \lim_{x \to a} h(x)
          `}
        </Theorem>
        <Example>
          <p>Calcule la limite suivante:</p>
          {tex`
            \lim_{x \to 0} x^2 \sin \frac 1 x
          `}
        </Example>
      </Slide>
      <Slide title="Limites en l'infini">
        <p>
          Il suffit d'applique la règle de la <strong>plus haute puissance</strong>.
        </p>
        <Example>
          {tex`
            \lim_{x \to -\infty} \frac {\sqrt{x^2 + 3x - 2}} {x^2 + 3}
          `}
        </Example>
      </Slide>
      <Slide title="Asymptotes">
        <ul>
          <li>
            Limite infinie en un réel: asymptote verticale
            {tex`
              \lim_{x \to a^+} f(x) = \pm \infty
              \quad \text{or} \quad
              \lim_{x \to a^-} f(x) = \pm \infty
              \quad \implies \quad \text{AV} \equiv x = a
            `}
          </li>
          <li>
            Limite finie à l'infini: asymptote horizontale
            {tex`
              \lim_{x \to +\infty} f(x) = L
              \quad \text{or} \quad
              \lim_{x \to -\infty} f(x) = L
              \quad \implies \quad \text{AH} \equiv y = L
            `}
          </li>
        </ul>
      </Slide>
      <Slide title="Exercices: Transformations de graphes">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Algebra-and-Functions-2/Edexcel-Set-A/Transformations%20and%20Graphs.pdf" />
      </Slide>
      <Slide title="Exercices: composition et inverse">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Algebra-and-Functions-2/Edexcel-Set-B/Composite%20and%20Inverse%20Functions.pdf" />
      </Slide>
      <Slide title="Exercices: limites et asymptotes">
        <Iframe src="https://www.bibmath.net/ressources/index.php?action=affiche&quoi=bde/analyse/unevariable/limitecontinuite&type=fexo" />
      </Slide>
    </Slideshow>
  );
};
