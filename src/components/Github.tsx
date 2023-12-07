async function fetchCode(repo: string, path: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`);
  const json = await res.json();
  return atob(json.content);
}

interface GithubProps {
  lang: string;
  repo: string;
  path: string;
}

export default function Github(props: GithubProps) {
  const [code] = createResource([props.repo, props.path], (args: [string, string]) =>
    fetchCode(...args),
  );
  return (
    <>
      <Editor lang={props.lang}>{code()}</Editor>
    </>
  );
}
