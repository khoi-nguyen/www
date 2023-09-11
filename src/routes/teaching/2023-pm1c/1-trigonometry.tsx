import meta from './1-trigonometry.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide
        title={() => (
          <>
            Bienvenue à l'
            <Abbr key="ECAM" />
          </>
        )}
      >
        <p>Bienvenue! Je vous souhaite énormément de succès et de belles rencontres.</p>
        <p>Quelques règles avant de commencer le cours:</p>
        <ul>
          <li>
            <strong>Ponctualité</strong>: les retardataires ne seront admis qu'en une fois 15
            minutes après le début du cours.
          </li>
          <li>
            <strong>Respect du temps de parole</strong>: silence lorsque quelqu'un·e s'exprime.
          </li>
          <li>
            <strong>Respect mutuel et de l'apprentissage du groupe</strong>
          </li>
        </ul>
      </Slide>
      <Slide title="À propos de ce cours"></Slide>
      <Slide title="Degrés et radians" cite={['stewart', 'p. A24']}>
        <p>
          Le <strong>radian</strong> (rad, facultatif) et le <strong>degré</strong> ({tex`\circ`})
          sont deux unités d'angle satisfaisant
          {tex`
            1 \, \text{tour} = 2 \pi \,\text{rad} = 360^\circ.
          `}
        </p>
        <table>
          <tbody>
            <tr>
              <th>Degrés</th>
              {['0', '30', '45', '60', '90'].map((angle) => (
                <td>{tex`${angle}^\circ`}</td>
              ))}
            </tr>
            <tr>
              <th>Radians</th>
              <td>{tex`0`}</td>
              {['6', '4', '3', '2'].map((den) => (
                <td>{tex`\frac \pi {${den}}`}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <Question title="Comment convertir?">
          <p>Simplement employer une règle de trois, ou la règle suivante:</p>
          <Mermaid scale={2}>
            {String.raw`
              graph LR
                D(degrés) --"× π/180"--> R(radians)
                R --"× 180/π"--> D
            `}
          </Mermaid>
        </Question>
        <Example title="Conversions">
          <ul>
            <li>Convertir 1 radian en degrés</li>
            <li>Convertir {tex`60^\circ`} en radians</li>
            <li>Convertir {tex`5 \pi / 4`} en degrés</li>
          </ul>
        </Example>
        <p>
          Exercices 1-12 <Cite key="stewart">p. A32</Cite>
        </p>
      </Slide>
      <Slide title="Pourquoi plusieurs unités?">
        <Question title="Pourquoi plusieurs unités?">
          <ul>
            <li>
              Les <strong>degrés</strong> ont tendance à être des nombres plus facilement
              manipulables.
              {tex`
                \text{quart de tour} = 90^\circ = 1.5707963\dots \text{(rad)}
              `}
            </li>
            <li>
              Les <strong>radians</strong> donnent des formules plus faciles pour
              <ul>
                <li>dérivation et l'intégration/primitivation</li>
                <li>longueur l'arc et aire de secteur</li>
              </ul>
            </li>
          </ul>
        </Question>
      </Slide>
      <Slide title="Longueur d'arc" cite={['stewart', 'p. A24']}>
        <Proposition>
          <p>
            La longueur de l'arc de cercle de rayon {tex`r`} intercepté par un angle au centre
            d'amplitude en <strong>radians</strong> {tex`\theta`} est donnée par
          </p>
          {tex`
            L = r \theta
          `}
        </Proposition>
        <Example>
          <ol>
            <li>Si le rayon est de 5cm, quel angle est sous-tendu par un arc de 6cm?</li>
            <li>
              Si le cercle a un rayon de 3cm, quel est la longueur de l'arc sous-tendu par un angle
              au centre de {tex`3 \pi / 8`}?
            </li>
          </ol>
          <p>
            Exercices: 13-16 <Cite key="stewart">p. A32</Cite>.
          </p>
        </Example>
        <Remark title="Interprétation du radian">
          <p>
            Dans un cercle de rayon 1, on a {tex`L = \theta`}, donc l'amplitude correspond à l'arc
            de cercle.
          </p>
        </Remark>
      </Slide>
      <Slide title="Cercle trigonométrique">
        <Geogebra id="yyufnmy9" />
      </Slide>
      <Slide title="Rapports trigonométriques">
        <Definition title="SOH CAH TOA">
          {tex`
            \sin \theta \defeq \frac {\text{opposé}} {\text{hypothénuse}}, \quad
            \cos \theta \defeq \frac {\text{adjacent}} {\text{hypothénuse}}, \quad
            \tan \theta \defeq \frac {\text{opposé}} {\text{adjacent}}.
          `}
        </Definition>
      </Slide>
    </Slideshow>
  );
};
