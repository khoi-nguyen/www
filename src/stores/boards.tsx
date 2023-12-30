import { cloneDeep } from 'lodash-es';
import { createContext, useContext } from 'solid-js';
import type { Stroke } from '~/lib/Whiteboard';
import { loadBoard, writeBoard } from '~/server/boards';

export function makeContext(slideCount: number) {
  const [admin] = useSession();
  const url = useLocation().pathname;

  // Saving
  const [saving, saveAction] = createServerAction$(writeBoard);
  const [state, setState] = createSignal<'unsaved' | 'saving' | 'saved'>('saved');
  const save = async () => {
    if (admin() && state() === 'unsaved') {
      setState('saving');
      await saveAction({ url, contents: boards() });
      setState('saved');
    }
  };
  const handleBoardChange = () => {
    setState('unsaved');
  };
  createEffect(() => {
    if ((state() === 'saved' || state() === 'saving') && saving.error) {
      setState('unsaved');
    }
  });

  // Boards
  const receivedBoards = createServerData$<Stroke[][][], [string, string, number]>(loadBoard, {
    initialValue: [...Array(slideCount)].map(() => [[]]),
    key: () => ['boards', url, slideCount],
  });
  const boards = createMemo<Stroke[][][]>(() => cloneDeep(receivedBoards()!));
  const [vboardCount, setVboardCount] = createSignal<number[]>([...Array(slideCount)].map(() => 1));
  createEffect(() => {
    const count = boards().map((vboards: Stroke[][]) => vboards.length);
    setVboardCount(count);
  });
  const addBoard = (i: number) => {
    return () => {
      boards()[i].push([]);
      const newCount = vboardCount().map((count, j) => (i === j ? count + 1 : count));
      setState('unsaved');
      setVboardCount(newCount);
    };
  };
  const deleteBoard = (i: number, j: number) => {
    boards()[i].splice(j, 1);
    handleBoardChange();
    setVboardCount(vboardCount().map((count, k) => (k === i ? count - 1 : count)));
  };

  return {
    addBoard,
    deleteBoard,
    admin,
    boards,
    handleBoardChange,
    save,
    state,
    vboardCount,
  };
}

type BoardContextType = ReturnType<typeof makeContext>;
export const BoardContext = createContext<BoardContextType>();
export const useBoards = () => useContext(BoardContext)!;
