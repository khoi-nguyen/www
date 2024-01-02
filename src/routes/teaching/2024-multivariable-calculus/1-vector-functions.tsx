import meta from './1-vector-functions.json'

export default () => (
  <Slideshow meta={meta}>
    <Slide title="Fonctions à valeur vectorielle" cite={['stewart', 'p. 928']}>
      <Definition>
        <p>
          Une <strong>fonction vectorielle</strong> est une fonction {tex`\vec r`} telle que{' '}
          {tex`\dom \vec r \subset \R`} et {tex`\range \vec r \subset \R^3`}.
        </p>
      </Definition>
      <Remark>
        <ul>
          <li>L'ensemble d'arrivée peut être autre chose que {tex`3`}</li>
          <li>
            Une fonction vectorielle {tex`\vec r`} est caractérisée par {tex`3`} fonctions réelles:
            {tex`
              \vec r(t) = f(t) \vec i + g(t) \vec j + h(t) \vec k
            `}
          </li>
        </ul>
      </Remark>
      <Example>
        <p>La fonction</p>
        {tex`
          \vec r(t) = (t^3, \ln (3 - t), \sqrt t)
        `}
        <p>a pour composantes</p>
        {tex`
          f(t) = t^3 \qquad g(t) = \ln (3 - t) \qquad h(t) = \sqrt t.
        `}
        <p>Son domaine est {tex`[0, 3[`}.</p>
      </Example>
    </Slide>
    <Slide title="Exemples de fonctions vectorielles">
      <p>
        Les fonctions vectorielles sont utilisées entre autres pour représenter des quantités comme
        la <strong>position</strong>, la <strong>vitesse</strong> ou l'<strong>accélération</strong>
        .
      </p>
      <Jupyter run>
        {py.raw`
          import matplotlib.pyplot as plt
          from numpy import *
          ax = plt.figure().add_subplot(projection='3d')

          t = linspace(0, 20, 200)
          x, y, z = cos(t), sin(t), t
          plt.plot(x, y, z)
        `}
      </Jupyter>
    </Slide>
    <Slide title="Limites" cite={['stewart', 'p. 928']}>
      <p>La limite d'une fonction se définit par la limite des composantes.</p>
      <Definition>
        <p>Soit {tex`\vec r(t) = (f(t), g(t), h(t))`}. On écrit</p>
        {tex`
          \lim_{t \to a} \vec r(t) = \left(
            \lim_{t \to a} f(t),
            \lim_{t \to a} g(t),
            \lim_{t \to a} h(t)
          \right)
        `}
      </Definition>
      <Example>
        <p>
          Calculer {tex`\lim_{t \to 0} \vec r(t)`}, où{' '}
          {tex`\vec r(t) \defeq (1 + t^3) \vec i + t e^{-t} \vec j + \frac {\sin t} t \vec k`}
        </p>
      </Example>
      <Jupyter>
        {py.raw`
          from sympy import *
          t = Symbol("t")
          r = Matrix([1 + t**3, t * exp(-t), sin(t) / t])
          r.limit(t, 0)
        `}
      </Jupyter>
    </Slide>
    <Slide title="Continuité" cite={['stewart', 'p. 929']}>
      <Definition>
        <p>
          Une fonction {tex`r`} est <strong>continue</strong> en {tex`a`} si
        </p>
        {tex`
          \lim_{t \to a} \vec r(t) = \vec r(a)
        `}
      </Definition>
    </Slide>
    <Slide title="Derivée d'une fonction vectorielle" cite={['stewart', 'p. 936']}>
      <Definition title="Dérivée">
        {tex`
          \frac {\dd \vec r} {\dd t}
          = \lim_{h \to 0} \frac {\vec r(t + h) - \vec r(t)} h
        `}
      </Definition>
    </Slide>
    <Slide title="Dérivée vectorielle: exemple" cite={['stewart', 'p. 937']}>
      <Example>
        <ol>
          <li>
            Dériver
            {tex`
              \vec r(t) = (1 + t^3) \vec i + t e^{-t} \, \vec j + \sin 2t \, \vec k
            `}
          </li>
          <li>Trouver le vecteur tangent unitaire lorsque {tex`t = 0`}.</li>
        </ol>
      </Example>
      <Jupyter>
        {py.raw`
          from sympy import *
          t = Symbol("t")
          r = Matrix([1 + t**3, t * exp(-t), sin(2*t)])
          der = r.diff(t)
          (der / der.norm()).subs(t, 0)
        `}
      </Jupyter>
    </Slide>
    <Slide title="Règles de dérivation" cite={['stewart', 'p. 938']}>
      <Proposition title="Règles de dérivation">
        {tex`
          \begin{align*}
            \frac \dd {\dd t} (\vec u(t) + \vec v(t) &= \vec u'(t) + \vec v'(t)\\
            \frac \dd {\dd t} (f(t) \vec u(t)) &= f'(t) \vec u(t) + f(t) \vec u'(t)\\
            \frac \dd {\dd t} (\vec u(t) \cdot \vec v(t)) &= \vec u'(t) \cdot \vec v(t) + \vec u(t) \cdot \vec v'(t)\\
            \frac \dd {\dd t} (\vec u(t) \times \vec v(t)) &= \vec u'(t) \times \vec v(t) + \vec u(t) \times \vec v'(t)\\
            \frac \dd {\dd t} (\vec u(f(t))) &= \vec u'(f(t)) f'(t)
          \end{align*}
        `}
      </Proposition>
    </Slide>
    <Slide title="Intégrale de fonction vectorielle" cite={['stewart', 'p. 939']}>
      <p>
        On intègre <strong>composante par composante.</strong>
      </p>
      <Definition title="Intégrale d'une fonction vectorielle">
        <p>Supposons que {tex`\vec r(t) = f(t) \vec i + g(t) \vec j + h(t) \vec k`}.</p>
        {tex`
          \int_a^b \vec r(t) \dd t \defeq
          \left(\int_a^b f(t) \dd t\right) \vec i
          + \left(\int_a^b g(t) \dd t\right) \vec j
          + \left(\int_a^b h(t) \dd t\right) \vec k
        `}
      </Definition>
    </Slide>
    <Slide title="Intégrale: exemple" cite={['stewart', 'p. 940']}>
      <Example>
        <p>Si {tex`\vec r(t) = 2 \cos t \vec i + \sin t \vec j + 2 t \vec k`}, calculer</p>
        {tex`
          \int_0^{\pi / 2} \vec r(t) \dd t
        `}
      </Example>
      <Jupyter>
        {py.raw`
          from sympy import *
          t = symbols("t")
          r = Matrix([2 * cos(t), sin(t), 2 * t])
          integrate(r, (t, 0, pi / 2))
        `}
      </Jupyter>
    </Slide>
  </Slideshow>
)
