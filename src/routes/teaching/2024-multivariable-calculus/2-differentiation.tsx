import meta from './2-differentiation.json';

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
          Ce résultat n'est absolument pas évident: les dérivées partielles ne décrivent le
          comportement de la fonction que dans les directions parallèles aux axes.
        </p>
      </Remark>
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
  </Slideshow>
);
