import 'reveal.js/dist/reveal.css';
import { children } from 'solid-js';
import type { Stroke } from '~/lib/Whiteboard';

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

  const boards: Stroke[][][] = slides.map(() => [[]]);

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
              <section class="slide" ref={slideRef}>
                {slide}
                <Whiteboard container={slideRef} strokes={boards[i()][0]} {...dimensions} />
              </section>
            </section>
          )}
        </For>
      </div>
    </div>
  );
}
