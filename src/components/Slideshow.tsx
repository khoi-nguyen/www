import { cloneDeep } from 'lodash';
import 'reveal.js/dist/reveal.css';
import { children } from 'solid-js';
import server$, { createServerData$ } from 'solid-start/server';
import type { Stroke } from '~/lib/Whiteboard';
import { loadBoard } from '~/lib/server/boards';

interface SlideshowProps {
  children: JSX.Element;
  meta: Parameters<typeof Meta>[0];
}

export default function Slideshow(props: SlideshowProps) {
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
    deck.initialize();
  });
  onCleanup(() => {
    deck.destroy();
  });

  let slideRef: HTMLElement;
  const slides = children(() => props.children).toArray();

  const receivedBoards = createServerData$<Stroke[][][]>(
    async ([, url, slideCount]) => {
      return await loadBoard(url, slideCount).json();
    },
    {
      key: () => ['boards', useLocation().pathname, slides.length],
    },
  );

  const [boards, setBoards] = createSignal<Stroke[][][]>(slides.map(() => [[]]));
  createEffect(() => {
    if (receivedBoards.state === 'ready') {
      setBoards(cloneDeep(receivedBoards()!));
    }
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
