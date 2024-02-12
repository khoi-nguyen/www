import type paths from '~/images.json'

const meta: Metadata = {
  title: 'Journée internationale des femmes et des filles de science',
  description: '',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta} autoSlide={30 * 1000} hideTitleSlide hideBoards>
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
      <CustomSlide name="Emmy Noether" src="noether.jpg">
        <hgroup>
          <h2>Emmy Noether (1882-1935)</h2>
          <p>Mathématicienne allemande</p>
        </hgroup>
        <p>
          Connue pour ses contributions en mathématiques et en physique mathématique, et en
          particulier pour le <strong>théorème de Noether</strong>, un monument de la physique
          théorique.
        </p>
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
      </CustomSlide>
      <CustomSlide name="Stephanie Kwolek" src="kwolek.jpg">
        <Figure src="kevlar.jpg" alt="kevlar" width={400} />
        <hgroup>
          <h2>Stephanie Kwolek</h2>
          <p>Chimiste américaine</p>
        </hgroup>
        <p>
          Inventrice de la fibre poly-paraphénylène téréphtalamide (PPD-T), mieux connue sous le nom
          commercial de <strong>Kevlar</strong>.
        </p>
        <p>
          Stephanie Kwolek a remporté de nombreux prix pour son travail en chimie des polymères.
        </p>
      </CustomSlide>
      <CustomSlide name="Ingrid Daubechies" src="daubechies.jpg">
        <div class="columns">
          <div class="is-vcentered">
            {tex`
              [W_\psi] f(a, b) \defeq \frac 1 {\sqrt {\abs a}} \int_{-\infty}^{+\infty}
              \overline {\psi\left(\frac {x - b} a\right)} f(x) \dd x
            `}
          </div>
          <div>
            <Figure src="daubeches-wavelets.png" alt="Ondelettes Daubechies" />
          </div>
        </div>
        <h2>Ingrid Daubechies (1954)</h2>
        <ul>
          <li>Mathématicienne et physicienne belge</li>
          <li>
            Connue pour son travail sur les <strong>ondelettes</strong> et en{' '}
            <strong>compression d'image</strong>
          </li>
          <li>
            A donné son nom aux <strong>ondelettes Daubechies</strong>, utilisées dans le standard
            JPEG 2000.
          </li>
          <li>A reçu de nombreux prix</li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Ada Yonath" src="yonath.jpg">
        <h2>עדה יונת (Ada Yonath)</h2>
        <ul>
          <li>Cristallographe et biologiste moléculaire israélienne</li>
          <li>Prix Nobel en Chimie (2009)</li>
          <li>A identifié la structure moléculaire des ribosomes par cristallographie</li>
          <li>
            Ses travaux ont contribué à la création de nouveaux antibiotiques et à une meilleure
            compréhension de leur mode de fonctionnement
          </li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Katherine Johnson" src="johnson.jpg">
        <h2>Katherine Johnson (1918-2020)</h2>
        <ul>
          <li>Mathématicienne et ingénieure américaine</li>
          <li>A contribué à différents programmes aérospatiaux de la NASA tels que Mercury</li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Lisa Tzwu-Fang Su" src="su.jpg">
        <h2>Lisa Tzwu-Fang Su / 蘇姿丰 (1969)</h2>
        <ul>
          <li>Ingénieure et cheffe d'entreprise américaine</li>
          <li>
            A contribué au développement de semi-conducteurs SOI (Silicon On Insulator), ainsi qu'à
            la mise au point de puces semi-conductrices plus efficaces
          </li>
          <li>
            Elle est PDG d'AMD depuis octobre 2014. On la crédite de la renaissance de cette
            entreprise qui fabrique des semi-conducteurs, microprocesseurs et cartes graphiques.
          </li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Dina Katabi" src="katabi.jpg">
        <h2>دينا قَتابي (Dina Katabi, 1970)</h2>
        <ul>
          <li>Informaticienne syrienne/américaine</li>
          <li>Dirige le MIT Wireless Center et le groupe de recherche NETMIT</li>
          <li>
            Connue pour ses travaux dans la transformée de Fourier éparse, les réseaux WiFi et la
            vision à rayons X
          </li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Mae Carol Jemison" src="jemison.jpg">
        <h2>Mae Carol Jemison (1956)</h2>
        <ul>
          <li>Ingénieure, médecin, astronaute américaine</li>
          <li>Spécialiste de mission à bord de la navette spatiale Endeavour</li>
          <li>Promeut la science et la technologie</li>
          <li>
            Utilise sa notoriété pour notamment dénoncer l'écart de qualité des soins de santé entre
            les États-Unis et les pays moins développés.
          </li>
          <li>
            Déclaration de Jemison:{' '}
            <em>Ne soyez jamais limité par l'imagination limitée des autres</em>
          </li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Claudine Hermann" src="hermann.jpg">
        <h2>Claudine Hermann (1945-2021)</h2>
        <ul>
          <li>Physicienne française</li>
          <li>
            Première femme professeure des universités en France à l’École polytechnique en 1992
          </li>
          <li>Spécialiste de la physique des solides</li>
          <li>A apporté une contribution majeure dans le domaine de la physique des particules</li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Vera Rubin" src="rubin.jpg">
        <h2>Vera Rubin (1928-2016)</h2>
        <ul>
          <li>Astronome américaine</li>
          <li>A travaillé sur les vitesses de rotation des éléments en périphérie des galaxies</li>
          <li>
            Elle constate notamment que les étoiles en périphérie de la galaxie d’Andromède ont une
            vitesse de rotation bien plus grande que ce que ne le prévoient les lois de Newton, ce
            qui a permis de démontrer l’existence de matière noire dans les galaxies.
          </li>
          <li>
            Citation de Rubin: <em>Worldwide, half of all brains are in women.</em>
          </li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Daniela Rus" src="rus.jpg">
        <h2>Daniela Rus (1963)</h2>
        <ul>
          <li>Roboticienne roumano-américaine</li>
          <li>Directrice du laboratoire d'informatique et d'intelligence artificielle du MIT</li>
          <li>Connue pour ses travaux sur les robots modulaires auto-reconfigurables</li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Cecilia Payne-Gaposchkin" src="payne.jpg">
        <h2>Cecilia Payne-Gaposchkin (1900-1979)</h2>
        <ul>
          <li>Astronome anglo-américaine</li>
          <li>
            Une des premières à envisager que les étoiles soient composées majoritairement
            d'hydrogène
          </li>
          <li>Se décrivait comme une 'rebelle contre le rôle féminin'</li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Tewhida Ben Sheikh" src="bencheikh.jpg">
        <h2>توحيدة بن الشيخ (Tewhida Ben Sheikh, 1909-2010)</h2>
        <ul>
          <li>
            Première femme musulmane du monde arabe à exercer comme médecin, pédiatre puis
            gynécologue.
          </li>
          <li>
            Elle contribue à la mise en place du planning familial tunisien au travers du service
            qu'elle crée à l'hôpital Charles-Nicolle (à Tunis) en 1963 puis au travers de la
            clinique qu'elle ouvre en 1968.
          </li>
          <li>
            Elle devient directrice du planning familial en 19704, se battant pour le droit à
            l'avortement, légalisé en 1973. Vice-présidente du Croissant-Rouge tunisien.
          </li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Edith Clarke" src="clarke.png">
        <h2>Edith Clarke (1883-1959)</h2>
        <ul>
          <li>Ingénieure américaine</li>
          <li>Connue pour la transformée de Clarke</li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Susan J. Eggers" src="eggers.jpg">
        <h2>Susan Eggers</h2>
        <ul>
          <li>Spécialiste de l'architecture des ordinateurs</li>
          <li>
            Connue pour le développement d'une architecture permettant les calculs en parallèle
          </li>
          <li>Elle reçoit le prix Eckert-Mauchly en 2018</li>
        </ul>
      </CustomSlide>
      <CustomSlide name="Katie Bouman" src="bouman.jpg">
        <Figure src="m87.jpg" alt="M87 Blackhole" height={400} />
        <h2>Katie Boumann (1989-présent)</h2>
        <ul>
          <li>Ingénieure informaticienne américaine</li>
          <li>
            Membre de l’équipe EHT (Event Horizon Telescope), elle a dirigé le développement de
            l’algorithme CHIRP, qui a permis d’analyser les données du EHT ayant fourni la première
            photographie d’un trou noir (M87, 2019)
          </li>
        </ul>
      </CustomSlide>
    </Slideshow>
  )
}

interface CustomSlideProps {
  name: string
  src: (typeof paths)[number]
  children?: JSX.Element | JSX.Element[]
}

function CustomSlide(props: CustomSlideProps) {
  return (
    <Slide title={props.name} columns>
      <div class="is-5">
        <Figure src={props.src} alt={props.name} height={850} />
      </div>
      <div class="is-7 is-vcentered">
        <div>
          {props.children}
          <img
            src="/images/women-in-science-logo.png"
            height={600}
            style={{
              position: 'absolute',
              right: '0px',
              bottom: '0px',
              opacity: '0.5',
              'z-index': -10,
            }}
          />
        </div>
      </div>
    </Slide>
  )
}
