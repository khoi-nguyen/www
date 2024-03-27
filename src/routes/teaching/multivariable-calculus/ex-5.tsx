const meta: Metadata = {
  title: 'Séance 5',
  description: 'Séance 5',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Intégrale sur un chemin">
        <Question>
          <p>Comment calculer une intégrale curviligne ou une circulation?</p>
        </Question>
        <Idea>
          <p>
            On revient à une intégrale sur un intervalle avec une <strong>paramétrisation</strong>.
          </p>
        </Idea>
        <ol>
          <li>
            Trouvez une paramétrisation
            {tex`
            \vec r(t) = (x(t), y(t)),
            \quad a \leq t \leq b
          `}
            de la courbe {tex`C`}.
          </li>
          <li>
            Remplacez {tex`x`} et {tex`y`} par {tex`x(t)`} et {tex`y(t)`}
          </li>
          <li>
            Remplacez l'intégrale par {tex`\int_a^b`} et
            {tex`
              \dd \vec r = \frac {\dd \vec r} {\dd t} \dd t,
              \quad
              \dd s = \norm{\frac {\dd \vec r} {\dd t}} \dd t,
              \quad
              \dd x = \frac {\dd x} {\dd t} \dd t,
              \quad
              \dd y = \frac {\dd y} {\dd t} \dd t
            `}
          </li>
        </ol>
      </Slide>
      <Slide title="16.2.17">
        <Exercise>
          <p>Soit {tex`\vec F`} le champ de vecteur représenté ci-dessous. Quel est le signe de</p>
          {tex`
            \int_C \vec F \cdot \dd \vec r
          `}
          {py.plot`
            x, y = np.meshgrid(
              np.linspace(-3, 3, 10),
              np.linspace(-3, 3, 10),
            )
            F = [y, -x]
            plt.quiver(x, y, *F, color='g')
            plt.gca().set_aspect('equal')
          `}
          <ul>
            <li>
              si {tex`C`} est le segment de {tex`(-3, -3)`} à {tex`(-3, 3)`}?
            </li>
            <li>si {tex`C`} est un cercle centré à l'origine dans le sens antihorloger?</li>
          </ul>
        </Exercise>
      </Slide>
      <Slide title="16.2.28">
        <Exercise>
          <p>Soit la fonction</p>
          {tex`
            \vec F(x, y) = \frac x {\sqrt{x^2 + y^2}} \vec i + \frac y {\sqrt{x^2 + y^2}} \vec j.
          `}
          <p>Devinez le signe de l'intégrale</p>
          {tex`
            \int_C \vec F(x, y) \cdot \dd \vec r
          `}
          <p>
            où {tex`C`} est la parabole {tex`y = 1 + x^2`} entre {tex`(-1, 2)`} et {tex`(1, 2)`}, et
            ensuite calculez-là.
          </p>
        </Exercise>
        <h3>Indications</h3>
        <ul>
          <li>
            Regardez la résolution d'un{' '}
            <a href="https://nguyen.me.uk/teaching/multivariable-calculus-b/4-vector-fields#/14">
              exercice similaire fait au cours
            </a>
          </li>
          <li>Des indications supplémentaires sont données au slide suivant</li>
        </ul>
      </Slide>
      <Slide title="16.2.28: solution en Python" columns>
        <ol>
          <li>
            <strong>Paramétrisation</strong>
            {tex`
              \vec r(t) = (\underbrace{t}_x, \underbrace{1 + t^2}_{y}),
              \quad -1 \leq t \leq 1.
            `}
          </li>
          <li>
            <strong>Calcul de l'intégrand</strong>:
            {tex`
              \int_C \vec F \cdot \dd \vec r
              = \int_a^b \underbrace{\vec F \cdot \frac {\dd \vec r} {\dd t}}_{\text{intégrand}} \dd t
            `}
          </li>
        </ol>
        <div>
          <p>Changez le code pour obtenir les résultats intermédiaires dont vous avez besoin</p>
          {py.jupyter`
            from sympy import *
            F = lambda x, y: 1 / sqrt(x**2 + y**2) * Matrix([x, y])

            # Paramétrisation
            t = Symbol("t")
            r = Matrix([t, 1 + t**2])

            # Calcul de l'intégrand
            integrand = simplify(F(*r).dot(r.diff(t)))

            # Résultat final
            integrate(integrand, (t, -1, 1))
          `}
        </div>
      </Slide>
      <Slide title="16.2.39">
        <Remark>
          <p>
            S'il y a pas assez de travail, ou après la séance, si vous souhaitez faire une intégrale
            curviligne en plus...
          </p>
        </Remark>
        <Exercise>
          <p>Trouvez le travail effectué par la force</p>
          {tex`
            \vec F(x, y) = x \vec i + (y + 2) \vec j
          `}
          <p>lorsque l'on bouge un objet le long de l'arche de la cycloïde</p>
          {tex`
            \vec r(t) = (t - \sin t) \vec i + (1 - \cos t) \vec j,
            \quad 0 \leq t \leq 2 \pi
          `}
        </Exercise>
      </Slide>
      <Slide title="16.2.39: résolution Python">
        {py.jupyter`
          from sympy import *
          t = Symbol("t")
          r = Matrix([t - sin(t), 1 - cos(t)])
          F = lambda x, y: Matrix([x, y + 2])
          integrate(F(*r).dot(r.diff(t)), (t, 0, 2*pi))
        `}
      </Slide>
      <Slide title="16.2.52">
        <Exercise>
          <p>
            Le champ magnétique engendré par un courant {tex`I`} dans un long fil est tangent aux
            cercles qui sont dans un plan perpendiculaire au fil et dont le centre est précisément
            l'axe du fil. La loi d'Ampère nous donne
          </p>
          {tex`
            \oint_C \vec B \cdot \dd \vec r = \mu_0 I
          `}
          où {tex`I`} est le courant passant par une surface délimitée par {tex`C`}. Montrer que la
          norme du champ magnétique à une distance {tex`r`} du fil est donnée par
          {tex`
            B = \frac {\mu_0 I} {2 \pi r}
          `}
        </Exercise>
        <Figure src="magnetic-field.png" alt="Magnetic field" />
      </Slide>
      <Slide title="Théorème fondamental et champs conservatifs">
        <Theorem>
          <p>
            Si {tex`\vec F`} a un potentiel {tex`f`}, alors
          </p>
          {tex`
            \int_C \vec F \cdot \dd \vec r
            = f(\underbrace{\vec r(b)}_{\text{arrivée}}) - f(\underbrace{\vec r(a)}_{\text{départ}})
            \qquad (\vec F = \grad f)
          `}
          <p>En particulier, l'intégrale ne dépend pas du chemin mais seulement des extrémités.</p>
        </Theorem>
        <Question>
          <p>Quand est-ce que le potentiel {tex`f`} existe?</p>
        </Question>
        <div class="columns">
          <div>
            <p>
              Le potentiel n'existe <strong>PAS</strong> si
            </p>
            <ul>
              <li>L'intégrale dépend du chemin</li>
              <li>{tex`\partial_x F_2 \neq \partial_y F_1`}</li>
            </ul>
          </div>
          <div>
            <p>
              Le potentiel <strong>existe</strong> si
            </p>
            <ul>
              <li>
                L'intégrale ne dépend pas du chemin sur un domaine en un <strong>morceau</strong>
              </li>
              <li>
                {tex`\partial_x F_2 = \partial_y F_1`} et le domaine est en un morceau sans trou
              </li>
            </ul>
          </div>
        </div>
      </Slide>
      <Slide title="16.3.20">
        <Exercise>
          <p>Montrez que l'intégrale</p>
          {tex`
            \int_C \sin y \dd x + (x \cos y - \sin y) \dd y
          `}
          <p>
            où {tex`C`} est n'importe quel chemin reliant {tex`(2, 0)`} à {tex`(1, \pi)`} est
            indépendante du chemin. Ensuite, évaluez cette intégrale.
          </p>
        </Exercise>
        <Remark>
          <p>Vous pouvez voir l'intégrand comme</p>
          {tex`
            \underbrace{
              \begin{pmatrix}
                \sin y\\
                x \cos y - \sin y
              \end{pmatrix}
            }_{\vec F}
            \cdot
            \underbrace{
              \begin{pmatrix}
                \dd x\\
                \dd y
              \end{pmatrix}
            }_{\dd \vec r}
          `}
        </Remark>
      </Slide>
      <Slide title="16.3.20: solution python" split={false}>
        <h2>Conservatif</h2>
        <p>Vérifier {tex`\partial_1 F_2 - \partial_2 F_1`}</p>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          F = Matrix([sin(y), x*cos(y) - sin(y)])
          Eq(F[1].diff(x), F[0].diff(y))
        `}
        <div class="columns">
          <div>
            <h2>Solution 1</h2>
            <p>Après avoir vérifié que c'est conservatif, on intègre sur un chemin</p>
            {py.jupyter`
              from sympy import *
              t = symbols("t")
              r = Matrix([2, 0]) + t * Matrix([-1, pi])
              x, y = r[0], r[1]
              F = Matrix([sin(y), x*cos(y) - sin(y)])
              simplify(integrate(F.dot(r.diff(t)), (t, 0, 1)))
            `}
          </div>
          <div>
            <h2>Solution 2</h2>
            <p>On calcule un potentiel</p>
            {py.jupyter`
              from sympy import *
              x, y = symbols("x y")
              F = Matrix([sin(y), x*cos(y) - sin(y)])
              f = integrate(F[0], x)
              f = f + integrate(F[1] - f.diff(y), y)
            `}
            <p>On évalue et on soustrait le potentiel aux extrémités</p>
            {py.jupyter`
              f.subs({x: 1, y: pi}) - f.subs({x: 2, y: 0})
            `}
          </div>
        </div>
      </Slide>
    </Slideshow>
  )
}
