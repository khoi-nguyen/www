import { faAddressCard, faChalkboardUser } from '@fortawesome/free-solid-svg-icons/index.js';

interface PageProps {
  children: JSX.Element;
  meta: Parameters<typeof Meta>[0];
}

export default function Page(props: PageProps) {
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
              <Fa icon={faAddressCard} /> <abbr title="Curriculum Vitæ">CV</abbr>
            </A>
          </li>
          <li>
            <A href="/teaching">
              <Fa icon={faChalkboardUser} /> Teaching
            </A>
          </li>
        </ul>
      </nav>
      <Breadcrumbs />
      <main>
        <Meta {...props.meta} />
        {props.children}
      </main>
    </>
  );
}
