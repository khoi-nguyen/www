import {
  faGithub,
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsNc,
  faCreativeCommonsNd,
} from '@fortawesome/free-brands-svg-icons'
import {
  faAddressCard,
  faChalkboardTeacher,
  faEnvelope,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons/index.js'

interface PageProps {
  children: JSX.Element
  meta: Parameters<typeof Meta>[0]
  header?: Component<{ children: JSX.Element }>
  hideFooter?: boolean
}

const header: Component<{ children: JSX.Element }> = (props) => <>{props.children}</>

export default function Page(props: PageProps) {
  const Wrapper = props.header || header
  const [admin, { logout }] = useSession()
  const location = useLocation()
  const path = () => location.pathname + (location.pathname.endsWith('/') ? 'index' : '') + '.tsx'
  return (
    <>
      <nav id="navbar">
        <ul>
          <li>
            <strong>
              <A href="/">Khôi Nguyễn</A>
            </strong>
          </li>
          <li>
            <A href="/cv">
              <Fa icon={faAddressCard} /> <Abbr key="CV" />
            </A>
          </li>
          <li>
            <A href="/contact">
              <Fa icon={faEnvelope} /> Contact
            </A>
          </li>
          <li>
            <A href="/teaching/">
              <Fa icon={faChalkboardTeacher} /> Teaching
            </A>
          </li>
          <Show when={admin()}>
            <li>
              <A href="#" onclick={logout}>
                <Fa icon={faRightFromBracket} /> Log out
              </A>
            </li>
          </Show>
        </ul>
      </nav>
      <Breadcrumbs />
      <main>
        <Show
          when={admin() || !props.meta.adminOnly}
          fallback={
            <p>
              You need to <A href="/login">log in</A>.
            </p>
          }
        >
          <Wrapper>
            <Meta {...props.meta} />
          </Wrapper>
          {props.children}
        </Show>
      </main>
      <Show when={!props.hideFooter}>
        <footer class="has-text-centered">
          <p>
            <Fa icon={faCreativeCommons} /> <Fa icon={faCreativeCommonsBy} />{' '}
            <Fa icon={faCreativeCommonsNc} /> <Fa icon={faCreativeCommonsNd} /> Khôi Nguyễn, 2023 —{' '}
            <Fa icon={faGithub} />{' '}
            <a href={`https://github.com/khoi-nguyen/www/tree/master/src/routes${path()}`}>
              Source code
            </a>
            .
          </p>
        </footer>
      </Show>
    </>
  )
}
