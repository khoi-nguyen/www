import dedent from 'dedent-js';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const macros = {
  '\\C': '\\mathbb{C}',
  '\\R': '\\mathbb{R}',
  '\\N': '\\mathbb{N}',
  '\\Z': '\\mathbb{Z}',
  '\\abs': '\\left|#1\\right|',
  '\\bigo': '\\mathcal{O}',
  '\\bigtheta': '\\mathcal{\\Theta}',
  '\\dd': '\\,\\mathrm{d}',
  '\\defeq': '\\stackrel{\\mathsf{def}}{=}',
  '\\e': '\\mathrm{e}',
  '\\epsilon': '\\varepsilon',
  '\\i': '\\mathrm{i}',
  '\\ip': '\\langle #1, #2 \\rangle',
  '\\mat': '\\mathsf{#1}',
  '\\dist': '\\mathrm{dist}',
  '\\placeholder': '\\mathord{\\color{lightgray}\\bullet}',
  '\\vec': '\\mathbf{\\boldsymbol{#1}}',
  '\\vv': '\\overrightarrow{#1}',
};

export default function render(tex: string, displayMode = false) {
  return katex.renderToString(dedent(tex), { macros, displayMode, output: 'html' });
}
