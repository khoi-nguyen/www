const meta: Metadata = {
  title: 'Journée internationale des femmes et des filles de science',
  description: '',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta} hideTitleSlide hideBoards>
      <Slide title="Journée internationale des femmes et des filles en science" columns>
        <div>
          <p>
            Le <strong>11 février</strong> est une <strong>journée internationale</strong> dont le
            but est d'accroître la participation des femmes et des filles dans les domaines
            scientifiques.
          </p>
          <Figure src="women-in-stem.avif" alt="Women in sciences" width={850} />
        </div>
        <div>
          <Figure src="women-in-stem.png" alt="Women in Sciences by degree level">
            <p>Proportion des femmes dans les domaines STEM par niveau de diplôme.</p>
          </Figure>
          <h4>Cette semaine à l'ECAM</h4>
          <p>
            Pour célébrer cette semaine, nous avons décider de mettre en avant certaines femmes qui
            ont changé l'histoire des sciences et technologies.
          </p>
        </div>
      </Slide>
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
      <Slide title="Ingrid Daubechies" columns>
        <div class="is-5">
          <Figure src="daubechies.jpg" alt="Ingrid Daubechies" height={900} />
        </div>
        <div class="is-7 is-vcentered">
          <div>
            <h2>Ingrid Daubechies (1954)</h2>
            {tex`
            [W_\psi] f(a, b) \defeq \frac 1 {\sqrt {\abs a}} \int_{-\infty}^{+\infty}
            \overline {\psi\left(\frac {x - b} a\right)} f(x) \dd x
          `}
            <ul>
              <li>Mathématicienne et physicienne belge</li>
              <li>
                Connue pour son travail sur les <strong>ondelettes</strong> et en{' '}
                <strong>compression d'image</strong>
              </li>
              <li>
                A donné son nom aux <strong>ondelettes Daubechies</strong>, utilisées dans le
                standard JPEG 2000.
              </li>
              <li>A reçu de nombreux prix</li>
            </ul>
            <Figure src="daubeches-wavelets.png" alt="Ondelettes Daubechies" />
          </div>
        </div>
      </Slide>
      <Slide title="Ada Yonath" columns>
        <div class="is-5">
          <Figure src="yonath.jpg" alt="Ada Yonath" />
        </div>
        <div class="is-7 is-vcentered">
          <div>
            <h2>עדה יונת (Ada Yonath)</h2>
            <ul>
              <li>Cristallographe et biologiste moléculaire israélienne</li>
              <li>Prix Nobel en Chimie (2009)</li>
              <li>A identifié la structure moléculaire des ribosomes par cristallographie</li>
              <li>
                Ses travaux ont contribué àla création de nouveaux antibiotiques et à une meilleure
                compréhension de leur mode de fonctionnement
              </li>
            </ul>
          </div>
        </div>
      </Slide>
      <Slide title="Katherine Johnson">
        <div class="is-5">
          <Figure src="johnson.jpg" alt="Katherine Johnson" />
        </div>
        <div class="is-7 is-vcentered">
          <h1>Katherine Johnson (1918-2020)</h1>
          <ul>
            <li>Mathématicienne et ingénieure américaine</li>
            <li>A contribué à différents programmes aérospatiaux de la NASA</li>
          </ul>
        </div>
      </Slide>
    </Slideshow>
  )
}
