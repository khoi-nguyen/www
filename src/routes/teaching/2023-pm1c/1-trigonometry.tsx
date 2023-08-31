import meta from './1-trigonometry.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Motivations">
        <Definition>
          <p>Pourquoi la trigonométrie est-elle importante?</p>
        </Definition>
      </Slide>
      <Slide title="Fourier" split={false} columns>
        <Iframe src="https://www.myfourierepicycles.com/" />
        <div>
          <p>À titre d'information, pas dans la matière.</p>
          <Theorem title="Fourier">
            <p>
              Toute fonction <em>raisonnable</em> peut être reconstruite à partir de fonctions
              trigonométriques.
            </p>
          </Theorem>
          <Remark title="JPEG, MP3">
            <p>
              Cette idée est à la base d'algorithmes de compression tels que <Abbr key="JPEG" /> et{' '}
              <Abbr key="MP3" />.
            </p>
          </Remark>
        </div>
      </Slide>
      <Slide title="Radians">
        <Proposition title="Pourquoi les radians?">
          Soit {tex`\alpha`} une amplitude en <em>degrés</em>.
          {tex`
            \begin{align*}
              L &= {\color{green} \frac \pi {180}} \cdot \alpha \cdot r\\
              A &= {\color{green} \frac \pi {180}} \cdot \frac \alpha 2 \cdot r^2\\
              \frac \dd {\dd x} \sin(x^\circ) &= {\color{green} \frac \pi {180}} \cdot \cos(x^\circ)
            \end{align*}
          `}
        </Proposition>
        <Fragment>
          <Mermaid scale={2}>
            {String.raw`
              graph LR
                D(degrés) --"× π/180"--> R(radians)
            `}
          </Mermaid>
          <Definition title="Radian">
            {tex`
                \alpha_{\text{rad}} \defeq \frac \pi {180} \cdot \alpha_{\text{deg}}
              `}
          </Definition>
        </Fragment>
      </Slide>
      <Slide title="Cercle trigonométrique">
        <Geogebra id="yyufnmy9" />
      </Slide>
    </Slideshow>
  );
};
