import {
  faAddressCard,
  faChalkboardUser,
  faRightFromBracket,
  faScrewdriverWrench,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons/index.js';

interface PageProps {
  children: JSX.Element;
  meta: Parameters<typeof Meta>[0];
  header?: Component<{ children: JSX.Element }>;
}

const header: Component<{ children: JSX.Element }> = (props) => <>{props.children}</>;

export default function Page(props: PageProps) {
  const Wrapper = props.header || header;
  const [admin, { logout }] = useSession();
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
            <A href="/teaching/nyu">
              <Fa icon={faUniversity} /> <Abbr key="NYU" />
            </A>
          </li>
          <li>
            <A href="/teaching/ecam">
              <Fa icon={faScrewdriverWrench} /> <Abbr key="ECAM" />
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
    </>
  );
}
