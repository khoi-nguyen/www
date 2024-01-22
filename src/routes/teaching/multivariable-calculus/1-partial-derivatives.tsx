const meta: Metadata = {
  title: 'Dérivées partielles',
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
    </Slideshow>
  )
}
