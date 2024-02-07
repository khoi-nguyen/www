const meta: Metadata = {
  title: 'Journée internationale des femmes et des filles de science',
  description: '',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Journée internationale des femmes et des filles en science"></Slide>
      <Slide title="Emmy Noether" columns>
        <div class="is-4">
          <Figure src="noether.jpg" alt="Emmy Noether" width={400}>
            <hgroup>
              <h3>Emmy Noether (1882-1935)</h3>
              <p>Mathématicienne allemande</p>
            </hgroup>
            <p>
              Connue pour ses contributions en mathématiques et en physique mathématique, et en
              particulier pour le <strong>théorème de Noether</strong>, un monument de la physique
              théorique.
            </p>
          </Figure>
        </div>
        <div class="is-8">
          <Theorem title="Noether, 1918" class="example">
            {tex`
              \frac {\dd} {\dd s} \left( L(q_i(s), \dot {q_i} (s), t) \right) = 0
              \implies
              \frac {\dd} {\dd t} \left(
                \frac {\partial L} {\partial \dot q_i}
                \left. \frac {\dd q_i(s)} {\dd s} \right|_{s = 0}
              \right) = 0
            `}
            <p>
              À toute transformation infinitésimale qui laisse invariante l'intégrale d'action
              correspond une grandeur qui se conserve.
            </p>
          </Theorem>
          <Corollary class="theorem" pluralize>
            <ul>
              <li>
                L'invariance par translation dans le temps implique la{' '}
                <strong>conservation de l'énergie</strong>
              </li>
              <li>
                L'invariance par rotation dans l'espace implique la{' '}
                <strong>conservation du moment cinétique</strong>
              </li>
              <li>
                L'invariance par translation dans l'espace implique la{' '}
                <strong>conservation de la quantité de mouvement</strong>
              </li>
            </ul>
          </Corollary>
          <Quote pluralize>
            <ul>
              <li>
                <em>That theorem has been a guiding star to 20th and 21st century physics</em>
              </li>
            </ul>
          </Quote>
        </div>
      </Slide>
      <Slide title="Stephanie Kwolek" columns>
        <div class="is-5">
          <Figure src="kwolek.jpg" alt="Stephanie Kwolek" width={450}>
            <hgroup>
              <h3>Stephanie Kwolek (1923-2014)</h3>
              <p>Chimiste américaine</p>
            </hgroup>
          </Figure>
        </div>
        <div class="is-7 is-vcentered">
          <div>
            <h3>Chimiste américaine</h3>
            <p>
              Inventrice de la fibre poly-paraphénylène téréphtalamide (PPD-T), mieux connue sous le
              nom commercial de <strong>Kevlar</strong>.
            </p>
            <Figure src="kevlar.jpg" alt="kevlar" width={400} />
            <p>
              Stephanie Kwolek a remporté de nombreux prix pour son travail en chimie des polymères.
            </p>
          </div>
        </div>
      </Slide>
    </Slideshow>
  )
}
