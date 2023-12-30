import 'reveal.js/dist/reveal.css';
import { makeContext, BoardContext } from '~/stores/boards';

interface SlideshowProps {
  children: JSX.Element | JSX.Element[];
  meta: Parameters<typeof Meta>[0];
}

function getSlides(props: SlideshowProps) {
  const results = [];
  const { children } = props;
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      results[i] = (j: number) => (j === 0 ? children[i] : (props.children as HTMLElement[])[i]);
    }
  } else {
    results[0] = (j: number) => (j === 0 ? children : props.children);
  }
  return results;
}

export default function Slideshow(props: SlideshowProps) {
  let slideRef: HTMLElement;
  const slides = getSlides(props);

  const context = makeContext(slides.length);

  const dimensions = { width: 1920, height: 1080 };
  let deck: InstanceType<typeof import('reveal.js')>;
  onMount(async () => {
    const Reveal = (await import('reveal.js')).default;
    deck = new Reveal({
      ...dimensions,
      center: false,
      hash: true,
      margin: 0,
      pdfSeparateFragments: false,
      slideNumber: true,
      touch: false,
      transition: 'none',
    });
    deck.initialize();
    deck.addKeyBinding('38', () => {
      const { h, v } = deck.getIndices();
      const emptyBoard = context.boards()[h - 1][v].length <= 1;
      if (emptyBoard && v >= 1) {
        context.deleteBoard(h - 1, v);
      }
      deck.up();
    });
    deck.addKeyBinding('40', () => {
      const { h, v } = deck.getIndices();
      if (v === context.boards()[h - 1].length - 1) {
        if (context.boards()[h - 1][v].length <= 1) {
          return;
        }
        context.addBoard(h - 1)();
      }
      deck.sync();
      deck.down();
    });
    deck.on('slidechanged', context.save);
  });
  onCleanup(async () => {
    if (deck) {
      deck.destroy();
    }
  });

  return (
    <BoardContext.Provider value={context}>
      <div class="reveal">
        <div class="slides">
          <section class="slide title-slide">
            <div>
              <Meta {...props.meta} />
              {context.admin()}
            </div>
          </section>
          <For each={slides}>
            {(slide, i) => (
              <section>
                <For each={[...Array(context.vboardCount()[i()]).keys()]}>
                  {(j) => (
                    <section class="slide" ref={slideRef}>
                      {slide(j)}
                      <Whiteboard
                        container={slideRef}
                        strokes={context.boards()[i()][j]}
                        {...dimensions}
                      />
                    </section>
                  )}
                </For>
              </section>
            )}
          </For>
        </div>
      </div>
    </BoardContext.Provider>
  );
}
