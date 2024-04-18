const meta: Metadata = {
  title: 'Examen',
  description: '',
  lang: 'fr',
}

export default () => {
  return (
    <Page meta={meta}>
      <p>Cette liste sera définitive le jour du dernier cours théorique.</p>
      <h2>Architecture de composants</h2>
      <ul>
        <li>
          Pourquoi est-il difficile pour les développeurs de gérer les mutations du{' '}
          <Abbr key="DOM" /> (sans framework)?
        </li>
        <li>Quels sont les avantages à employer un framework JavaScript?</li>
        <li>
          Qu'entend-on par <strong>syntaxe déclarative</strong>?
        </li>
        <li>
          Dans <em>[situation donnée]</em>, cite les variables d'état nécéssaires pour
          l'implémentation
        </li>
      </ul>
      <h2>
        <Abbr key="HTTP" />, <Abbr key="MPA" />, <Abbr key="SPA" />, <Abbr key="SSR" />
      </h2>
      <ul>
        <li>
          Comment fonctionne l'
          <Abbr key="HTTPS" />? Utilise un diagramme de séquence pour illustrer ta réponse.
        </li>
        <li>
          Qu'est-ce qu'un cookie HTTP? Pourquoi sont-ils nécéssaires? Illustre avec un diagramme de
          séquence leur fonctionnement.
        </li>
        <li>
          Que veut-on dire lorsque l'on dit que le protocole <Abbr key="HTTP" /> est{' '}
          <em>stateless</em>? Comment peut-on mitiger cela avec les cookies?
        </li>
        <li>Avec un diagramme de séquence, illustre le fonctionnement d'un site statique.</li>
        <li>
          Avec un diagramme de séquence, illustre le fonctionnement d'une <Abbr key="MPA" />.
        </li>
        <li>
          Avec un diagramme de séquence, illustre le fonctionnement d'une <Abbr key="SPA" />.
        </li>
        <li>
          Quels sont les avantages et les inconvénients d'une <Abbr key="SPA" />? Contrastez par
          rapport aux <Abbr key="MPA" />
        </li>
        <li>
          Qu'entend-on par <Abbr key="CSR" />?
        </li>
        <li>
          Qu'est-ce que le <Abbr key="SSR" />? Comment permet-il à une <Abbr key="SPA" />{' '}
          d'également obtenir un site accessible, indexable par les moteurs de recherches.
        </li>
        <li>
          Comment les sites modernes combinent le rendu côté client et côté serveur pour améliorer
          l'expérience utilisateur?
        </li>
        <li>
          En TP, nous avons travaillé avec SvelteKit. Quel est son but, et quelle relation a-t-il
          par rapport à Svelte?
        </li>
      </ul>
      <h2>
        Backend et <Abbr key="API" />
      </h2>
      <ul>
        <li>
          Qu'est-ce qu'une <Abbr key="API" /> (backend dans le cadre du web)?
        </li>
        <li>
          Quels sont les avantages à séparer l'
          <Abbr key="API" /> du rendu?
        </li>
        <li>Quels sont les avantages à employer le JavaScript côté serveur?</li>
        <li>
          Qu'est-ce que <Abbr key="REST" />? Quels sont ses avantages et inconvénients?
        </li>
        <li>Qu'est-ce que GraphQL? Quels sont ses avantages et inconvénients?</li>
        <li>
          Qu'est-ce qu'un <Abbr key="ORM" />? Quels sont les avantages à en employer un?
        </li>
      </ul>
      <h2>Authentification</h2>
      <ul>
        <li>
          Quelles sont les bonnes pratiques pour stocker des mots de passes dans une base de
          données?
        </li>
        <li>
          Pourquoi est-il plus prudent de saler un hachage? Quel type d'attaques permet-on de
          mitiger?
        </li>
        <li>Comment fonctionne en pratique l'authentification avec hachage salé?</li>
        <li>Qu'est-ce que le vol de cookie?</li>
        <li>
          Pourquoi est-il important qu'un serveur <strong>signe</strong> un cookie? Comment peut-on
          faire ça en pratique?
        </li>
        <li>
          Qu'est-ce que le <Abbr key="JWT" />
        </li>
        <li>
          Donne un exemple via un diagramme de séquence du fonctionnement d'un <Abbr key="SSO" />.
        </li>
        <li>Qu'est-ce qu'OAuth? Comment fonctionne-t-il? (Diagramme de séquence)</li>
        <li>Pourquoi OAuth nécéssite un code d'autorisation en plus d'un token?</li>
      </ul>
      <h2>Authentification</h2>
      <ul>
        <li>
          Pourquoi employer le TypeScript si celui si sera tout de même reconverti en JavaScript
          plus tard?
        </li>
        <li>Pourquoi les tests unitaires sont utiles?</li>
        <li>Quelle est la différence entre les tests unitaires, d'intégration et end-to-end?</li>
      </ul>
    </Page>
  )
}
