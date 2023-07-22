import type { MessageToWorker, MessageFromWorker } from '~/lib/pyodide.worker';

const callbacks: { [uid: string]: (msg: MessageFromWorker) => void } = {};

const runPython = (code: string): Promise<MessageFromWorker> => {
  return new Promise((resolve) => {
    const uid = Date.now().toString(36) + Math.random().toString(36);
    if (!code) {
      resolve({ output: '', uid, format: 'string' });
    }

    const worker = new SharedWorker(new URL('./pyodide.worker.ts', import.meta.url), {
      type: 'module',
    });

    callbacks[uid] = resolve;
    worker.port.onmessage = (event: MessageEvent<MessageFromWorker>) => {
      const resolve = callbacks[event.data.uid];
      delete callbacks[event.data.uid];
      resolve(event.data);
    };
    worker.port.postMessage({ code, uid } as MessageToWorker);
  });
};

export default runPython;
