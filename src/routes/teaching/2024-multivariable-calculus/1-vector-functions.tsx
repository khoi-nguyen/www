import meta from './1-vector-functions.json';

export default () => (
  <Slideshow meta={meta}>
    <Slide title="Limites">
      <p></p>
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
        {py`
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
        {py`
          from sympy import *
          t = symbols("t")
          r = Matrix([2 * cos(t), sin(t), 2 * t])
          integrate(r, (t, 0, pi / 2))
        `}
      </Jupyter>
    </Slide>
  </Slideshow>
);
