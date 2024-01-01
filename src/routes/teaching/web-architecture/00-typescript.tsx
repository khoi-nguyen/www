import meta from './00-typescript.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="TypeScript" columns>
        <Iframe src="https://typescriptlang.org" />
        <ul>
          <li>First release: 2012</li>
          <li>
            Developed by <a href="https://microsoft.com">Microsoft</a>
          </li>
          <li>
            Superset of JavaScript that adds <strong>type annotations</strong>
          </li>
          <li>
            Filename extensions: <code>.ts</code>, <code>.tsx</code>
          </li>
        </ul>
      </Slide>
      <Slide title="TypeScript">
        {ts`
          type Penguin = {
            name: string;
            age: number;
            tie: boolean;
          }

          const tuxie: Penguin = {
            name: 'Tuxie',
            age: 8,
            tie: true,
          }
        `}
      </Slide>
    </Slideshow>
  );
};
