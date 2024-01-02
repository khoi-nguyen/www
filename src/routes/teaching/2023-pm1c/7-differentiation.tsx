import meta from './7-differentiation.json'

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Anni Mirabiles">
        <ul>
          <li>
            1666 (Newton): calcul différentiel et intégral, la loi universelle de la gravitation,
            optique, équations du mouvement.
          </li>
          <li>
            1905 (Einstein): effet photoélectrique, mouvements Browniens, relativité,{' '}
            {tex`E = mc^2`}
          </li>
          <li>1972: naissance de Zidane, Rivaldo, Figo et Nedved</li>
          <li>
            2023: Marius Joly, David Annenkoff, Rolando Guerrieri, Jonas Marchal mettent un
            auditoire entier en échec. Le nom de Khoi Nguyen apparaît sur la liste des meilleurs
            scores d'un minigolf à Woluwe-Saint-Lambert.
          </li>
        </ul>
      </Slide>
      <Slide title="Einstein à propos de ce chapitre">
        <Quote title="Albert Einstein">
          <p>
            In order to put his system into mathematical form at all, Newton had to devise the
            concept of <strong>differential quotients</strong> and propound the laws of motion in
            the form of <strong>total differential equations</strong>—perhaps the{' '}
            <strong>greatest advance in thought</strong> that a single individual was ever
            privileged to make.
          </p>
        </Quote>
      </Slide>
      <Slide title="Zidane à propos d'Einstein">
        <Quote title="Zizou à propos d'Enstein">
          <p>
            "Vous savez, l'annus mirabilis d'Einstein en 1905, c'était{' '}
            <strong>vraiment exceptionnel</strong>. Ce Monsieur Einstein a{' '}
            <strong>révolutionné la physique</strong>, apportant des idées qui ont changé notre
            compréhension de l'univers, <strong>tout comme mon fameux coup de boule</strong> en 2006
            a changé la façon dont nous nous souvenons de la Coupe du Monde . C'était un moment où
            tout a basculé, à la fois pour lui et pour moi.
          </p>
        </Quote>
        <Quote title="Newton à propos d'Enstein">
          <p>
            What Einstein did was a good step. I would have added much several ways, had I been
            acquainted with Jimmy's works.{' '}
            <strong>
              If he hath seen further than me, it is by standing on my giant shoulders
            </strong>
            . They are still very sore and I need a backrub.
          </p>
        </Quote>
        <p>La véracité de la dernière citation </p>
      </Slide>
      <Slide title="Vers la dérivée" columns>
        <div>
          <Geogebra id="vtykgtna" />
          <Question>
            <p>Comment définir la pente en un point d'une courbe?</p>
          </Question>
          <ol>
            <li>On approxime la courbe en ce point par une droite sécante</li>
            <li>On calculce la pente de cette droite</li>
            <li>On améliore notre approximation en rapprochant le second point du premier</li>
          </ol>
        </div>
        <div></div>
      </Slide>
      <Slide title="Nombre dérivé">
        <Definition title="Nombre dérivé">
          {tex`
            f'(a) \defeq \lim_{x \to a} \frac {f(x) - f(a)} {x - a}
          `}
        </Definition>
        <Example>
          <ul>
            <li>
              Si {tex`f(x) = mx + p`}, alors {tex`f'(a) = m`}
            </li>
            <li>
              Si {tex`f(x) = x^2`}, alors {tex`f'(a) = 2a`}
            </li>
          </ul>
        </Example>
        <p>
          Autres notation: {tex`\frac {\dd f} {\dd x}`}, {tex`\dot f`}.
        </p>
      </Slide>
      <Slide title="Interprétation">
        <p>
          La dérivée donne la <strong>pente</strong> du graphe en chaque point. D'une certaine
          manière, elle décrit l'inclinaison de votre pied si vous marchez sur le graphe de gauche à
          droite.
        </p>
        <Python>
          {py.raw`
            import matplotlib.pyplot as plt
            import numpy as np
            x = np.linspace(0.5, 10, 1000)
            y = (x + 1)**2 * np.sin(x)
            plt.plot(x, y)
          `}
        </Python>
        <Question>
          <p>Que se passe-t-il aux sommets ou dans les vallées?</p>
        </Question>
      </Slide>
      <Slide title="Dérivée des fonctions usuelles">
        <Theorem>
          {tex`
            \begin{align*}
              (x^n)' &= n x^{n - 1}\\
              \sin' x &= \cos x\\
              \cos' x &= -\sin x\\
              \tan' x &= \frac 1 {\cos^2 x}\\
              \cot' x &= -\frac 1 {\sin^2 x}\\
              (e^x)' &= e^x\\
              (a^x)' &= (\ln a) a^x\\
              \ln' x &= \frac 1 x\\
              \log_a' x &= \frac {1} {x \ln a}
            \end{align*}
          `}
        </Theorem>
      </Slide>
      <Slide title="Examples: dérivées">
        <Exercise>
          <p>
            Trouver les points de la courbe {tex`y = x^4 - 6x^2 + 4`} où la tangente est
            horizontale.
          </p>
        </Exercise>
        <Exercise>
          <p>
            L'équation du mouvement d'une particule est {tex`s = 2t^3 - 5t^2 + 3t + 4`} où {tex`s`}{' '}
            est mesurée en centimètres et {tex`t`} en secondes. Trouver l'accélération comme une
            fonction du temps. Que vaut l'accélérations après deux secondes?
          </p>
        </Exercise>
        <Exercise title="MRUA">
          Si la position est donnée par {tex`x = x_0 + v_0 t + \frac 1 2 a t^2`}, calcule
          l'accélération.
        </Exercise>
      </Slide>
      <Slide title="Dérivée et opérations de fonctions">
        <Theorem>
          {tex`
            \begin{align*}
              (f \pm g)'(x) &= f'(x) \pm g'(x)\\
              (f \cdot g)'(x) &= f'(x) g(x) + f(x) g'(x)\\
              \left(\frac f g\right)'(x) &=
                \frac{
                  f'(x) g(x) - f(x) g'(x)
                } {
                  g^2(x)
                }\\
              (f \circ g)'(x) &= f'(g(x)) g'(x)\\
            \end{align*}
          `}
        </Theorem>
        <Jupyter>
          {py.raw`
            from sympy import *
            x = Symbol("x")
            y = x**2 * sin(x)
            diff(y, x)
          `}
        </Jupyter>
        <Example>
          <p>Dériver les fonctions suivantes:</p>
          <ol>
            <li>{tex`f_1(x) = x^2 \sin x`}</li>
            <li>{tex`f_2(x) = \frac {x^2 + x - 2} {x^3 + 6}`}</li>
            <li>{tex`f_3(x) = \sqrt {x^2 + 1}`}</li>
            <li>
              {tex`f_4(x) = \sin^2 x`} et {tex`f_5(x) = \sin(x^2)`}
            </li>
          </ol>
        </Example>
      </Slide>
      <Slide title="Plus d'exemples">
        <Exercise>
          <p>Dériver les fonctions suivantes:</p>
          {tex`
            g(t) = \left(\frac {t - 2} {2t + 1}\right)^9,
            \quad
            f(x) = (2x + 1)^5 (x^3 - x + 1)^4
          `}
        </Exercise>
      </Slide>
      <Slide title="Dérivée et croissance">
        <Theorem>
          <p>
            Soit {tex`f`} une fonction dérivable sur {tex`[a, b]`}.
          </p>
          <ul>
            <li>
              {tex`f`} est <strong>croissante</strong> sur {tex`[a, b]`} ssi {tex`f' \geq 0`} sur
              cet intervalle
            </li>
            <li>
              {tex`f`} est <strong>décroissante</strong> sur {tex`[a, b]`} ssi {tex`f' \leq 0`} sur
              cet intervalle
            </li>
            <li>
              {tex`f`} est <strong>constante</strong> sur {tex`[a, b]`} ssi {tex`f' = 0`} sur cet
              intervalle
            </li>
          </ul>
        </Theorem>
      </Slide>
      <Slide title="Dérivée seconde et concavité">
        <Definition>
          <p>
            Soit {tex`f`} une fonction deux fois dérivable sur {tex`[a, b]`}.
          </p>
          <ul>
            <li>
              Elle est <strong>convexe</strong> (tournée vers le haut) ssi {tex`f'' \geq 0`}
            </li>
            <li>
              Elle est <strong>concave</strong> (tournée vers le bas) ssi {tex`f'' \leq 0`}
            </li>
          </ul>
        </Definition>
        <Python>
          {py.raw`
            import matplotlib.pyplot as plt
            import numpy as np
            x = np.linspace(0.5, 10, 1000)
            y = (x + 1)**2 * np.sin(x)
            plt.plot(x, y)
          `}
        </Python>
      </Slide>
      <Slide title="Recherche d'extrema">
        <Theorem title="Dérivées et extremum">
          <p>
            Si {tex`f`} atteint un extremum local en un point {tex`x`} intérieur du domaine et est
            dérivable en ce point, alors {tex`f'(x) = 0`}.
          </p>
        </Theorem>
        <Theorem title="Extrema et dérivée seconde">
          <p>
            Soit {tex`f`} une fonction deux fois dérivable sur {tex`[a, b]`}.
          </p>
          <ul>
            <li>
              Si {tex`f'(c) = 0`} et {tex`f''(c) > 0`}, alors c'est un <strong>minimum</strong>{' '}
              local.
            </li>
            <li>
              Si {tex`f'(c) = 0`} et {tex`f''(c) < 0`}, alors c'est un <strong>maximum</strong>{' '}
              local.
            </li>
          </ul>
        </Theorem>
      </Slide>
      <Slide title="Recherche d'extrema: exemple">
        <Example title="Question d'examen">
          <p>Une courbe a pour équation</p>
          {tex`
            y = x^2 - 2x - 24 \sqrt x,
            \quad x > 0.
          `}
          <ol>
            <li>
              Calculer {tex`\frac {\dd y} {\dd x}`} et {tex`\frac {\dd^2 y} {\dd x^2}`}
            </li>
            <li>Montrer que {tex`x = 4`} est un point critique.</li>
            <li>Est-ce un maximum ou un minimum?</li>
          </ol>
        </Example>
        <Jupyter>
          {py.raw`
            from sympy import *
            x = Symbol("x")
            y = x**2 - 2*x - 24*sqrt(x)
            [y.diff(x), y.diff(x, 2)]
            # y.diff(x).subs(x, 4)
            # y.diff(x, 2).subs(x, 4)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Équation de la tangente">
        <Proposition>
          <p>
            La tangente au graphe de {tex`f`} en {tex`a`} est la droite d'équation
          </p>
          {tex`
            y = f'(a) (x - a) + f(a)
          `}
        </Proposition>
        <Iframe
          src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Differentiation-1/Edexcel-Set-B/Tangents%20and%20Normals.pdf"
          height={600}
        />
      </Slide>
      <Slide title="Théorème fondamental">
        <Theorem title="Théorème fondamental du calcul différentiel et intégral">
          {tex`
            \begin{align*}
              \int_a^b f'(x) \dd x &= f(b) - f(a)\\
              \frac {\dd} {\dd x} \int_a^x f(t) \dd t &= f(x)
            \end{align*}
          `}
        </Theorem>
      </Slide>
      <Slide title="Exercices">
        <Iframe src="https://pmt.physicsandmathstutor.com/download/Maths/A-level/C2/Topic-Qs/Edexcel-Set-1/C2%20%20Differentiation%20-%20Stationary%20points.pdf" />
      </Slide>
    </Slideshow>
  )
}
