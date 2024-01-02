import meta from './8-exponentials.json'

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Multiplication répétée">
        <Question>
          <ul>
            <li>Que signifie {tex`3^4`}?</li>
            <li>Que signifie {tex`3^{-1}`}?</li>
            <li>Que signifie {tex`3^{0}`}?</li>
            <li>Que signifie {tex`3^{\pi}`}?</li>
            <li>Que signifie {tex`e^{i \pi}`}?</li>
            <li>Que signifie {tex`i^i`}?</li>
          </ul>
        </Question>
      </Slide>
      <Slide title="Règles des puissances: version 1">
        <p>Sur {tex`\N_0`}, l'exponentiation est simplement une multiplication répétée.</p>
        <Proposition>
          <p>Soient {tex`m, n \in \N`} deux nombres naturels non-nuls.</p>
          {tex`
            \begin{align*}
              a^m a^n &= a^{m + n}\\
              (a^m)^n &= a^{m n}\\
              \frac {a^m} {a^n} &= a^{m - n}, \quad (m > n)\\
            \end{align*}
          `}
        </Proposition>
      </Slide>
      <Slide title="Extension de l'exponentiation">
        <p>On veut étendre l'exponentiation de manière a garder les règles du slide précédent.</p>
        <Question>
          <ul>
            <li>Extension à {tex`\Z`}</li>
            <li>Extension à {tex`\mathbb Q`}</li>
            <li>Extension à {tex`\R`}</li>
            <li>Extension à {tex`\C`}</li>
          </ul>
        </Question>
        <Remark>
          <p>
            En secondaire, on vous définit {tex`\R`} comme l'ensemble des rationnels et
            irrationnels, et l'ensemble des irrationnels comme les réels moins les rationnels.
            Personnellement, je ne vois pas comment vous avez toléré ça.
          </p>
        </Remark>
        <p>À la fin de notre processus d'extension, on retrouve la ... trigonométrie.</p>
      </Slide>
      <Slide title="Règles des puissances: version 2">
        <Proposition>
          <p>
            Soient {tex`x, y \in \R`} et {tex`a > 0`}.
          </p>
          {tex`
            \begin{align*}
              a^x a^y &= a^{x + y}\\
              (a^x)^y &= a^{x y}\\
              \frac {a^x} {a^y} &= a^{x - y}\\
              a^0 &= 1\\
              a^{-1} &= \frac 1 a\\
              a^{\frac 1 n} &= \sqrt[n] a
            \end{align*}
          `}
        </Proposition>
        <Question>
          <p>Que vaut {tex`0^0`}?</p>
        </Question>
      </Slide>
      <Slide title="Graphe des exponentielles">
        <Geogebra id="KbKwjbPZ" />
        <Question>
          <p>Quelles sont les propriétés des exponentielles?</p>
        </Question>
      </Slide>
      <Slide title="Le nombre d'Euler">
        <Proposition>
          {tex`
            (a^x)'
            = \left(\lim_{h \to 0} \frac {a^h - 1} {h}\right)  a^x
          `}
        </Proposition>
        <Definition title="Nombre d'Euler">
          <p>Il existe un unique nombre réel noté {tex`e`} tel que</p>
          {tex`
            \lim_{h \to 0} \frac {e^h - 1} h = 1.
          `}
        </Definition>
      </Slide>
      <Slide title="Définition de l'exponentielle">
        <p>En mathématiques modernes, l'exponentielle est définie comme ceci:</p>
        {tex`
          e^x \defeq 1 + x + \frac {x^2} 2 + \frac {x^3} {1 \cdot 2 \cdot 3} + \frac {x^4} {1 \cdot 2 \cdot 3 \cdot 4} + \dots
        `}
        <Exercise>
          <p>Dériver le membre de droite. Que se passe-t-il?</p>
        </Exercise>
        <Remark>
          <p>Le membre de droite est calculable par un ordinateur et a un sens sur les complexes</p>
        </Remark>
        <Jupyter>
          {py.raw`
            from math import factorial

            # Calcule une valeur approchée de e^x
            x = 1
            sum([ x**n / factorial(n) for n in range(100) ])
          `}
        </Jupyter>
      </Slide>
      <Slide title="Retour de la formule d'Euler">
        {tex`
          \begin{align*}
            e^x &\defeq 1 + x + \frac {x^2} 2 + \frac {x^3} {3!} + \frac {x^4} {4!} + \dots\\
            \sin x &\defeq x - \frac{x^3} {3!} + \frac {x^5} {5!} - \frac {x^7} {7!} \dots\\
            \cos x &\defeq 1 - \frac {x^2} 2 + \frac {x^4} {4!} - \frac {x^6} {6!} \dots
          \end{align*}
        `}
        <Remark>
          <p>Les formules trigonométriques ci-dessus ne sont valables que en radians.</p>
        </Remark>
        <Theorem title="Formule d'Euler">
          {tex`
            e^{i x} = \cos x + i\sin x
          `}
        </Theorem>
      </Slide>
      <Slide title="Vers le logarithme">
        <p>
          Nous cherchons une fonction qui décrit l'<strong>ordre de grandeur</strong> d'un nombre:
        </p>
        <ol>
          <li>{tex`f(1) = 0`}</li>
          <li>{tex`f(10) = 1`}</li>
          <li>{tex`f(100) = 2`}</li>
          <li>{tex`f(0.1) = -1`}</li>
          <li>{tex`f(0.01) = -2`}</li>
        </ol>
        <p>
          En d'autres termes, on aimerait avoir {tex`f(10^p) = p`}. En généralisant, on remarque
          qu'on veut la fonction réciproque de {tex`x \mapsto 10^x`}.
        </p>
      </Slide>
      <Slide title="Applications: équations différentielles">
        {tex`
          y = e^{\lambda x}
          \implies \frac {\dd^n y} {\dd x^n} = \lambda^n e^{\lambda x}
        `}
        <Proposition>
          <p>L'équation différentielle</p>
          {tex`
            a y'' + b y ' + c y = 0
          `}
          <p>a pour solution {tex`y = e^{\lambda x}`} si et seulement si</p>
          {tex`
            a \lambda^2 + b \lambda + c = 0.
          `}
        </Proposition>
        <Example>
          <p>Résoudre</p>
          <ul>
            <li>{tex`y'' -5y' + 6y = 0`}</li>
            <li>{tex`y'' + 1 = 0`}</li>
          </ul>
        </Example>
      </Slide>
      <Slide title="Graphes des logarithmes">
        <Geogebra id="P5Rm88qB" />
      </Slide>
      <Slide title="Logarithmes">
        <Definition title="Logarithmes">
          <p>
            Soit {tex`a > 0`}. On définit la fonction {tex`\log_a x`} telle que
          </p>
          {tex`
            \log_a a^x = x.
          `}
        </Definition>
        <Proposition title="Logarithmes">
          {tex`
            \begin{align*}
              \log_a xy &= \log_a x + \log_a y\\
              \log_a \frac x y &= \log_a x - \log_a y\\
              \log_a x^y &= y \log_a b\\
              \log_a x &= \frac {\log_b x} {\log_b a}
            \end{align*}
          `}
        </Proposition>
      </Slide>
      <Slide title="One base to rule them all">
        <p>
          Les fonctions exponentielles et logarithmes sont les mêmes à une transformation graphique
          près.
        </p>
        <Proposition>
          <p>
            Pour {tex`a, b > 0`} et différents de {tex`1`} il existe {tex`k \in \R`}
          </p>
          {tex`
            \begin{align*}
              a^x &= b^{kx}\\
              \log_a x &= \frac 1 k \log_b x
            \end{align*}
          `}
        </Proposition>
      </Slide>
      <Slide title="Différentiation">
        <Proposition>
          {tex`
            \begin{align*}
              (a^x)' &= (\ln a) a^x\\
              (\log_a x)' &= \frac 1 {x \ln a}.
            \end{align*}
          `}
        </Proposition>
        <Remark>
          <p>Quand {tex`a = e`}, on obtient</p>
          {tex`
            \begin{align*}
              (e^x)' &=  a^x\\
              (\log_a x)' &= \frac 1 {x}.
            \end{align*}
          `}
        </Remark>
      </Slide>
      <Slide title="Questions d'examen sur les exponentielles">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Exponentials-and-Logarithms-1/Edexcel-Set-B/Exponential%20Equations.pdf" />
      </Slide>
      <Slide title="Questions d'examen sur les logarithmes">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Exponentials-and-Logarithms-1/Edexcel-Set-B/Laws%20of%20Logarithms.pdf" />
      </Slide>
    </Slideshow>
  )
}
