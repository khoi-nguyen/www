const meta: Metadata = {
  title: 'Séance 3',
  description: 'Séance 3',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="14.5.34"></Slide>
      <Slide title="14.6.54"></Slide>
      <Slide title="14.7.43">
        {py.plot`
          x = y = np.linspace(-2, 2, 400)
          X, Y = np.meshgrid(x, y)
          Z = np.sqrt(X**2 + Y**2)
          fig, ax = plt.figure(), plt.axes(projection ='3d')
          ax.plot_surface(X, Y, Z, cmap='viridis')
        `}
        <Exercise>
          <p>
            Trouvez les points du cône {tex`z^2 = x^2 + y^2`} qui sont les plus proches du point{' '}
            {tex`(4, 2, 0)`}
          </p>
        </Exercise>
        <p>
          <strong>Indication</strong>: il suffit de minimiser
        </p>
        {tex`
          \mathrm{distance}^2 = \Delta x^2 + \Delta y^2 + \Delta z^2
        `}
      </Slide>
      <Slide title="14.7.43: Solution avec Python" columns>
        <div>
          <ol>
            <li>
              Trouvez la fonction à minimiser
              {py.jupyter`
                from sympy import *
                x, y, z = symbols("x y z")
                f = (x - 4)**2 + (y - 2)**2 + z**2
              `}
            </li>
            <li>
              Utiliser la contrainte pour obtenir une fonction en {tex`(x, y)`}
              {py.jupyter`
                f = f.subs({z: sqrt(x**2 + y**2)})
              `}
            </li>
            <li>
              Calcul du gradient
              {py.jupyter`
                grad = Matrix([f.diff(x), f.diff(y)])
              `}
            </li>
          </ol>
          <Remark>
            <p>
              N'oubliez pas qu'il y a aussi la racine négative {tex`z = -\sqrt{x^2 - y^2}`}. Étant
              donné que notre point est dans le plan {tex`xy`},
            </p>
          </Remark>
        </div>
        <div>
          <ol start={4}>
            <li>
              Trouvez le(s) point(s) critique(s) {tex`\grad f = \vec 0`}
              {py.jupyter`
                solve(grad)
              `}
            </li>
            <li>Ce point-là ne peut être que correspondre à un minimum. Pourquoi?</li>
            <li>
              Trouvez les coordonnées des <strong>deux points</strong>.
            </li>
          </ol>
        </div>
      </Slide>
      <Slide title="15.2.35">
        <Exercise>
          <p>
            Trouvez le volume (en soustrayant deux volumes) du solide délimité par les cylindres
            paraboliques {tex`y = 1 - x^2`}, {tex`y = x^2 - 1`} et les plans {tex`x + y + z = 2`} et{' '}
            {tex`2x + 2y - z + 10 = 0.`}
          </p>
        </Exercise>
        <h3>Indications</h3>
        <p>Le but est de calculer une intégrale du type</p>
        {tex`
          \iint_D f(x) \dd x
        `}
        <ul>
          <li>
            Vérifiez que vous voyez bien ce qu'est un <strong>cylindre parabolique</strong>
          </li>
          <li>Quelles sont les équations qui déterminent {tex`D`}?</li>
          <li>Est-il plus facile d'intégrer verticalement ou horizontalement d'abord?</li>
        </ul>
      </Slide>
      <Slide title="15.2.35: solution avec Python" columns>
        <ol>
          <li>
            Les <strong>cylindres paraboliques</strong> déterminent le domaine. Vue d'en haut:
            {py.plot`
              x = np.linspace(-1.5, 1.5, 300)
              plt.plot(x, 1 - x**2)
              plt.plot(x, x**2 - 1)
            `}
          </li>
          <li>
            En résolvant pour trouvez l'intersection des deux paraboles, on trouve:
            {py.jupyter`
              from sympy import *
              x, y = symbols("x y")
              solve([Eq(y, 1 - x**2), Eq(y, x**2 - 1)], [x, y])
            `}
          </li>
          <li>
            On en déduit qu'on intègre sur
            {tex`\iint_D f(x, y) \dd A = \int_{x = -1}^{x = 1} \int_{y = x^2 - 1}^{y = 1 - x^2} f(x, y) \dd y \dd x`}
          </li>
        </ol>
        <ol start={4}>
          <li>
            Les équations des deux plans peuvent s'écrire
            {tex`
              z = 2 - x - y\\
              z = 2x + 2y + 10.
            `}
          </li>
          <li>
            Le deuxième plan est clairement au dessus, donc l'intégrale recherchée est
            {tex`
              \int_{x = -1}^{x = 1} \int_{y = x^2 - 1}^{y = 1 - x^2} 2x + 2y + 10 - (2 - x - y) \dd y \dd x
            `}
          </li>
          <li>
            Intégrale intérieure:
            {py.jupyter`
              from sympy import *
              x, y = symbols("x y")
              z = 2*x + 2*y + 10 - (2 - x - y)
              inner = integrate(z, (y, x**2 - 1, 1 - x**2))
            `}
          </li>
          <li>
            Intégrale extérieure:
            {py.jupyter`
              integrate(inner, (x, -1, 1))
            `}
          </li>
        </ol>
      </Slide>
    </Slideshow>
  )
}
