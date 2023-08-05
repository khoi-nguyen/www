import { cloneDeep } from 'lodash-es';
import 'reveal.js/dist/reveal.css';
import { createMemo } from 'solid-js';
import { createServerAction$, createServerData$ } from 'solid-start/server';
import type { Stroke } from '~/lib/Whiteboard';
import { loadBoard, writeBoard } from '~/lib/server/boards';

interface SlideshowProps {
  children: JSX.Element[];
  meta: Parameters<typeof Meta>[0];
}

function getSlides(props: SlideshowProps) {
  const results = [];
  const { children } = props;
  for (let i = 0; i < children.length; i++) {
    results[i] = (j: number) => (j === 0 ? children[i] : props.children[i]);
  }
  return results;
}

export default function Slideshow(props: SlideshowProps) {
  let slideRef: HTMLElement;
  const slides = getSlides(props);

  const receivedBoards = createServerData$<Stroke[][][], [string, string, number]>(
    async ([, url, slideCount]) => {
      return await loadBoard(url, slideCount).json();
    },
    {
      initialValue: slides.map(() => [[]]),
      key: () => ['boards', useLocation().pathname, slides.length],
    },
  );

  const boards = createMemo<Stroke[][][]>(() => {
    return cloneDeep(receivedBoards()!);
  });

  const [, saveAction] = createServerAction$(
    async (data: { url: string; contents: Stroke[][][] }, event) => {
      return writeBoard(data.url, data.contents, event.request);
    },
  );
  const url = useLocation().pathname;
  const save = () => {
    saveAction({ url, contents: boards() });
  };

  const dimensions = { width: 1920, height: 1080 };
  let deck: InstanceType<typeof import('reveal.js')>;
  const [vboardCount, setVboardCount] = createSignal<number[]>(slides.map(() => 1));
  createEffect(() => {
    const count = boards().map((vboards: Stroke[][]) => vboards.length);
    setVboardCount(count);
  });
  onMount(async () => {
    const Reveal = (await import('reveal.js')).default;
    deck = new Reveal({
      ...dimensions,
      center: false,
      hash: true,
      margin: 0,
      slideNumber: true,
      touch: false,
      transition: 'none',
    });
    deck.on('slidechanged', save);
    deck.initialize();
    const addBoard = (i: number) => {
      return () => {
        boards()[i].push([]);
        const newCount = vboardCount().map((count, j) => (i === j ? count + 1 : count));
        setVboardCount(newCount);
        deck.sync();
      };
    };
    deck.addKeyBinding('40', () => {
      const { h, v } = deck.getIndices();
      if (v === boards()[h - 1].length - 1) {
        if (boards()[h - 1][v].length <= 1) {
          return;
        }
        addBoard(h - 1)();
      }
      deck.sync();
      deck.down();
    });
  });
  onCleanup(() => {
    deck.destroy();
  });

  return (
    <div class="reveal">
      <div class="slides">
        <section class="slide title-slide">
          <div>
            <Meta {...props.meta} />
          </div>
        </section>
        <For each={slides}>
          {(slide, i) => (
            <section>
              <For each={[...Array(vboardCount()[i()]).keys()]}>
                {(j) => (
                  <section class="slide" ref={slideRef}>
                    {slide(j)}
                    <Whiteboard container={slideRef} strokes={boards()[i()][j]} {...dimensions} />
                  </section>
                )}
              </For>
            </section>
          )}
        </For>
      </div>
    </div>
  );
}
