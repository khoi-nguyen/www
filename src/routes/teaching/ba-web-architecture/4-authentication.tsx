import bcrypt from 'bcryptjs'
import { decodeJwt, jwtVerify } from 'jose'

const meta: Metadata = {
  title: 'Authentification et Autorisation',
  subtitle: 'Chapitre 5',
  lang: 'fr',
  description: 'REST, GraphQL, ORM',
}

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

function Hash() {
  const [string, setString] = createSignal('Bonjour')
  const [hashed, setHashed] = createSignal('')
  createEffect(async () => {
    setHashed(await sha256(string()))
  })
  return (
    <>
      <label>
        Chaîne: <input onInput={(e) => setString(e.target.value)} value={string()} />
      </label>
      <p>
        Hachage:{' '}
        <code>
          <small class="clickable">{hashed()}</small>
        </code>
      </p>
    </>
  )
}

type User = {
  login: string
  password: string
}

interface UserTableProps {
  hash?: boolean
  login?: string
  password?: string
  salt?: boolean
}

const users: User[] = [
  { login: 'tuxie', password: 'hello' },
  { login: 'lily', password: 'snake' },
  { login: 'choco', password: 'hello' },
  { login: 'bacon', password: 'hello' },
  { login: 'emma', password: 'ilovetuxie' },
]

