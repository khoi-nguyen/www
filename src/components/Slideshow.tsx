import { cloneDeep } from 'lodash-es';
import 'reveal.js/dist/reveal.css';
import { children, createMemo } from 'solid-js';
import { createServerAction$, createServerData$ } from 'solid-start/server';
import type { Stroke } from '~/lib/Whiteboard';
import { loadBoard, writeBoard } from '~/lib/server/boards';

interface SlideshowProps {
  children: JSX.Element;
  meta: Parameters<typeof Meta>[0];
}

export default function Slideshow(props: SlideshowProps) {
  let slideRef: HTMLElement;
  const slides = children(() => props.children).toArray();

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
              <For each={[...Array(boards()[i()].length).keys()]}>
                {(j) => (
                  <section class="slide" ref={slideRef}>
                    {slide}
                    <Whiteboard
                      container={slideRef}
                      strokes={boards()[i()][j]}
                      {...dimensions}
                      save={save}
                    />
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
