import meta from './2-differentiation.json'

export default () => (
  <Slideshow meta={meta}>
    <Slide title="Dérivées directionnelles">
      <Geogebra id="bDtV9yF2" />
      <Definition title="Dérivée directionnelle">
        {tex`
          \frac {\partial f} {\partial \vec v} (\vec x)
          \defeq \lim_{t \to 0}
          \frac {f(\vec x + t \vec v) - f(\vec x)} {t}
        `}
      </Definition>
      <p>Pour alléger les notations, on notera parfois {tex`\partial_{\vec v}`}.</p>
    </Slide>
    <Slide title="Dérivées partielles">
      <Definition title="Dérivées partielles">
        {tex`
          \frac {\partial f} {\partial x_i}(\vec x)
          \defeq
          \frac {\partial f} {\partial \vec e_i}(\vec x)
        `}
      </Definition>
      <Remark title="Dérivées partielles: notation alternative">
        <p>On notera aussi {tex`\partial_i \defeq \frac \partial {\partial x_i}`}</p>
      </Remark>
    </Slide>
    <Slide title="Dérivées partielles: animation" split={false}>
      <Geogebra id="uHsShAac" width={1400} height={900} />
    </Slide>
    <Slide title="Gradient">
      <Definition title="Gradient">
        {tex`
          \grad f(\vec x) \defeq
          \begin{pmatrix}
            \partial_1 f(\vec x)\\
            \partial_2 f(\vec x)\\
            \vdots\\
            \partial_m f(\vec x)
          \end{pmatrix}
        `}
      </Definition>
      <Remark title="En dimension 1">
        <p>
          Lorsque {tex`m = 1`}, on retrouve la <strong>dérivée</strong>:
        </p>
        {tex`
          \grad f(x) = f'(x)
        `}
        <p>
          Dans les ouvrages anglophones, cela justifie l'usage du mot <strong>gradient</strong> pour
          la dérivée et la pente en dimension {tex`1`}.
        </p>
      </Remark>
    </Slide>
    <Slide title={() => <>Fonctions de classe {tex`C^k`}</>}>
      <Definition title={() => <>Classe {tex`C^k`}</>}>
        <p>
          Soit {tex`\Omega \subset \R^n`}. On désigne par {tex`C^k(\Omega, \R^p)`} l'ensemble des
          fonctions {tex`f : \Omega \to \R^p`} dont les dérivées existent et sont continues jusqu'à
          l'ordre {tex`k`}.
        </p>
      </Definition>
    </Slide>
    <Slide title="Differentiabilité">
      <Proposition title="Différentiabilité">
        <p>Si {tex`f \in C^1(\Omega)`}, alors</p>
        {tex`
          \frac {\partial f} {\partial \vec v}(\vec x)
          = \grad f(\vec x) \cdot \vec v
        `}
      </Proposition>
      <Remark>
        <p>
          Ce résultat n'est pas évident: les dérivées partielles ne décrivent le comportement de la
          fonction que dans les directions parallèles aux axes.
        </p>
      </Remark>
      {tex`
        \frac {\partial f} {\partial \vec v}(\vec x)
        = v_1 \frac {\partial f} {\partial x_1}(\vec x)
        + v_2 \frac {\partial f} {\partial x_2}(\vec x)
        + \dots
        + v_m \frac {\partial f} {\partial x_m}(\vec x)
      `}
      <Proof sketch>
        {tex`
          \begin{align*}
            \partial_{\vec v} f(\vec x) &\defeq
            \lim_{t \to 0} \frac {f(\vec x + t \vec v) - f(\vec x)} {t}\\
            &= \underbrace{
              \lim_{t \to 0} \frac {f(\vec x + t \vec v) - f(\vec x + t v_1 \vec {e_1})} t
            }_{= v_2 \partial_2 f(\vec x)}
            + \underbrace{
              \lim_{t \to 0} \frac {f(\vec x + t v_1 \vec {e_1}) - f(\vec x)} t
            }_{= v_1 \partial_1 f(\vec x)}
          \end{align*}
        `}
      </Proof>
    </Slide>
    <Slide title="Interprétation du gradient">
      <Geogebra id="QhfcuhqA" />
    </Slide>
    <Slide title="Descente de gradient">
      <Jupyter>
        {py.raw`
          from sympy import *
          x, y = symbols("x y")
          f = x**2 + y**2
          grad = lambdify((x, y), Matrix([f.diff(x), f.diff(y)]))

          for i in range(100):
              x, y = Matrix([x, y]) - 0.01 * grad(x, y)
          x, y
        `}
      </Jupyter>
    </Slide>
    <Slide title="Règle de la composée">
      <Recall title="Règle de la composée en dimension 1">
        {tex`
          \frac \dd {\dd t} f(x(t)) = \frac {\dd f} {\dd x} (x(t)) \frac {\dd x} {\dd t}(t)
        `}
      </Recall>
      <Proposition>
        {tex`
          \begin{align*}
            \frac {\dd} {\dd t} f(\vec x(t))
            = \grad f(\vec x(t)) \cdot \frac {\dd \vec x} {\dd t}(t)
          \end{align*}
        `}
      </Proposition>
    </Slide>
    <Slide title="Recherche d'extrema">
      <p>
        Les dérivées partielles s'<strong>annulent simultanément</strong> aux extrema locaux.
      </p>
      <Proposition title="Critère de Fermat">
        <p>Soit {tex`f \in C^1(\Omega)`}.</p>
        {tex`
          x \in \Omega \ \text{est un extremum local} \implies \grad f(\vec x) = 0.
        `}
      </Proposition>
    </Slide>
    <Slide title="Symmétrie des dérivées secondes">
      <Theorem title="Théorème de Schwarz">
        <p>Soit {tex`f \in C^2(\Omega)`}</p>
        {tex`
          \frac \partial {\partial x_i}
          \left(
            \frac {\partial f} {\partial x_j}
          \right)
          =
          \frac \partial {\partial x_j}
          \left(
            \frac {\partial f} {\partial x_i}
          \right)
        `}
      </Theorem>
      <p>En conséquence, on pourra librement écrire</p>
      {tex`
        \frac {\partial f} {\partial x_i \partial x_j}
      `}
      <Remark title="Tenseur de courbure de Riemann">
        <p>En mathématiques et en physique théorique, la quantité</p>
        {tex`
          (\partial_i \partial_j - \partial_j \partial_i) f
        `}
        <p>
          est utilisée pour mesurer la <strong>courbure</strong> de l'espace ou de l'espace-temps.
          En ces termes, le théorème de Schwarz nous indique que nous travaillons dans un espace
          plat.
        </p>
      </Remark>
    </Slide>
    <Slide title="Critère d'existence de gradient">
      <p>
        La question suivante est liée à la <strong>conservation de l'énergie</strong> en physique.
      </p>
      <Question title="Existence de l'énergie potentiel">
        <p>
          Quels champs de vecteur {tex`\vec E`} peuvent s'écrire comme un gradient{' '}
          {tex`\vec E = -\grad V`}?
        </p>
      </Question>
      <Proposition title="Critère nécéssaire pour l'existence de l'énergie potentielle">
        <p>Soit {tex`V \in C^2(\Omega)`}.</p>
        {tex`
          \curl (\grad V) = 0.
        `}
      </Proposition>
      {tex`
        C^2(\Omega, \R) \xrightarrow[\text{gradient}]{\grad} C^1(\Omega, \R^n) \xrightarrow[\text{rotationnel}]{\curl} 0
      `}
    </Slide>
  </Slideshow>
)
