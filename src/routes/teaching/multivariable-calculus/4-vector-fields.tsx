const meta: Metadata = {
  title: 'Champs de vecteurs',
  subtitle: 'Chapitre 3',
  description: 'Intégrales de contour et de surface',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Champs de vecteurs">
        <Definition>
          <p>Un champ de vecteur est une fonction</p>
          {tex`
            \vec F : D \subset \R^2 \to \R^2
          `}
        </Definition>
        <p>On a une définition analogue sur {tex`\R^3`}</p>
      </Slide>
      <Slide title="Représentation d'un champ de vecteur à 2 dimensions">
        <Example>
          <p>Représentez le champ de vecteur {tex`\vec F(x, y) = -y \vec i + x \vec j`}.</p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x, y = np.meshgrid(
            np.linspace(-2, 2, 10),
            np.linspace(-2, 2, 10),
          )
          F = [-y, x]
          plt.quiver(x, y, *F, color='g')
        `}
      </Slide>
      <Slide title="Représentation d'un champ de vecteur à 3 dimensions">
        <Example>
          <p>Représentez le champ de vecteur {tex`\vec F(x, y, z) = z \vec k`}.</p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x, y, z = np.meshgrid(
            np.linspace(-2, 2, 5),
            np.linspace(-2, 2, 5),
            np.linspace(-2, 2, 5)
          )
          F = [0, 0, z]
          fig = plt.figure()
          ax = fig.add_subplot(111, projection='3d')
          ax.quiver(x, y, z, *F, color='g')
        `}
      </Slide>
      <Slide title="Exemple: loi de la gravitation">
        <Example>
          {tex`
            \norm {\vec F} = \frac {m M G} {r^2}
            \Longleftrightarrow
            \vec F(\vec x) = -\frac {m M G} {\norm{\vec x}^3} \vec x
          `}
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x, y, z = np.meshgrid(
            np.linspace(-2, 2, 5),
            np.linspace(-2, 2, 5),
            np.linspace(-2, 2, 5)
          )
          r = (x**2 + y**2 + z**2)**(1/2)
          F = [-x/r**3, -y/r**3, -z/r**3]
          fig = plt.figure()
          ax = fig.add_subplot(111, projection='3d')
          ax.quiver(x, y, z, *F, color='g')
        `}
      </Slide>
      <Slide title="Exemple: loi de Coulomb">
        <Example>
          {tex`
            \vec F(\vec x) = \frac {\epsilon q Q} {\norm {\vec x}^3} \vec x\\
          `}
        </Example>
        <Remark>
          <p>Champ électrique: force par unité de charge</p>
          {tex`
            \vec E(\vec x) = \frac {\epsilon Q} {\norm {\vec x}^3} \vec x\\
          `}
        </Remark>
      </Slide>
      <Slide title="Champ gradients">
        {tex`
          \grad f(x, y, z) = \frac {\partial f} {\partial x} \vec i
          + \frac {\partial f} {\partial y} \vec j
          + \frac {\partial f} {\partial z} \vec k
        `}
        <Question>
          <ul>
            <li>Quand un champ de vecteur est-il un champ gradient?</li>
          </ul>
        </Question>
      </Slide>
      <Slide title="Champ gradient: exemple">
        <Example>
          <p>
            Trouvez le champ gradient de {tex`f(x, y) = x^2 y - y^3`}. Esquissez champ gradient et
            les courbes de niveau de {tex`f`}. Comment sont-ils reliés?
          </p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x, y = np.meshgrid(np.linspace(-2, 2, 10), np.linspace(-2, 2, 10))
          F = [2*x*y, x**2 - 3*x**2]
          plt.quiver(x, y, *F, color='g')
          x, y = np.meshgrid(np.linspace(-2, 2, 100), np.linspace(-2, 2, 100))
          f = x**2 * y - y**3
          plt.contour(x, y, f, levels=30)
        `}
      </Slide>
    </Slideshow>
  )
}