function UserTable(props: UserTableProps) {
  const [convertedUsers, setConvertedUsers] = createStore<User[]>([])
  const convert = async (password: string) => {
    if (!props.hash) {
      return password
    } else if (!props.salt) {
      return await sha256(password)
    } else {
      return bcrypt.hashSync(password, bcrypt.genSaltSync())
    }
  }
  createEffect(async () => {
    const modifiedUsers: User[] = []
    for (const user of users) {
      modifiedUsers.push({ ...user, password: await convert(user.password) })
    }
    setConvertedUsers(modifiedUsers)
  })
  const color = (user: User) => {
    if (props.login === user.login && props.password === user.password) {
      return 'green'
    } else if (props.login === user.login) {
      return 'red'
    }
    return 'none'
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {convertedUsers.map((user) => (
          <tr style={{ background: color(user) }}>
            <td>{user.login}</td>
            <td>
              <code>
                <small>{user.password}</small>
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SaltedHash() {
  const [string, setString] = createSignal('')
  const [salt, setSalt] = createSignal(bcrypt.genSaltSync())
  const [hashed, setHashed] = createSignal('')

  createEffect(() => {
    setHashed(bcrypt.hashSync(string(), salt()))
  })

  return (
    <>
      <label>
        Chaîne: <input value={string()} onInput={(e) => setString(e.target.value)} />
      </label>
      <Button onClick={() => setSalt(bcrypt.genSaltSync())}>Changer le sel</Button>
      <dl>
        <dt>Sel</dt>
        <dd>
          <code>{salt()}</code>
        </dd>
        <dt>Hash</dt>
        <dd>
          <code>{hashed()?.substr(salt().length)}</code>
        </dd>
      </dl>
      <p>On stocke ceci en base de données:</p>
      <code>{hashed()}</code>
    </>
  )
}

function HashedAuth() {
  const [login, setLogin] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [hashed, setHashed] = createSignal('')

  createEffect(async () => {
    setHashed(await sha256(password()))
  })

  return (
    <>
      <p>
        <label>
          Login: <input value={login()} onInput={(e) => setLogin(e.target.value)} />
        </label>{' '}
        <label>
          Password: <input value={password()} onInput={(e) => setPassword(e.target.value)} />
        </label>
      </p>
      <hr />
      <h3>Côté serveur</h3>
      <dl>
        <dt>Login</dt>
        <dd>{login()}</dd>
        <dt>Password</dt>
        <dd>{password()}</dd>
        <dt>Hash</dt>
        <dd>
          <small>{hashed()}</small>
        </dd>
      </dl>
      <UserTable hash={true} login={login()} password={hashed()} />
    </>
  )
}

function CookieTampering() {
  const [level, setLevel] = createSignal(1)
  const [cookie, setCookie] = createSignal('')
  const users = ['lily', 'tuxie', 'bacon', 'admin', 'khoi']
  const value = () => {
    if (level() === 1) {
      return cookie()
    } else if (level() === 2) {
      return users[parseInt(cookie())]
    } else if (level() === 3) {
      return cookie().split('').reverse().join('')
    } else if (level() === 4) {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'
      let answer = ''
      for (const letter of cookie().split('')) {
        answer += alphabet[(alphabet.indexOf(letter) + 10) % 26]
      }
      return answer
    } else if (level() === 5) {
    }
  }
  return (
    <>
      <label>
        Level:
        <input
          type="number"
          min={1}
          max={5}
          value={level()}
          onInput={(e) => setLevel(parseInt(e.target.value))}
        />
      </label>
      <h3>Côté client</h3>
      <label>
        Cookie: <input value={cookie()} onInput={(e) => setCookie(e.target.value)} />
      </label>
      <h3>Page après la réponse du serveur</h3>
      <p>
        Vous êtes connectés en tant que <strong>{value()}</strong>
      </p>
    </>
  )
}

function Base64() {
  const [input, setInput] = createSignal('{"name": "tuxie", "admin": false}')
  const encoded = () => btoa(input())
  return (
    <>
      <label>
        Chaîne:
        <textarea value={input()} onInput={(e) => setInput(e.target.value)} class="mono" />
      </label>
      <pre>
        <code class="clickable">{encoded()}</code>
      </pre>
    </>
  )
}

function Base64Decode() {
  const [input, setInput] = createSignal('')
  const encoded = () => atob(input())
  return (
    <>
      <label>
        Base 64:
        <textarea value={input()} onInput={(e) => setInput(e.target.value)} class="mono" />
      </label>
      <pre>
        <code>{encoded()}</code>
      </pre>
    </>
  )
}

function SignedMessage() {
  const secret = 'tuxie'
  const [message, setMessage] = createSignal('Bonjour, je suis un message signé!')
  const [signature, setSignature] = createSignal('')

  const [correct, setCorrect] = createSignal(false)

  createEffect(async () => {
    const valid = (await sha256(secret + message())) == signature()
    if (valid !== correct()) {
      setCorrect(valid)
    }
  })

  async function sign() {
    setSignature(await sha256(secret + message()))
    setCorrect(true)
  }

  onMount(sign)

  return (
    <>
      <textarea onInput={(e) => setMessage(e.target.value)} placeholder="Message" class="mono">
        {message()}
      </textarea>
      <Button onClick={sign}>Signer le message</Button>
      <textarea onInput={(e) => setMessage(e.target.value)} placeholder="Signature" class="mono">
        {signature()}
      </textarea>
      <Show when={message() && !correct()}>
        <p style={{ color: 'red' }}>Le message et la signature ne sont pas en accord</p>
      </Show>
    </>
  )
}

function JWTSimplified(props: { secret?: string; message?: string }) {
  const secret = props.secret || 'tuxie'
  const [message, setMessage] = createSignal(props.message || '{"login": "tuxie", "admin": true}')
  const [signature, setSignature] = createSignal('')
  const base64 = () => btoa(message())

  async function sign() {
    setSignature(await sha256(secret + message()))
  }

  onMount(sign)
  createEffect(() => {
    if (message()) {
      sign()
    }
  })

  return (
    <>
      <h3>Message</h3>
      <textarea onInput={(e) => setMessage(e.target.value)} class="mono">
        {message()}
      </textarea>
      <h3>Token</h3>
      {tex`
        \underbrace{\text{${base64()}}}_{\text{message encodé en base 64}}
        .
        \underbrace{\text{${signature()}}}_{\text{signature}}
      `}
    </>
  )
}

function CheckJWT(props: { secret?: string }) {
  const secret = props.secret || 'hello'
  const [token, setToken] = createSignal('')
  const [payload, setPayload] = createSignal({})
  const [valid, setValid] = createSignal(false)

  createEffect(async () => {
    try {
      setPayload(decodeJwt(token()))
    } catch {
      setPayload({})
    }
    try {
      const encoder = new TextEncoder()
      await jwtVerify(token(), encoder.encode(secret))
    } catch {
      setValid(false)
    }
  })

  return (
    <>
      <textarea
        onInput={(e) => setToken(e.target.value)}
        value={token()}
        placeholder="Token"
        class="mono"
      />
      <pre>{JSON.stringify(payload())}</pre>
      <Show when={token() && valid()}>
        <p style={{ color: 'green' }}>Signature valide</p>
      </Show>
      <Show when={token() && !valid()}>
        <p style={{ color: 'red' }}>Signature invalide</p>
      </Show>
    </>
  )
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Authentification et autorisation">
        <p>La sécurité de l'information repose sur deux procédés importants</p>
        <dl>
          <dt>Authentification</dt>
          <dd>Vérifie que l'utilisateur·trice est bien qui il/elle prétend être</dd>
          <dt>Autorisation</dt>
          <dd>A-t-il/elle le droit d'effectuer cette opération?</dd>
        </dl>
        <p>Nous nous focaliserons principalement sur l'authentification.</p>
      </Slide>
      <Slide title="Enjeux">
        <Question pluralize>
          <ul>
            <li>Comment s'assurer que l'envoi du mot de passe au serveur soit confidentiel?</li>
            <li>
              Comment peut-on assurer que si la base de données est compromise, les mots de passe ne
              le sont pas?
            </li>
            <li>
              Comment s'assurer que la session puisse être maintenue avec un cookie qui ne soit pas
              falsifiable par l'utilisateur?
            </li>
            <li>
              Comment fonctionnent le <Abbr key="SSO" /> où le login via un parti tiers (Google,
              Instagram)?
            </li>
          </ul>
        </Question>
      </Slide>
      <Slide title={() => <Abbr key="HTTPS" />}>
        <Question>
          <p>Comment s'assurer que l'envoi du mot de passe au serveur soit confidentiel?</p>
        </Question>
        <Fragment>
          <p>
            Réponse: par l'emploi de l'
            <Abbr key="HTTPS" />.
          </p>
          {mermaid`
            sequenceDiagram
              participant client as Client
              participant server as Serveur
              client --> server: Établissement d'une communication sécurisée
              client ->> server: Login
              server ->> client: Cookie de session
          `}
        </Fragment>
      </Slide>
      <Slide title="Le problème du stockage">
        <Question>
          <p>
            Comment s'assurer que les mots de passe ne soient pas compromis en cas de piratage de
            votre base de données?
          </p>
        </Question>
      </Slide>
      <Slide title="Hachage">
        <Example title="Algorithme de hachage sha256">
          <Hash />
        </Example>
        <Question>
          <p>Quelles sont d'après vous les propriétés du hashage?</p>
        </Question>
      </Slide>
      <Slide title="Authentification avec hachage">
        <HashedAuth />
      </Slide>
      <Slide title="Collisions">
        <p>
          Étant donné que les hachages sont tous de mêmes longueur, il existe un nombre fini de
          possibilités.
        </p>
        <Example title="SHA-256">
          <p>
            Pour l'algorithmes sha-256, il y a {tex`2^{256} = 16^{64}`} possibilités différentes.
          </p>
        </Example>
        {py.jupyter`
          import decimal
          '%.2E' % decimal.Decimal(16**64)
        `}
        <Definition>
          <p>
            On a une <strong>collision</strong> lorsque deux chaînes ont le même hachage.
          </p>
        </Definition>
        <Question>
          <p>Est-il facile de trouver une collision?</p>
        </Question>
      </Slide>
      <Slide title="Vol de base de données">
        <p>Supposons que quelqu'un ait réussi à obtenir à la base de données et voit ceci:</p>
        <UserTable hash={true} />
        <Question>
          <p>Que remarquez-vous?</p>
        </Question>
      </Slide>
      <Slide title="Rainbow tables">
        <Definition>
          <p>Table précalculée avec contenant le hachage d'un grand nombre de mot de passe.</p>
        </Definition>
        <Question>
          <p>Comment se défendre d'une telle attaque?</p>
        </Question>
      </Slide>
      <Slide title="Salage">
        <Definition>
          <p>
            Saler un mot de passe, c'est le{' '}
            <strong>préfixer/suffixer par une chaine aléatoire</strong> avant de le hasher.
          </p>
        </Definition>
        {tex`
          \text{password}
          \to \text{{\color {red} salt}password}
          \to \text{604498788992b}\dots
        `}
        <Example title="Bcrypt">
          <SaltedHash />
        </Example>
      </Slide>
      <Slide title="Authentification avec salage">
        <h3>Sans salage</h3>
        <UserTable hash={true} salt={false} />
        <h3>Avec salage</h3>
        <UserTable hash={true} salt={true} />
      </Slide>
      <Slide title="Exemple: Bcrypt">
        <h3>Hacher un mot de passe</h3>
        {js.jupyter`
          import bcrypt from 'bcryptjs'
          const salt = bcrypt.genSaltSync(10)
          const hash = bcrypt.hashSync('hello', salt)
          alert(salt + ', ' + hash)
        `}
        <h3>Vérifier un mot de passe</h3>
        {js.jupyter`
          import bcrypt from 'bcryptjs'
          const hashed = '$2a$10$bbKbGSuWgXdYYDsdW8jSgOxTMf/pHJx0UecGN2mKn6PMgXif3diKu'
          if (bcrypt.compareSync('hello', hashed)) {
            alert('Hello')
          } else {
            alert('The password is incorrect')
          }
        `}
      </Slide>
      <Slide title="Authentification avec hachage salé">
        <h3>Enregistrement</h3>
        <ol>
          <li>L'utilisateur envoie son login et mot de passe</li>
          <li>Le serveur génère un sel aléatoire</li>
          <li>
            Le serveur stocke login en clair, mais hache le mot de passe avec le sel. Il s'assure
            que le sel est également stocké avec le hachage.
          </li>
        </ol>
        <h3>Identification</h3>
        <ol>
          <li>L'utilisateur envoie son login et mot de passe</li>
          <li>
            Le serveur trouve le login et le sel associé dans la base de données. S'il n'y a pas
            d'utilisateur, l'authentification échoue.
          </li>
          <li>
            Le serveur hache le mot de passe avec le sel donné et compare au résultat stocké en base
            de données. L'authentification réussit si les mots de passe hachés sont les mêmes, et
            échoue sinon.
          </li>
        </ol>
      </Slide>
      <Slide title="Session et cookies">
        <p>
          Lorsque l'authentification est réussie, il faut <strong>créer un cookie</strong>. Ceci
          permet à l'utilisateur de ne pas devoir répéter l'authentification à chaque page.
        </p>
        {mermaid`
          sequenceDiagram
            participant browser as Navigateur
            participant server as Serveur
            Note over browser, server: Authentification
            browser ->> server: POST /login
            server ->> server: Vérification dans la base des données et génération d'un cookie
            server ->> browser: Set-Cookie: session=token;
            Note over browser, server: Plus tard...
            browser ->> server: Requête + Cookie
            server ->> server: Utilisation du cookie pour identifier l'utilisateur
        `}
        <Remark>
          <p>
            Le 'token' joue le même rôle que l'identification! Il doit être tout aussi sécurisé.
          </p>
        </Remark>
      </Slide>
      <Slide
        title={() => (
          <>
            <Abbr key="JSON" /> et encodage en base 64
          </>
        )}
      >
        <p>
          Le cookie de session joue le rôle de carte d'identité pour l'utilisateur. Cependant, on ne
          peut stocker généralement qu'une chaîne de caractères, et les caractères tolérés sont
          limités. Que faire?
        </p>
        <p>
          Réponse: on encode du <Abbr key="JSON" /> en base 64.
        </p>
        <Base64 />
        <Base64Decode />
      </Slide>
      <Slide title="Cookies: sécurité">
        <h3>Vol de cookies</h3>
        <p>
          Les cookies sont des petits fichiers texte présents sur l'ordinateur ou smartphone du
          client. Obtenir le contenu de ce fichier d'une autre personne vous permettrait d'être
          connecté en tant que cette personne. D'un point de vue de sécurité, le cookie de session
          est un des points faibles de l'authentification.
        </p>
        <p>
          <strong>Note à moi-même: démo</strong>
        </p>
        <h3>Falsification de cookies (MITM)</h3>
        <p>On peut changer les cookies manuellement (Developer Tools, Application, Cookies)</p>
      </Slide>
      <Slide title="Cookie tampering">
        <Exercise>
          <p>Essayez de vous connecter en tant que 'admin' dans les situations suivantes</p>
        </Exercise>
        <CookieTampering />
      </Slide>
      <Slide title="Signature en cryptographie">
        <p>
          L'information stockée dans le cookie est traditionnellement <strong>signée</strong> avec
          une clé secrète.
        </p>
        <SignedMessage />
        <hr />
        <p>Dans cet exemple, la signature est créée avec la formule suivante</p>
        {tex`
          \text{signature} = \text{hash}(\text{secretkey} + \text{message})
        `}
        <Exercise>
          <p>
            Pouvez-vous trouvez la clé secrète? Utilisez l'outil suivant pour hacher vos messages.
          </p>
          <Hash />
        </Exercise>
      </Slide>
      <Slide title="Authentification avec cookie signé">
        {mermaid`
          sequenceDiagram
            participant browser as Navigateur
            participant server as Serveur
            Note over browser, server: Authentification
            browser ->> server: POST /login
            server ->> browser: Set-Cookie: session=<signedToken>;
            Note over browser, server: Requêtes suivantes
            browser ->> server: Requête + Cookie: session=<signedToken>;
            server ->> server: Vérification du token et de la signature
        `}
      </Slide>
      <Slide title="Cookies signés">
        <p>
          Une signature permet de s'assurer que le cookie n'a pas été modifié par l'utilisateur.
        </p>
        <JWTSimplified />
      </Slide>
      <Slide title={() => <Abbr key="JWT" />}>
        <Definition>
          <p>
            <Abbr key="JWT" /> est un standard pour les token d'authentification:
          </p>
          {tex`
            \text{header}
            .\text{payload}
            .\text{signature}
          `}
        </Definition>
        <dl>
          <dt>Header</dt>
          <dd>
            Contient l'algorithme utilisé pour la signature. Encodé en JSON et transformé en base
            64.
          </dd>
          <dt>Payload</dt>
          <dd>
            Information sur l'utilisateur (e.g. admin?, nom d'utilisateur, etc.). Encodé en{' '}
            <Abbr key="JSON" /> et transformé en base 64.
          </dd>
          <dt>Signature</dt>
          <dd>
            Signature cryptographique qui assure que le payload n'a pas été modifié par une tierce
            partie.
          </dd>
        </dl>
      </Slide>
      <Slide
        title={() => (
          <>
            Création de tokens <Abbr key="JWT" />
          </>
        )}
        split={false}
      >
        <Iframe src="https://jwt.io/" />
      </Slide>
      <Slide title="Tuxie the hacker">
        <Exercise>
          <p>
            Tuxie remarque que son <Abbr key="JWT" /> est
          </p>
          <code class="clickable">
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVHV4aWUiLCJhZG1pbiI6ZmFsc2V9.FNdiFYdPWjxNFUxi-DHPRuuc4JppYFSNfQrIGW_PkDo
          </code>
          <p>
            Quel serait son <Abbr key="JWT" /> s'il souhaite devenir admin?
          </p>
        </Exercise>
        <p>Indication: la clé secrète est une salutation dans une langue étrangère</p>
        <CheckJWT />
        <p>TODO: FIX</p>
      </Slide>
      <Slide title={() => <Abbr key="SSO" />}>
        <Definition>
          <p>
            Méthode permettant à un utilisateur d'accéder à plusieurs applications avec un seul
            login.
          </p>
        </Definition>
        <Question>
          <p>Comment cela fonctionne-t-il?</p>
        </Question>
      </Slide>
      <Slide
        title={() => (
          <>
            <Abbr key="SSO" />: diagramme de séquence
          </>
        )}
      >
        {mermaid`
          sequenceDiagram
            actor user as Utilisateur
            participant auth as Serveur d'authentification
            participant app as Application
            user ->> app: Tentative d'accès
            app ->> user: Nécéssité d'authentification, redirection
            user ->> auth: Log in
            auth ->> user: <JWT>
            user ->> app: Tentative d'accès avec <JWT>
            app ->> auth: Qui est <JWT> ? Est-ce un token valide ?
            auth ->> app: Informations sur l'utilisateur
            app ->> user: Réponse
        `}
        <Remark>
          <p>
            Ceci n'est qu'une implémentation possible du <Abbr key="SSO" />
          </p>
        </Remark>
      </Slide>
      <Slide title="OAuth">
        <Question>
          <p>Qu'est-ce que OAuth?</p>
        </Question>
        <p>
          Protocole libre permettant à un site web d'accéder à des données relatives à un
          utilisateur ou d'utiliser l'
          <Abbr key="API" /> d'un site fournisseur sans devoir lui communiquer le mot de passe.
        </p>
        <Example pluralize>
          <ul>
            <li>Permettre à un site d'accéder à vos photos Facebook/Google photos</li>
            <li>Agrégateur de réseax sociaux</li>
            <li>Authentification!</li>
          </ul>
        </Example>
      </Slide>
      <Slide title="OAuth">
        <Figure src="oauth.webp" alt="Fonctionnement de OAuth" />
      </Slide>
      <Slide title="OAuth: acteurs">
        <dl>
          <dt>Identity Provider</dt>
          <dd>
            Fournisseur qui possède des informations sur un utilisateur (e.g. Facebook, Instagram,
            Gmail)
          </dd>
          <dt>Utilisateur</dt>
          <dd>Vous</dd>
          <dt>Serveur tiers</dt>
          <dd>Site qui souhaite avoir accès à vos données</dd>
        </dl>
      </Slide>
      <Slide title="OAuth: diagramme de séquence">
        {mermaid`
          sequenceDiagram
            actor user as Utilisateur
            participant app as Application
            participant idp as Identity Provider
            user ->> app: Requête
            Note over user, idp: Obtention d'un code d'autorisation
            app ->> user: Redirection
            user ->> idp: Login + consentement
            idp ->> user: Code d'autorisation pour l'application
            user ->> app: Envoi du code d'autorisation
            Note over user, idp: Échange code d'autorisation/token
            app ->> idp: Code d'autorisation
            idp ->> app: Token: <JWT>
            Note over user, idp: Obtention des données
            app ->> idp: Requête d'information sur <JWT>
            idp ->> app: Informations sur l'utilisateur
            app ->> user: Réponse
        `}
      </Slide>
    </Slideshow>
  )
}
