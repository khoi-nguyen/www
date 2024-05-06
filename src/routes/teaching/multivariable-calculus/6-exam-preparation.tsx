const meta: Metadata = {
  title: "Préparation à l'examen",
  subtitle: 'Chapitre 4',
  description: "Résumé et questions d'examen",
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Exercice type I: optimisation">
        <ol>
          <li>Partie problème: on vous donnera la réponse finale</li>
          <li>Résoudre le système {tex`\grad f = 0`}</li>
          <li>
            Critère de la dérivée seconde
            {tex`
              \begin{pmatrix}
                \partial_{xx} f & \partial_{xy} f\\
                \partial_{yx} f & \partial_{yy} f
              \end{pmatrix}
              \qquad
              \begin{cases}
              \text{déterminant positif}, \partial_{xx} f > 0: \text{minimum}\\
              \text{déterminant positif}, \partial_{xx} f < 0: \text{maximum}\\
              \end{cases}
            `}
          </li>
          <li>Réponse à la question</li>
        </ol>
        <h3>Suggestion</h3>
        <p>
          <strong>Exercices 14.7, 41 à 60</strong>
        </p>
      </Slide>
      <Slide title="Optimisation">
        <Exercise>
          <p>Considérons une boîte rectangulaire dont les dimensions sont {tex`x, y, z > 0`}.</p>
          <ol>
            <li>
              Sachant que la diagonale de la boîte doit être {tex`L`}, montrez que le volume peut
              être donné par {tex`V(x, y) = x y \sqrt {L^2 - x^2 - y^2}`}
            </li>
            <li>Quelles dimensions donnent un volume maximal?</li>
            <li>
              En utilisant le critère de la dérivée seconde, montrez que la valeur obtenue est bien
              un maximum
            </li>
          </ol>
        </Exercise>
      </Slide>
      <Slide title="Optimisation: solution via python" columns>
        <div>
          {py.jupyter`
            from sympy import *
            x, y, L = symbols("x y L", positive=True)
            z = sqrt(L**2 - x**2 - y**2)
            V = x*y*z
            sol = solve([V.diff(x), V.diff(y)], [x, y])[0]
            x0, y0 = sol[0], sol[1]
            x0, y0, z.subs({x: x0, y: y0})
          `}
        </div>
        <div>
          <Jupyter
            lang="python"
            before={py.raw`
            from sympy import *
            x, y, L = symbols("x y L", positive=True)
            z = sqrt(L**2 - x**2 - y**2)
            V = x*y*z
            sol = solve([V.diff(x), V.diff(y)], [x, y])[0]
            x0, y0 = sol[0], sol[1]
            x0, y0, z.subs({x: x0, y: y0})
          `}
          >
            {py.raw`
              H = Matrix([
              [V.diff(x, 2), V.diff(x, y)], 
              [V.diff(x, y), V.diff(y, 2)]
              ]).subs({x: x0, y: y0})
              H.det()
            `}
          </Jupyter>
        </div>
      </Slide>
      <Slide title="Exercice type 2: champs gradients et intégrales curvilignes">
        <ol>
          <li>On montre par calcul que {tex`\curl F = \vec 0`}</li>
          <li>
            "Puisque {tex`\curl \vec F = \vec 0`} et que le domaine est simplement connexe, on en
            conclut que {tex`F`} est conservatif".
          </li>
          <li>Calcul du potentiel {tex`f`}</li>
          <li>
            Calcul d'une circulation par le théorème fondamental:
            {tex`
              f(\text{arrivée}) - f(\text{départ})
            `}
          </li>
        </ol>
        <Remark>
          <p>
            Focalisez vous sur le cas tridimensionel. Si vous avez un champ bidimensionel, complétez
            par {tex`0`} pour la composante {tex`z`}.
          </p>
        </Remark>
        <h3>Suggestion</h3>
        <p>Exercices 16.3</p>
      </Slide>
      <Slide title="Exercice 16.3.17">
        <Exercise>
          <p>Considérons le champ de vecteurs</p>
          {tex`
            \vec F(x, y, z) = yz e^{x z} \vec i + e^{x z} \vec j + x y e^{x z} \vec k
          `}
          <ol>
            <li>Montrez que {tex`\vec F`} est conservatif</li>
            <li>
              Trouvez {tex`f`} tel que {tex`\grad f = \vec F`}
            </li>
            <li>
              Évaluez l'intégrale
              {tex`
                \int_C \vec F \cdot \dd \vec r,
                \quad
                \vec r(t) = (t^2 + 1) \vec i + (t^2 - 1) \vec j + (t^2 - 2t) \vec k,
                \quad 0 \leq t \leq 2
              `}
            </li>
          </ol>
        </Exercise>
      </Slide>
      <Slide title="Exercice 16.3.17">
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = y*z*exp(x*z)*i + exp(x*z)*j + x*y*exp(x*z)*k
          curl(F)
        `}
        <Jupyter
          lang="python"
          before={py.raw`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = y*z*exp(x*z)*i + exp(x*z)*j + x*y*exp(x*z)*k
        `}
        >
          {py.raw`
            f = integrate(F.dot(i), x)
            f += integrate(F.dot(j) - f.diff(y), y)
            f += integrate(F.dot(k) - f.diff(z), z)
            f
          `}
        </Jupyter>
        <Jupyter
          lang="python"
          before={py.raw`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = y*z*exp(x*z)*i + exp(x*z)*j + x*y*exp(x*z)*k
          f = integrate(F.dot(i), x)
          f += integrate(F.dot(j) - f.diff(y), y)
          f += integrate(F.dot(k) - f.diff(z), z)
        `}
        >
          {py.raw`
            t = Symbol("t")
            r = (t**2 + 1)*i + (t**2 - 1)*j + (t**2 - 2*t)*k
            start, end = r.subs({t: 0}), r.subs({t: 2})
            fstart = f.subs({x: start.dot(i), y: start.dot(j), z: start.dot(k)})
            fend = f.subs({x: end.dot(i), y: end.dot(j), z: end.dot(k)})
            fend - fstart
          `}
        </Jupyter>
      </Slide>
      <Slide title="Exercice type 3: analyse vectorielle">
        <p>
          Vous devez pouvoir calculez des intégrales de fonctions, et de champs de vecteurs sur des
          courbes, surfaces et volumes. Directement ou par les théorèmes de Stokes ou divergence.
          Vous devez si besoin pouvoir calculer en coordonnées polaires, cylindriques ou sphériques.
        </p>
        <Remark>
          <p>Green est un cas particulier de Stokes</p>
        </Remark>
        <h3>Suggestion de préparation</h3>
        <p>Exercices des sections 16.8 et 16.9</p>
        <p>Les exercices qui vous font vérifier Stokes/divergence sont très utiles.</p>
      </Slide>
      <Slide title="Exercice 16.8.15">
        <Exercise>
          <p>Vérifiez que le théorème de Stokes est vrai pour le champ de vecteur</p>
          {tex`
            \vec F(x, y, z) = y\vec i + z \vec j + x \vec k
          `}
          <p>
            et l'hémisphère {tex`x^2 + y^2 + z^2 = 1`}, {tex`y \geq 0`} orienté dans la direction
            des {tex`y`} positifs.
          </p>
        </Exercise>
        <Remark>
          <p>
            Les coordonnées sphériques et le vecteur normal vous seraient données pour cet exercice
          </p>
        </Remark>
        {py.jupyter`
          from sympy import *
          rho, theta, phi = symbols("rho theta phi")
          x = rho*sin(phi)*cos(theta)
          y = rho*sin(phi)*sin(theta)
          z = rho*cos(phi)
          r = Matrix([x, y, z])
          N = simplify(r.diff(phi).cross(r.diff(theta)))
        `}
      </Slide>
      <Slide title="Valeur de l'intégrale">
        {py.jupyter`
          from sympy import *
          F = lambda x, y, z: Matrix([y, z, x])
          t = Symbol("t")
          r = Matrix([cos(t), 0, -sin(t)])
          integrate(F(*r).dot(r.diff(t)), (t, 0, 2*pi))
        `}
      </Slide>
    </Slideshow>
  )
}
