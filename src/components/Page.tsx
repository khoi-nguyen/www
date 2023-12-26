import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faAddressCard,
  faChalkboardTeacher,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons/index.js';

interface PageProps {
  children: JSX.Element;
  meta: Parameters<typeof Meta>[0];
  header?: Component<{ children: JSX.Element }>;
  hideFooter?: boolean;
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
            <A href="/cv/">
              <Fa icon={faAddressCard} /> <Abbr key="CV" />
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
            <img
              src="https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg"
              alt="CC BY-NC-ND"
            />{' '}
            Khôi Nguyễn, 2023 — <Fa icon={faGithub} />{' '}
            <a href="https://github.com/khoi-nguyen/www/">Source code</a>.
          </p>
        </footer>
      </Show>
    </>
  );
}
