const meta: Metadata = {
  title: 'Dérivées partielles',
  subtitle: 'Chapitre 1',
  description: '',
  lang: 'fr',
}

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Informations pratiques" columns>
        <Iframe src="/teaching/" />
        <div>
          <h3>Informations</h3>
          <dl>
            <dt>Slides</dt>
            <dd>
              <A href="/">https://nguyen.me.uk/teaching</A>
            </dd>
            <dt>Exercices</dt>
            <dd>GUERRIERI Rolando (R5G), JONAS-SZATANSKI Jacek (JSZ), NGUYEN Khoi (NGY)</dd>
          </dl>
          <Remark>
            <p>
              Les séances d'exercices seront également présentes sur mon site. Nous nous baserons
              sur le calculus, mais je ferai en sorte que tout soit compris dans les slides.
            </p>
          </Remark>
        </div>
      </Slide>
      <Slide title="Motivations">
        <p>
          Deux interactions dominent à notre échelle: la <strong>gravitation</strong> et l'
          <strong>électromagnétisme</strong>.
        </p>
        <Proposition title="Équations de Maxwell">
          {tex`
            \grad \cdot \vec E &= \frac {\rho} {\epsilon_0}\\
            \grad \cdot \vec B &= 0\\
            \grad \times \vec E &= -\partial_t \vec B\\
            \grad \times \vec B &= \mu_0 (\vec J + \epsilon_0 \partial_t \vec E)
          `}
        </Proposition>
        <ul>
          <li>Lois en {tex`1/r^2`}</li>
          <li>Unification électricité/magnétisme/lumière</li>
          <li>Nécéssité d'unir l'espace et le temps (première théorie relativiste)</li>
        </ul>
      </Slide>
      <Slide title="Objectifs du cours">
        <ul>
          <li>
            Étendre la notion de <strong>dérivée</strong> à plusieurs variables
          </li>
          <li>
            Étendre la notion d'<strong>intégrale</strong> à plusieurs variables, aux courbes, et
            aux surfaces
          </li>
          <li>
            Généraliser le <strong>théorème fondamental de l'analyse</strong>
          </li>
        </ul>
        {tex`
          \int_a^b f'(x) \dd x = f(b) - f(a)
        `}
      </Slide>
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
          fig, ax = plt.figure(), plt.axes(projection ='3d')
          ax.plot_surface(X, Y, Z, cmap='viridis')
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
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x = y = np.linspace(-2, 2, 400)
          X, Y = np.meshgrid(x, y)
          Z = 6 - 3 * X - 2 * Y
          fig, ax = plt.figure(), plt.axes(projection ='3d')
          ax.plot_surface(X, Y, Z, cmap='viridis')
        `}
      </Slide>
      <Slide title="Graphes: exemples partie II" cite={['stewart', 'pp. 975-976']}>
        <p>
          Certains exemples seront basés sur des courbes connues telles que les cercles ou les
          paraboles.
        </p>
        <Example>
          <p>
            Esquissez le graphe des fonctions
            {tex`
              g(x, y) \defeq \sqrt{9 - x^2 - y^2}\quad
              h(x, y) \defeq 4x^2 + y^2
            `}
          </p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x = y = np.linspace(-2, 2, 400)
          X, Y = np.meshgrid(x, y)
          Z = np.sqrt(9 - X**2 - Y**2)
          fig, ax = plt.figure(), plt.axes(projection ='3d')
          ax.plot_surface(X, Y, Z, cmap='viridis')
        `}
      </Slide>
      <Slide title="Courbes de niveau" cite={['stewart', 'pp. 977-978']}>
        <Figure src="level-curves.png" alt="Courbes de niveau" />
        <Definition title="Courbes de niveau">
          <p>
            Les courbes de niveau d'une fonction {tex`f`} à <strong>deux variables</strong> sont les
            courbes dont l'équation prend la forme {tex`f(x, y) = k`} pour une valeur {tex`k`}{' '}
            constante dans l'image de {tex`f`}.
          </p>
        </Definition>
      </Slide>
      <Slide title="Courbes de niveau avec Python">
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x = y = np.linspace(-1, 1, 500)
          X, Y = np.meshgrid(x, y)
          Z = X**2 + Y**2
          plt.contour(X, Y, Z, levels=10)
          plt.colorbar()
        `}
      </Slide>
      <Slide title="Courbes de niveau: exemples" cite={['stewart', 'p. 980']}>
        <Example>
          <p>
            Esquissez les courbes de niveau de la fonction {tex`f(x, y) \defeq 6 - 3x - 2y`} pour
            les valeurs {tex`k = -6, 0, 6, 12`}
          </p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x = y = np.linspace(-1, 1, 500)
          X, Y = np.meshgrid(x, y)
          Z = 6 - 3*X - 2*Y
          plt.contour(X, Y, Z, levels=10)
          plt.colorbar()
        `}
      </Slide>
      <Slide title="Courbes de niveau: exemples" cite={['stewart', 'p. 980']}>
        <Example>
          <p>
            Esquissez les courbes de niveau de la fonction{' '}
            {tex`g(x, y) \defeq \sqrt{9 - x^2 - y^2}`} pour les valeurs {tex`k = 0, 1, 2, 3`}
          </p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x = y = np.linspace(-1, 1, 500)
          X, Y = np.meshgrid(x, y)
          Z = np.sqrt(9 - X**2 - Y**2)
          plt.contour(X, Y, Z, levels=10)
          plt.colorbar()
        `}
      </Slide>
      <Slide title="Courbes de niveau: exemples" cite={['stewart', 'p. 980']}>
        <Example>
          <p>
            Esquissez les courbes de niveau de la fonction {tex`h(x, y) \defeq 4x^2 + y^2 + 1`} pour
            les valeurs {tex`k = 0, 1, 2, 3`}
          </p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x = y = np.linspace(-1, 1, 500)
          X, Y = np.meshgrid(x, y)
          Z = 4*X**2 + Y**2 + 1
          plt.contour(X, Y, Z, levels=10)
          plt.colorbar()
        `}
      </Slide>
      <Slide title="Fonctions à trois variables ou plus" cite={['stewart', 'pp. 982-983']}>
        <p>
          Les idées vues jusqu'à présent s'étendent naturellement aux fonctions à trois variables ou
          plus (sauf que l'on parle de surfaces de niveau).
        </p>
      </Slide>
      <Slide title="Limites" cite={['stewart', 'p. 990']}>
        <p>Nous utiliserons la notation</p>
        {tex`
          \lim_{(x, y) \to (a, b)} f(x, y) = L
        `}
        <p>
          pour indiquer que les valeurs de {tex`f(x, y)`} approchent le nombre {tex`L`} lorsque{' '}
          {tex`(x, y)`} approche {tex`(a, b)`} en restant dans le domaine de {tex`f`}.
        </p>
      </Slide>
      <Slide title="Montrer la non-existence d'une limite" cite={['stewart', 'p. 991']}>
        <p>
          Essayez plusieurs "chemins". S'ils donnent des limites différentes, alors la limite
          n'existe pas
        </p>
        <Example>
          <p>Montrer que </p>
          {tex`
            \lim_{(x, y) \to (0, 0)} \frac {x^2 - y^2} {x^2 + y^2}
          `}
          <p>n'existe pas.</p>
        </Example>
        <Remark>
          <p>Essayez les chemins en ligne droite</p>
        </Remark>
      </Slide>
      <Slide title="Montrer la non-existence d'une limite" cite={['stewart', 'p. 992']}>
        <Example>
          <p>Les limites</p>
          {tex`
            \lim_{(x, y) \to (0, 0)} \frac {x y} {x^2 + y^2},
            \quad
            \lim_{(x, y) \to (0, 0)} \frac {x y^2} {x^2 + y^4},
          `}
        </Example>
      </Slide>
      <Slide title="Propriétés des limites" cite={['stewart', 'p. 993']}>
        <Proposition>
          {tex`
            \lim_{(x, y) \to (a, b)} \left(f(x, y) \pm g(x, y)\right)
            &=
            \lim_{(x, y) \to (a, b)} f(x, y)
            \pm
            \lim_{(x, y) \to (a, b)} g(x, y)\\
            \lim_{(x, y) \to (a, b)} \alpha f(x, y)
            &=
            \alpha \lim_{(x, y) \to (a, b)} f(x, y)\\
            \lim_{(x, y) \to (a, b)} f(x, y) \cdot g(x, y)
            &=
            \lim_{(x, y) \to (a, b)} f(x, y)
            \cdot
            \lim_{(x, y) \to (a, b)} g(x, y)\\
            \lim_{(x, y) \to (a, b)} \frac {f(x, y)} {g(x, y)}
            &=
            \frac {
              \lim_{(x, y) \to (a, b)} f(x, y)
            } {
              \lim_{(x, y) \to (a, b)} g(x, y)
            }
          `}
        </Proposition>
        <p>à condition que le membre de droite ait du sens.</p>
      </Slide>
      <Slide title="Propriétés des limites: exemples" cite={['stewart', 'p. 994']}>
        <Example>
          <p>Évaluez les limites suivantes si elles existent:</p>
          {tex`
            \lim_{(x, y) \to (1, 2)} \left(x^2 y^3 - x^3 y^2 + 3x + 2y\right)\\
            \lim_{(x, y) \to (-2, 3)} \frac {x^2 y + 1} {x^3 y^2 - 2x}\\
            \lim_{(x, y) \to (0, 0)} \frac {3x^2 y} {x^2 + y^2}
          `}
        </Example>
      </Slide>
      <Slide title="Continuité" cite={['stewart', 'p. 995']}>
        <Definition>
          <p>
            Une fonction {tex`f`} est <strong>continue</strong> en {tex`(a, b)`} si
          </p>
          {tex`
            \lim_{(x, y) \to (a, b)} f(x, y) = f(a, b).
          `}
          <p>
            Une fonction est continue sur un ensemble si elle est continue en tout point de cet
            ensemble.
          </p>
        </Definition>
      </Slide>
      <Slide title="Exemples" cite={['stewart', 'pp. 996-997']}>
        <Example>
          <p>Sur quel ensemble la fonction</p>
          {tex`
            f(x, y) \defeq
            \begin{cases}
              \frac {x^2 - y^2} {x^2 + y^2} & \text{if}\ (x, y) \neq (0, 0)\\
              0 & \text{if}\ (x, y) = (0, 0)\\
            \end{cases}
          `}
          <p>est-elle continue?</p>
        </Example>
      </Slide>
      <Slide title="Exemples" cite={['stewart', 'pp. 996-997']}>
        <Example>
          <p>Sur quel ensemble la fonction</p>
          {tex`
            f(x, y) \defeq
            \begin{cases}
              \frac {3x^2 y} {x^2 + y^2} & \text{if}\ (x, y) \neq (0, 0)\\
              0 & \text{if}\ (x, y) = (0, 0)\\
            \end{cases}
          `}
          <p>est-elle continue?</p>
        </Example>
      </Slide>
      <Slide title="Exemples" cite={['stewart', 'pp. 996-997']}>
        <Example>
          <p>Sur quel ensemble les fonctions</p>
          {tex`
            h_1(x, y) \defeq e^{-(x^2 + y^2)},\quad
            h_2(x, y) \defeq \arctan \frac y x
          `}
          <p>sont elles continues?</p>
        </Example>
      </Slide>
      <Slide title="Exercices">
        <Iframe src="/calculus/14.1-14.2.pdf" />
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
        <p>
          Il suffit de traiter les autres variables comme constantes et de dériver par rapport à la
          variable concernée
        </p>
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
      <Slide title="Dérivées partielles: interprétation" cite={['stewart', 'p. 1002']}>
        <Geogebra id="qp39qpnd" />
      </Slide>
      <Slide title="Interprétation des dérivées partielles: exemple" cite={['stewart', 'p. 1002']}>
        <Example>
          <p>
            Soit {tex`f(x, y) \defeq 4 - x^2 - 2y^2`}. Trouvez {tex`f_x(1, 1)`} et {tex`f_y(1, 1)`}{' '}
            et interprétez ces nombres comme des pentes.
          </p>
        </Example>
        <Example>
          <p>On définit l'indice de masse corporel via la formule</p>
          {tex`
            B(m, h) = \frac m {h^2},
          `}
          <p>
            où {tex`m`} est la masse en kilogrammes et {tex`h`} la hauteur en mètres.
          </p>
          <p>
            Calculez les dérivées partielles en {tex`m = 64`} kg and {tex`h = 1.68`} m et
            interprétez.
          </p>
        </Example>
      </Slide>
      <Slide title="Dérivées partielles implicites" cite={['stewart', 'p. 1004']}>
        <Example>
          <p>
            Trouvez {tex`\frac {\partial z} {\partial x}`} et {tex`\frac {\partial z} {\partial y}`}
            , où {tex`z`} est définie implicitement par l'équation
          </p>
          {tex`
            x^3 + y^3 + z^3 + 6xyz + 4 = 0.
          `}
          <p>Ensuite, évaluez ces dérivées partielles au point {tex`(-1, 1, 2)`}.</p>
        </Example>
      </Slide>
      <Slide title="Dérivées d'ordre plus élevé" cite={['stewart', 'p. 1005']}>
        <p>
          On peut continuer le processus et calculer les dérivées partielles d'une dérivées
          partielle.
        </p>
        {tex`
          (f_x)_x \defeq \frac {\partial} {\partial x} \left(\frac {\partial f} {\partial x}\right)\\
          (f_x)_y \defeq \frac {\partial} {\partial y} \left(\frac {\partial f} {\partial x}\right)\\
          (f_y)_x \defeq \frac {\partial} {\partial x} \left(\frac {\partial f} {\partial y}\right)\\
          (f_y)_y \defeq \frac {\partial} {\partial y} \left(\frac {\partial f} {\partial y}\right)\\
        `}
      </Slide>
      <Slide title="Dérivées partielles secondes: exemple">
        <Example>
          <p>Trouvez les dérivées partielles de</p>
          {tex`
            f(x, y) \defeq x^3 + x^2 y^3 - 2y^2
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = x**3 + x**2 * y**3 - 2*y**2
          f.diff(x).diff(y)
        `}
      </Slide>
      <Slide title="Théorème de Clairaut">
        <p>
          En général, les dérivées sont <strong>symétriques</strong>.
        </p>
        <Theorem>
          <p>
            S'il existe un un disque centré en {tex`(a, b)`} tel que {tex`f`} est défini sur ce
            disque, et que les fonctions {tex`f_{xy}`} et {tex`f_{yx}`} sont continues sur ce
            disque, alors
          </p>
          {tex`
            \frac {\partial^2 f} {\partial x \partial y} =
            \frac {\partial^2 f} {\partial y \partial x}
          `}
        </Theorem>
      </Slide>
      <Slide title="Équations aux dérivées partielles">
        <Example>
          <p>
            Montrez que {tex`u(x, y) \defeq e^x \sin y`} satisfait l'
            <strong>équation de Laplace</strong>
          </p>
          {tex`
            \frac {\partial^2 u} {\partial x^2}
            + \frac {\partial^2 u} {\partial y^2}
            = 0
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          u = exp(x) * sin(y)
          u.diff(x, 2) + u.diff(y, 2)
        `}
        <Example>
          <p>
            Montrez que {tex`u(x, t) \defeq \sin(x - at)`} satisfait l'
            <strong>équation d'onde</strong>
          </p>
          {tex`
            \frac {\partial^2 u} {\partial t^2}
            = a^2
            \frac {\partial^2 u} {\partial x^2}
          `}
        </Example>
      </Slide>
      <Slide title="Rappels: équations de droites" cite={['stewart', 'p. 863']}>
        <Geogebra id="F3vjkggB" height={450} />
        <Definition title="Équation vectorielle">
          {tex`
            \vec r = 
            \underbrace{\vec {r_0}}_{\substack{\text{point de}\\ \text{départ}}}
            + t\underbrace{\vec v}_{\substack{\text{vecteur}\\ \text{directeur}}}
          `}
        </Definition>
        <p>
          En coordonnées cartésiennes, on obtient les <strong>équations paramétriques</strong>
        </p>
        {tex`
          \begin{cases}
            x &= x_0 + a t\\
            y &= y_0 + b t\\
            z &= y_0 + c t
          \end{cases}
        `}
      </Slide>
      <Slide title="Équations de droite: exemple">
        <Example>
          <p>
            Trouvez une équation vectorielle et les équations paramétriques de la droite passant par{' '}
            {tex`(5, 1, 3)`} et parallèle au vecteur {tex`\vec i + 4 \vec j - 2 \vec k`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          t = Symbol("t")
          r = Matrix([5, 1, 3]) + t * Matrix([1, 4, -2])
          r.subs(t, 1)
        `}
      </Slide>
      <Slide title="Équations cartésiennes">
        {tex`
          \begin{cases}
            x &= x_0 + a t\\
            y &= y_0 + b t\\
            z &= y_0 + c t
          \end{cases}
        `}
        <p>En isolant {tex`t`}, on obtient</p>
        {tex`
          t
          = \boxed{\frac {x - x_0} a
          = \frac {y - y_0} b
          = \frac {z - z_0} c}.
        `}
        <p>
          Ces équations sont appelées <strong>équations cartésiennes</strong>
        </p>
        <Remark>
          <p>
            Remarquez que l'encadré cache <strong>deux équations</strong>. En effet, une droite est
            l'intersection de deux plans.
          </p>
        </Remark>
      </Slide>
      <Slide title="Droites: exemple">
        <Example>
          <p>
            Trouver les équations paramétriques et cartésiennes de la droite qui passe par les
            points {tex`A(2, 4, -3)`} et {tex`B(3, -1, 1)`}. Quand cette droite intercepte-t-elle le
            plan {tex`xy`}?
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z, t = symbols("x y z t")
          r = Matrix([x, y, z])
          A = Matrix([2, 4, -3])
          B = Matrix([3, -1, 1])
          Eq(r, A + t * (B - A))
        `}
      </Slide>
      <Slide title="Droites gauches: exemple">
        <Example>
          <p>Montrez que les lignes suivantes</p>
          {tex`
            \begin{cases}
              x &= 1 + t\\
              y &= -2 + 3t\\
              z &= 4 - t
            \end{cases}
            \quad
            \begin{cases}
              x &= 2s\\
              y &= 3 + s\\
              z &= -3 + 4s
            \end{cases}
          `}
          <p>sont gauches</p>
        </Example>
      </Slide>
      <Slide title="Équation cartésienne d'un plan">
        <p>
          Dans l'espace à 3 dimensions, un plan est déterminé par <strong>un point</strong>{' '}
          (déterminé par {tex`\vec r_0`}) et une <strong>direction normale</strong> {tex`\vec n`}.
          L'équation cartésienne est donnée par
        </p>
        {tex`
          \boxed{
            \vec r \cdot \vec n = \vec r_0 \cdot \vec n
          }
        `}
        <p>En coordonnées, cela donne:</p>
        {tex`
          a x + b y + cz = d
          \qquad d = \vec r_0 \cdot \vec n,
          \, \vec n = (a, b, c)
        `}
      </Slide>
      <Slide title="Équations cartésiennes d'un plan: exemple">
        <Example>
          <p>
            Trouvez l'équation du plan passant par {tex`(2, 4, -1)`} avec comme vecteur normal{' '}
            {tex`\vec n = (2, 3, 4)`}. Trouvez les intersections avec les axes et esquissez le plan.
          </p>
        </Example>
      </Slide>
      <Slide title="Équations cartésiennes d'un plan: exemple àpd 3 points">
        <Example>
          <p>Trouvez l'équation du plan passant par les points</p>
          {tex`
            P(1, 3, 2), \quad Q(3, -1, 6) \quad R(5, 2, 0).
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          P = Matrix([1, 3, 2])
          Q = Matrix([3, -1, 6])
          R = Matrix([5, 2, 0])
          r = Matrix([Symbol("x"), Symbol("y"), Symbol("z")])
          n = (Q - P).cross(R - P)
          Eq(r.dot(n), P.dot(n))
        `}
      </Slide>
      <Slide title="Intersection droite plan: exemple">
        <Example>
          <p>Trouvez le point où s'intersectent la droite</p>
          {tex`
            \begin{cases}
              x &= 2 + 3t\\
              y &= -4t\\
              z &= 5 + t
            \end{cases}
          `}
          <p>et le plan d'équation {tex`4x + 5y - 2z = 18`}</p>
        </Example>
      </Slide>
      <Slide title="Angle entre deux plans">
        <ul>
          <li>Deux plans sont parallèles si leurs vecteurs normaux sont parallèles</li>
          <li>L'angle entre deux plans est l'angle entre leurs vecteurs normaux</li>
        </ul>
        <Geogebra id="EFHAFt54" />
      </Slide>
      <Slide title="Angle entre deux plans: exemple">
        <Example>
          <ol>
            <li>
              Trouvez l'angle entre les plans {tex`x + y + z = 1`} et {tex`x - 2y + 3z = 1`}
            </li>
            <li>Trouvez les équations cartésiennes de la ligne d'intersection</li>
          </ol>
        </Example>
        {py.jupyter`
          from sympy import *
          n1 = Matrix([1, 1, 1])
          n2 = Matrix([1, -2, 3])
          norm = lambda v: sqrt(v.dot(v))
          theta = acos( n1.dot(n2) / (norm(n1) * norm(n2)) )
          n1.cross(n2)
        `}
      </Slide>
      <Slide title="Distance entre un plan et un point">
        <Question>
          <p>
            Quelle est la distance entre un point {tex`P_1(x_1, y_1, z_1)`} et le plan{' '}
            {tex`a x + by + cz + d = 0`}?
          </p>
        </Question>
        <Figure src="distance-point-plane.png" alt="Distance point/plan" />
        {tex`
          \text{distance}
          &= \abs{
            (\vec P_1 - \vec P_0) \cdot \frac {\vec n} {\norm n}
          }\\
          &= \frac {\abs{ \vec P_1 \cdot \vec n - \vec P_0 \cdot \vec n }} {\norm n}
        `}
      </Slide>
      <Slide title="Distance entre un plan et un point: exemple">
        <Example>
          <p>Trouvez la distance entre les plans</p>
          {tex`
            10x + 2y - 2z = 5, \quad 5x + y - z = 1
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          P1 = Matrix([Rational(1, 2), 0, 0])
          n = Matrix([5, 1, -1])
          (P1.dot(n) - 1) / sqrt(n.dot(n))
        `}
      </Slide>
      <Slide title="Distance entre deux droites gauches">
        <Example>
          <p>Trouvez la distance entre les droites</p>
          {tex`
            \begin{cases}
              x &= 1 + t\\
              y &= -2 + 3t\\
              z &= 4 - t
            \end{cases}
            \quad
            \begin{cases}
              x &= 2s\\
              y &= 3 + s\\
              z &= -3 + 4s
            \end{cases}
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          s, t = symbols("s t")
          v1 = Matrix([1, 3, -1])
          v2 = Matrix([2, 1, 4])
          n = v1.cross(v2)
          d = Matrix([2*s, 3 + s, -3 + 4*s]).subs(s, 0).dot(n)
          P1 = Matrix([1 + t, -2 + 3*t, 4 - t]).subs(t, 0)
          (P1.dot(n) - d) / sqrt(n.dot(n))
        `}
      </Slide>
      <Slide title="Exercises">
        <Iframe src="/calculus/12.5-14.3.pdf" />
      </Slide>
    </Slideshow>
  )
}
