import meta from './2-vectors.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Vecteurs (point de vue géométrique)">
        <ol>
          <li>Addition (Loi du parallélogramme)</li>
          <li>Multiplication Scalaire</li>
          <li>Soustraction: {tex`\vec a - \vec b`}</li>
          <li>Relation de Chasles</li>
        </ol>
      </Slide>
      <Slide title="Composants" cite={['stewart', 'p. 840']}>
        <p>
          Soient {tex`A(x_A, y_A, z_A)`} et {tex`B (x_B, y_B, z_B)`}.
        </p>
        {tex`
          \boxed{
            \vec {AB} \defeq (x_B - x_A, y_B - y_A, z_B - z_A).
          }
        `}
        <Example>
          Trouver le vecteur reliant {tex`A(2, -3, 4)`} et {tex`B(-2, 1, 1)`}, c'est-à-dire{' '}
          {tex`\vec {AB}`}.
        </Example>
      </Slide>
      <Slide title="Longueur ou norme d'un vecteur" cite={['stewart', 'p. 841']}>
        <Definition title="Norme">
          <p>
            La <strong>norme</strong> de {tex`\vec a = (a_1, a_2, a_3)`} est donnée par
          </p>
          {tex`
            \norm {\vec a} = \sqrt{a_1^2 + a_2^2 + a_3^2}
          `}
        </Definition>
      </Slide>
      <Slide title="Somme et multiplication scalaire" cite={['stewart', 'p. 841']}>
        <p>Les opérations sur les vecteurs se font composante par composante.</p>
        <p>
          Soit {tex`\vec a = (a_1, a_2, a_3)`} et {tex`\vec b = (b_1, b_2, b_3)`}.
        </p>
        {tex`
          \begin{align*}
          \vec a + \vec b &\defeq (a_1 + b_1, a_2 + b_2, a_3 + b_3)\\
          \vec a - \vec b &\defeq (a_1 - b_1, a_2 - b_2, a_3 - b_3)\\
          c \vec a &\defeq (c a_1, c a_2, c a_3)
          \end{align*}
        `}
        <Example>
          <p>
            Si {tex`\vec a = (4, 0, 3)`} et {tex`\vec b = (-2, 1, 5)`}, trouve {tex`\norm {\vec a}`}{' '}
            et les vecteurs {tex`\vec a + \vec b`}, {tex`\vec a - \vec b`}, {tex`3 \vec b`},{' '}
            {tex`2 \vec a + 5 \vec b`}.
          </p>
        </Example>
      </Slide>
      <Slide title="Base canonique" cite={['stewart', 'p. 842']}>
        <p>
          Les vecteurs suivants forment la <strong>base canonique</strong>.
        </p>
        {tex`
          \vec i = (1, 0, 0) \quad
          \vec j = (0, 1, 0) \quad
          \vec k = (0, 0, 1)
        `}
        <p>Ces vecteurs permettent de réécrire</p>
        {tex`
          (a_1, a_2, a_3) = a_1 \vec i + a_2 \vec j + a_3 \vec k
        `}
        <Example>
          <p>
            Si {tex`\vec a = \vec i + 2 \vec j - 3 \vec k`} et {tex`\vec b = 4 \vec i + 7 \vec k`},
            exprime le vecteur {tex`2 \vec a + 3 \vec b`} en termes de {tex`\vec i, \vec j, \vec k`}
          </p>
        </Example>
      </Slide>
      <Slide title="Vecteur unitaire" cite={['stewart', 'p. 843']}>
        <Definition title="Vecteur unitaire">
          <p>
            Un vecteur <strong>unitaire</strong> est un vecteur dont la norme vaut {tex`1`}.
          </p>
        </Definition>
        <p>Si {tex`\vec a \neq 0`}, alors</p>
        {tex`
          \vec u = \frac {\vec a} {\norm {\vec a}}
        `}
        <p>
          est un <strong>vecteur unitaire</strong>.
        </p>
        <Example>
          <p>Trouve le vecteur unitaire dans la direction de {tex`2 \vec i - \vec j - 2 \vec k`}</p>
        </Example>
      </Slide>
      <Slide title="Produit scalaire" cite={['stewart', 'p. 847']}>
        <p>
          Soient {tex`\vec a = (a_1, a_2, a_3)`} et {tex`\vec b = (b_1, b_2, b_3)`}
        </p>
        <Definition title="Produit scalaire">
          {tex`
            \begin{align*}
            \vec a \cdot \vec b
            &= \norm {\vec a} \norm {\vec b} \cos \theta\\
            &= a_1 b_1 + a_2 b_2 + a_3 b_3
            \end{align*}
          `}
        </Definition>
        <Example>
          <p>Calculer les produits scalaires suivants:</p>
          {tex`
            \begin{align*}
              (-1, 7, 4) \cdot (6, 2, -1/2) &= \dots\\
              (\vec i + 2 \vec j - 3 \vec k) \cdot (2 \vec j - \vec k) &= \dots
            \end{align*}
          `}
        </Example>
        <Example>
          <p>
            Si les vecteurs {tex`\vec a`} et {tex`\vec b`} ont {tex`4`} et {tex`6`} comme longeur,
            et que l'angle entre eux est {tex`\frac \pi 3`}, trouve {tex`\vec a \cdot \vec b`}.
          </p>
        </Example>
      </Slide>
      <Slide title="Angle entre deux vecteurs">
        <p>
          En isolant {tex`\cos \theta`} dans la formule ci-dessus, on peut trouver l'
          <strong>angle</strong> entre deux vecteurs:
        </p>
        {tex`
          \boxed{
            \cos \theta = \frac {\vec v \cdot \vec w} {\norm {\vec v} \norm {\vec w}}
          }
        `}
        <Example>
          <p>
            Trouve l'angle entre les vecteurs {tex`\vec a = (2, 2, -1)`} et{' '}
            {tex`\vec b = (5, -3, 2)`}.
          </p>
        </Example>
        <p>
          Deux vecteurs sont <strong>orthogonaux</strong> ou <strong>perpendiculaires</strong> si{' '}
          {tex`\vec a \cdot \vec b = 0`}.
        </p>
        <Example>
          <p>
            Montre que {tex`2 \vec i + 2 \vec j - \vec k`} est perpendiculaire à{' '}
            {tex`5 \vec i - 4 \vec j + 2 \vec k`}
          </p>
        </Example>
      </Slide>
      <Slide title="Produit scalaire: animation">
        <p>Le produit scalaire mesure à quel point deux vecteurs sont parallèles.</p>
        <Geogebra id="bg4f7qyv" />
        <ul>
          <li>produit scalaire {tex`< 0`}: angle obtus</li>
          <li>produit scalaire {tex`= 0`}: angle droit</li>
          <li>produit scalaire {tex`> 0`}: angle aigu</li>
        </ul>
      </Slide>
      <Slide title="Projection" cite={['stewart', 'p. 851']}>
        {tex`
          \text{proj}_{\vec a}(\vec b) = \frac {\vec b \cdot \vec a} {\norm {\vec a}^2} \vec a
        `}
        <Example>
          <p>
            Trouver la projection de {tex`\vec b = (1, 1, 2)`} sur {tex`\vec a = (-2, 3, 1)`}.
          </p>
        </Example>
      </Slide>
      <Slide title="Produit vectoriel">
        <p>
          Écrivons {tex`\vec a = (a_1, a_2, a_3)`} et {tex`\vec b = (b_1, b_2, b_3)`}.
        </p>
        {tex`
          \begin{align*}
            \vec a \times \vec b
            &= (a_2 b_3 - a_3 b_2, a_3 b_1 - a_1 b_3, a_1 b_2 - a_2 b_1)\\
            &=
            \begin{vmatrix}
              \vec i & \vec j & \vec k\\
              a_1 & a_2 & a_3\\
              b_1 & b_2 & b_3
            \end{vmatrix}
          \end{align*}
        `}
        <Example>
          <p>
            If {tex`\vec a = (1, 3, 4)`} et {tex`\vec b = (2, 7, -5)`} montre que{' '}
            {tex`\vec a \times \vec b = (-43, 13, 1)`}
          </p>
        </Example>
      </Slide>
      <Slide title="Produit vectoriel: interpretation">
        <Geogebra id="mkzzm8hh" height={500} />
        <Interpretation>
          <p>{tex`\vec u \times \vec v`} est un vecteur</p>
          <ul>
            <li>
              <strong>orthogonal</strong> à {tex`\vec u`} et à {tex`\vec v`}.
            </li>
            <li>
              dont la norme est l'<strong>aire du parallélogramme</strong> formé par {tex`\vec u`}{' '}
              et {tex`\vec v`}.
              {tex`
              \norm {\vec a \times \vec b} = \norm {\vec a} \norm {\vec b} \sin \theta
              `}
            </li>
            <li>
              Respectant la <strong>règle de la main droite</strong>.
            </li>
          </ul>
        </Interpretation>
      </Slide>
      <Slide title="Produit vectoriel: examples" cite={['stewart', 'p. 858']}>
        <Example>
          <p>
            Trouve un vecteur perpendiculaire au plan passant par {tex`P (1, 4, 6)`},{' '}
            {tex`Q (-2, 5, -1)`} et {tex`R (1, -1, 1)`}
          </p>
        </Example>
        <Example>
          <p>Trouve l'aire du triangle passant par les points mentionnés ci-dessus</p>
        </Example>
      </Slide>
      <Slide title="Propriétés du produit vectoriel">
        {tex`
          \vec i \times \vec j = \vec k,
          \quad
          \vec j \times \vec k = \vec i,
          \quad
          \vec k \times \vec i = \vec j,
        `}
        <Proposition>
          {tex`
            \begin{align*}
              \vec a \times \vec b &= -\vec b \times \vec a\\
              (c \vec a) \times \vec b &= c(\vec a \times \vec b) = \vec a \times (c \vec b)\\
              \vec a \times (\vec b + \vec c) &= \vec a \times \vec b + \vec a \times \vec c\\
              (\vec a + \vec b) \times \vec c &= \vec a \times \vec c + \vec b \times \vec c\\
              \vec a \cdot (\vec b \times \vec c) &= (\vec a \times \vec b) \cdot \vec c\\
              \vec a \times (\vec b \times \vec c) &= (\vec a \cdot \vec c) \vec b - (\vec a \cdot \vec b) \vec c
            \end{align*}
          `}
        </Proposition>
      </Slide>
      <Slide title="Triple produit" cite={['stewart', 'pp. 859-860']}>
        {tex`
          \vec a \cdot (\vec b \times \vec c)
          =
          \begin{vmatrix}
            a_1 & a_2 & a_3\\
            b_1 & b_2 & b_3\\
            c_1 & c_2 & c_3
          \end{vmatrix}
        `}
        <Proposition>
          <p>
            Le volume du parallélipipède déterminé par les vecteurs {tex`\vec a`}, {tex`\vec b`},{' '}
            {tex`\vec c`} est donné par
          </p>
          {tex`
            V = \norm {\vec a \cdot (\vec b \times \vec c)}.
          `}
        </Proposition>
        <Example>
          <p>
            Montre que les vecteurs {tex`\vec a = (1, 4, -7)`}, {tex`\vec b = (2, -1, 4)`} et{' '}
            {tex`\vec c = (0, -9, 18)`} sont coplanaires.
          </p>
        </Example>
      </Slide>
      <Slide title="Applications">
        {tex`
          W = \vec F \cdot \vec D
          \qquad
          \text{Travail d'une force}
        `}
        <Example>
          <p>
            Une charrette est tiré sur 100m horizontalement par une force de 70N. Le manche de la
            charrette est à un angle de {tex`35^\circ`} de l'horizontale. Calcule le travail.
          </p>
        </Example>
        {tex`
          \vec M = \vec r \times \vec F
          \qquad
          \text{Moment d'une force}
        `}
        <Example>
          <p>
            Un boulon est serré en appliquant une force de 40N à une clé anglaise. Calcule la norme
            du moment de force autour du boulon.
          </p>
        </Example>
      </Slide>
      <Slide title="Exercices: base">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Vectors-1/Edexcel-Set-B/Vectors.pdf" />
      </Slide>
      <Slide title="Exercices: base">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Vectors-2/Edexcel-Set-B/Vectors.pdf" />
      </Slide>
      <Slide title="Exercices: produits scalaires et vectoriels">
        <Iframe src="https://pmt.physicsandmathstutor.com/download/Maths/A-level/FP3/Topic-Qs/Edexcel-Set-2/Ch.5%20Vectors.pdf" />
      </Slide>
    </Slideshow>
  );
};
