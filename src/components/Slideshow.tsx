import { cloneDeep } from 'lodash-es';
import 'reveal.js/dist/reveal.css';
import type { Stroke } from '~/lib/Whiteboard';
import { loadBoard, writeBoard } from '~/server/boards';

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

  const receivedBoards = createServerData$<Stroke[][][], [string, string, number]>(loadBoard, {
    initialValue: slides.map(() => [[]]),
    key: () => ['boards', useLocation().pathname, slides.length],
  });
  const boards = createMemo<Stroke[][][]>(() => cloneDeep(receivedBoards()!));

  const [admin] = useSession();
  const [state, setState] = createSignal<'unsaved' | 'saving' | 'saved'>('saved');
  const [, saveAction] = createServerAction$(writeBoard);
  const url = useLocation().pathname;
  const onBoardChange = () => {
    setState('unsaved');
  };
  const save = async () => {
    if (admin() && state() === 'unsaved') {
      setState('saving');
      await saveAction({ url, contents: boards() });
      setState('saved');
    }
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
      pdfSeparateFragments: false,
      slideNumber: true,
      touch: false,
      transition: 'none',
    });
    deck.initialize();
    const addBoard = (i: number) => {
      return () => {
        boards()[i].push([]);
        const newCount = vboardCount().map((count, j) => (i === j ? count + 1 : count));
        setState('unsaved');
        setVboardCount(newCount);
        deck.sync();
      };
    };
    deck.addKeyBinding('38', () => {
      const { h, v } = deck.getIndices();
      const emptyBoard = boards()[h - 1][v].length <= 1;
      if (emptyBoard && v >= 1) {
        boards()[h - 1].splice(v, 1);
        setState('unsaved');
        setVboardCount(vboardCount().map((count, j) => (j === h - 1 ? count - 1 : count)));
      }
      deck.up();
    });
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
    deck.on('slidechanged', save);
  });
  onCleanup(async () => {
    if (deck) {
      deck.destroy();
    }
  });

  return (
    <div class="reveal">
      <div class="slides">
        <section class="slide title-slide">
          <div>
            <Meta {...props.meta} />
            {admin()}
          </div>
        </section>
        <For each={slides}>
          {(slide, i) => (
            <section>
              <For each={[...Array(vboardCount()[i()]).keys()]}>
                {(j) => (
                  <section class="slide" ref={slideRef}>
                    {slide(j)}
                    <Whiteboard
                      container={slideRef}
                      strokes={boards()[i()][j]}
                      {...dimensions}
                      state={state()}
                      onBoardChange={onBoardChange}
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
