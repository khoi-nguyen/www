import {
  faAddressCard,
  faList,
  faChalkboardUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons/index.js';

interface PageProps {
  children: JSX.Element;
  meta: Parameters<typeof Meta>[0];
}

export default function Page(props: PageProps) {
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
            <A href="/cv">
              <Fa icon={faAddressCard} /> <Abbr key="CV" />
            </A>
          </li>
          <li>
            <A href="/teaching">
              <Fa icon={faChalkboardUser} /> Teaching
            </A>
          </li>
          <Show when={admin()}>
            <li>
              <A href="/todo">
                <Fa icon={faList} /> Todo
              </A>
            </li>
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
          <Meta {...props.meta} />
          {props.children}
        </Show>
      </main>
    </>
  );
}
