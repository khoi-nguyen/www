const meta: Metadata = {
  title: 'Dérivées partielles',
  subtitle: 'Chapitre 1',
  description: '',
  lang: 'fr',
}

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Fonctions de deux variables" cite={['stewart', 'p. 972']}>
        <Example>
          <p>Pour chaque fonction, évaluez {tex`f(3, 2)`}, trouvez et esquissez le domaine</p>
          <ol>
            <li>{tex`f(x, y) \defeq \frac {\sqrt {x + y + 1}} {x - 1}`}</li>
            <li>{tex`f(x, y) \defeq x \ln (y^2 - x)`}</li>
          </ol>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = sqrt(x + y + 1) / (x - 1)
          f.subs({x: 3, y: 2})
        `}
      </Slide>
      <Slide title="Domaine avec Python">
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x = y = np.linspace(-10, 10, 400)
          X, Y = np.meshgrid(x, y)
          Z = Y ** 2 - X
          plt.contourf(X, Y, Z, levels=[0, np.inf], colors=['gray'])
        `}
      </Slide>
      <Slide title="Domaine et image" cite={['stewart', 'p. 973']}>
        <Example>
          <p>Trouvez le domaine et l'image de {tex`g(x, y) \defeq \sqrt{9 - x^2 - y^2}`}</p>
        </Example>
      </Slide>
      <Slide title="Graphes" cite={['stewart', 'p. 975']}>
        <Definition title="Graphe">
          {tex`
            G_f \defeq \{(x, y, f(x, y)) : (x, y) \in \dom f\}
          `}
        </Definition>
        {py.plot`
          x = y = np.linspace(-2, 2, 400)
          X, Y = np.meshgrid(x, y)
          Z = - X * Y * np.exp(-X**2 - Y**2)
          fig = plt.figure(figsize =(14, 9))
          ax = plt.axes(projection ='3d')
          ax.plot_surface(X, Y, Z)
        `}
      </Slide>
      <Slide title="Graphes: exemples" cite={['stewart', 'pp. 975-976']}>
        <p>
          Une fonction de type {tex`f(x, y) = ax + by + c`} est appelée <strong>linéaire</strong>.
        </p>
        <p>
          Pour esquisser leurs graphes, trouvez les <strong>intersections avec les axes</strong>.
        </p>
        <Example>
          <p>Esquissez le graphe de la fonction {tex`f(x) = 6 - 3x - 2y`}</p>
        </Example>
        <p>
          Certains exemples seront basés sur des courbes connues telles que les cercles ou les
          paraboles.
        </p>
        <Example>
          <p>Esquissez le graphe de la fonction {tex`g(x, y) \defeq \sqrt{9 - x^2 - y^2}`}</p>
        </Example>
      </Slide>
      <Slide title="Courbes de niveau" cite={['stewart', 'pp. 977-978']}>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x = y = np.linspace(-1, 1, 500)
          X, Y = np.meshgrid(x, y)
          Z = X**2 + Y**2
          plt.contour(X, Y, Z, levels=10)
        `}
      </Slide>
      <Slide title="Courbes de niveau: exemples" cite={['stewart', 'p. 980']}>
        <Example>
          <p>
            Esquissez les courbes de niveau de la fonction {tex`f(x, y) \defeq 6 - 3x - 2y`} pour
            les valeurs {tex`k = -6, 0, 6, 12`}
          </p>
        </Example>
        <Example>
          <p>
            Esquissez les courbes de niveau de la fonction{' '}
            {tex`g(x, y) \defeq \sqrt{9 - x^2 - y^2}`} pour les valeurs {tex`k = 0, 1, 2, 3`}
          </p>
        </Example>
      </Slide>
      <Slide title="Dérivées partielles: introduction">
        <Idea>
          <p>Regarder le comportement d'une fonction dans les directions parallèles aux axes.</p>
        </Idea>
        <Geogebra id="uHsShAac" />
      </Slide>
      <Slide title="Dérivées partielles">
        <Definition title="Dérivées partielles">
          {tex`
            \frac {\partial f} {\partial x} &\defeq
            \lim_{h \to 0} \frac {f(x + h, y) - f(x, y)} h\\
            \frac {\partial f} {\partial y} &\defeq
            \lim_{h \to 0} \frac {f(x, y + h) - f(x, y)} h
          `}
        </Definition>
        <Remark>
          <p>
            La dérivée partielle peut également se noter: {tex`\partial_x f, \partial_1 f`} ou
            encore {tex`f_x`}
          </p>
        </Remark>
      </Slide>
      <Slide title="Dérivées partielles: guide pratique" cite={['stewart', 'p. 1002']}>
        <p>Il suffit de traiter les autres variables comme constantes et de d</p>
        <Example title="Dérivées partielles">
          <ol>
            <li>
              Calculez {tex`f_x(2, 1)`} et {tex`f_y(2, 1)`} pour
              {tex`
                f(x, y) \defeq x^3 + x^2 y^3 - 2y^2
              `}
            </li>
            <li>
              Calculez les dérivées partielles de
              {tex`
                f(x, y) \defeq \sin \left( \frac x {1 + y} \right)
              `}
            </li>
          </ol>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = x**3 + x**2 * y**3 - 2 * y**2
          diff(f, x).subs({x: 2, y: 1})
        `}
      </Slide>
    </Slideshow>
  )
}
