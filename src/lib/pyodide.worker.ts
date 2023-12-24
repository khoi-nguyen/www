/// <reference path="../../node_modules/@types/sharedworker/index.d.ts" />
import dedent from 'dedent-js';
import { loadPyodide } from 'pyodide';
import type { PyodideInterface } from 'pyodide';
import type { PyProxy } from 'pyodide/ffi';

interface Message {
  format: 'string' | 'matplotlib' | 'latex' | 'error';
  uid: string;
}

export interface MessageToWorker extends Message {
  code: string;
}

export interface MessageFromWorker extends Message {
  output: string;
}

let pyodide: PyodideInterface;

const indexURL = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/';
async function load() {
  pyodide = await loadPyodide({
    indexURL: import.meta.env.MODE === 'development' ? '/pyodide/' : indexURL,
  });
}
const loadPromise = load();

onconnect = (e: MessageEvent) => {
  const port = e.ports[0];

  port.onmessage = async (event: MessageEvent<MessageToWorker>) => {
    let format = 'string';
    let code = event.data.code;
    const uid = event.data.uid;

    await loadPromise;
    await pyodide.loadPackagesFromImports(code);

    // Patches
    if (code.includes('import matplotlib')) {
      await pyodide.runPythonAsync(`import os\nos.environ["MPLBACKEND"] = "AGG"`);
      code = dedent`
        import base64
        import io
        import matplotlib.pyplot as plt
        ${code}
        image_data = io.BytesIO()
        plt.savefig(image_data, format='png')
        plt.close()
        image_data.seek(0)
        base64_data = base64.b64encode(image_data.getvalue()).decode()
        f'data:image/png;base64,{base64_data}'
      `;
      format = 'matplotlib';
    }

    let output;
    try {
      output = await pyodide.runPythonAsync(code);
      if (output && output._repr_latex_ !== undefined) {
        output = output._repr_latex_();
        output = output.substr(1, output.length - 2);
        format = 'latex';
      } else if (output.type === 'list' && output.toJs()[0]._repr_latex_) {
        const list = output.toJs();
        output = list
          .map((element: PyProxy) => {
            const latex = element._repr_latex_();
            return latex.substring(1, latex.length - 1);
          })
          .join(',');
        output = `\\left[${output}\\right]`;
        format = 'latex';
      } else {
        output = String(output);
      }
    } catch (error) {
      output = error;
      format = 'error';
    }
    port.postMessage({ output, uid, format } as MessageFromWorker);
  };
};
