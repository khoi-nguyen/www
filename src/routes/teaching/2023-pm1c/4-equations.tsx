import meta from './4-equations.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Identités remarquables">
        <Proposition title="Identités remarquables">
          {tex`
            (a \pm b)^2 = a^2 \pm 2 ab + b^2\\
            a^2 - b^2 = (a - b) (a + b)
          `}
        </Proposition>
        <Jupyter>
          {py`
            from sympy import *
            a, b = symbols("a b")
            expand((a + b) ** 2)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Équations simples">
        <p>
          Lorsque {tex`x`} apparaît qu'une seule fois (potentiellement après une manipulation
          algébrique simple), il suffit d'<strong>isoler</strong>.
        </p>
        <Example pluralize>
          <ol>
            <li>{tex`3 x + 7 = 11`}</li>
            <li>{tex`2 x + 4 = x - 2`}</li>
            <li>{tex`x^2 + 7 = 3`}</li>
            <li>{tex`(x - 2)^2 = 16`}</li>
          </ol>
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x = Symbol("x")
            solve(Eq(3 * x + 7, 11))
          `}
        </Jupyter>
      </Slide>
      <Slide title="Factorisation">
        <p>
          Pour les équations complexes, la règle du <em>produit nul</em> est utile:
        </p>
        {tex`
          x y = 0 \implies x = 0 \quad \text{or} \quad y = 0.
        `}
        <Example>
          <p>Résoudre l'équation</p>
          {tex`
            (x + 2) (x^2 - 4) (e^x - 4) = 0
          `}
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x = Symbol("x")
            solve((x + 2) * (x ** 2 - 9) * (exp(x) - 4))
          `}
        </Jupyter>
      </Slide>
      <Slide title="Équations du second degré: factorisation">
        <Proposition title="Somme-Produit">
          {tex`
            (x + \alpha) (x + \beta)
            = x^2 + \underbrace{(\alpha + \beta)}_{\text{somme}} x
            + \underbrace{\alpha \beta}_{\text{produit}}
          `}
        </Proposition>
        <Jupyter>
          {py`
            from sympy import *
            x, alpha, beta = symbols("x alpha beta")
            expand((x + alpha) * (x + beta))
          `}
        </Jupyter>
        <Example pluralize>
          <p>Factoriser les membres de gauche et résolvez les équations:</p>
          <ol>
            <li>{tex`x^2 + 5x + 6 = 0`}</li>
            <li>{tex`x^2 - x - 12 = 0`}</li>
            <li>{tex`x^2 - 3x + 2 = 0`}</li>
          </ol>
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x = Symbol("x")
            factor(x ** 2 + 5 * x + 6)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Équations du second degré: formule quadratique">
        <p>
          Méthode préférée des étudiants car on peut éteindre son cerveau et déléguer le travail à
          la calculatrice.
        </p>
        <Proposition title="Formule quadratique">
          {tex`
            ax^2 + bx + c = 0
            \implies
            \boxed{
              x = \frac {-b \pm \sqrt {b^2 - 4ac}} {2a}
            }
          `}
        </Proposition>
        <p>
          Si seules les <strong>solutions réelles</strong> nous intéressent, l'équation a
        </p>
        <ul>
          <li>
            <strong>aucune solution</strong> si {tex`\Delta \defeq b^2 - 4ac < 0`}
          </li>
          <li>
            <strong>1 solution</strong> si {tex`\Delta = 0`}.
          </li>
          <li>
            <strong>2 solution</strong> si {tex`\Delta > 0`}.
          </li>
        </ul>
      </Slide>
      <Slide title="Formule quadratique: exemples">
        <Example>
          <p>Sachant que l'équation</p>
          {tex`
            kx^2 + (4 k + 1) x + (3k + 1) = 0
          `}
          <p>possède une solution, trouver la valeur de {tex`k`}.</p>
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            k = Symbol("k")
            a, b, c = k, 4 * k + 1, 3 * k + 1
            solve(b ** 2 - 4 * a * c)
          `}
        </Jupyter>
        <Example>
          <p>
            L'équation {tex`x^2 + 4kx + 3k = 0`} possède deux solutions. Prouver que{' '}
            {tex`k (4k - 3) > 0`} et déduire les valeurs possibles pour {tex`k`}.
          </p>
        </Example>
      </Slide>
      <Slide title="Système de deux équations à deux inconnues">
        <Example pluralize>
          {tex`
            \begin{cases}
              y = 2x - 3\\
              x^2 + y^2 = 2
            \end{cases},
            \qquad
            \begin{cases}
              3x + 2y = 7\\
              4x - 3y = 15
            \end{cases}
          `}
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x, y = symbols("x y")
            solve([Eq(y, 2 * x - 3), Eq(x**2 + y**2, 2)], [x, y])
          `}
        </Jupyter>
      </Slide>
      <Slide title="En dimension supérieure">
        <Example>
          {tex`
            \begin{cases}
              x - 3y - 6z = -16\\
              2x + 3y + 5z = 0\\
              -4x + 3y + 4z = 20
            \end{cases}
          `}
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x, y, z = symbols("x y z")
            solve([
                Eq(x - 3 * y - 6 * z, -16),
                Eq(2 * x + 3 * y + 5 * z, 0),
                Eq(-4 * x + 3 * y + 4 * z, 20)
            ], [x, y, z])
          `}
        </Jupyter>
        <ol>
          <li>Transformer en une matrice</li>
          <li>Obtenir une matrice échelonnée</li>
          <li>Résoudre le système échelonné</li>
        </ol>
      </Slide>
      <Slide title="Système avec paramètre">
        <Example>
          {tex`
            \begin{cases}
              3x + y - z = 1\\
              x - 2y + 2z = m\\
              x + y - z = 1
            \end{cases}
          `}
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x, y, z, m = symbols("x y z m")
            solve([
              3*x + y - z - 1,
              x - 2*y + 2*z - m,
              x + y - z - 1
            ], [x, y, z, m])
          `}
        </Jupyter>
      </Slide>
      <Slide title="Système avec paramètre">
        <Example>
          {tex`
            \begin{cases}
              ax + (1 - a)y + (1 - a)z = a^2\\
              ax + (1 + a)y + (1 + a)z = a - a^2\\
              x + y + z = 1 - a
            \end{cases}
          `}
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x, y, z, a = symbols("x y z a")
            solve([
              Eq(a * x + (1 - a) * y + (1 - a) * z, a ** 2),
              Eq(a * x + (1 + a) * y + (1 + a) * z, a - a ** 2),
              Eq(x + y + z, 1 - a),
            ], [x, y, z])
          `}
        </Jupyter>
      </Slide>
      <Slide title="Systèmes: interprétation" columns>
        <div>
          <p>
            Dans un système de deux équations à deux inconnues, chaque équation représente une
            droite. La solution du système est l'intersection.
          </p>
          <Example>
            {tex`
              \begin{cases}
                x + y &= 2\\
                x - y &= 0
              \end{cases}
            `}
          </Example>
        </div>
        <div>
          <Jupyter>
            {py`
              import matplotlib.pyplot as plt
              import numpy as np
              x = np.linspace(-5, 5, 100)
              y1 = 2 - x
              y2 = x
              plt.plot(x, y1, x, y2)
            `}
          </Jupyter>
        </div>
      </Slide>
      <Slide title="Systèmes: cas possibles en dimensions 2 et 3">
        <p>
          <img src="https://math.libretexts.org/@api/deki/files/7563/11.3.2.png?revision=1" />
        </p>
        <p>
          <img src="https://math.libretexts.org/@api/deki/files/7564/11.3.3.png?revision=1" />
        </p>
      </Slide>
      <Slide title="Questions de niveau examen: discriminant">
        <Iframe src="https://www.mathsgenie.co.uk/resources/as-pure-the-discriminant.pdf" />
      </Slide>
      <Slide title="Questions de niveau examen: systèmes">
        <Iframe src="https://s3.amazonaws.com/algebra-worksheets/Matrix-Algebra-Tutor/Matrix+Algebra+tutor+-+Workdheet+5+-+Gaussian+Elimination+and+Gauss-Jordan+Elimination.pdf" />
      </Slide>
    </Slideshow>
  );
};
