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
  '\\bvec': '\\mathbf{\\boldsymbol{#1}}',
  '\\curl': '\\vec \\nabla \\times',
  '\\dd': '\\,\\mathrm{d}',
  '\\divergence': '\\vec \\nabla \\cdot',
  '\\defeq': '\\stackrel{\\mathsf{def}}{=}',
  '\\e': '\\mathrm{e}',
  '\\epsilon': '\\varepsilon',
  '\\grad': '\\vec{\\nabla}',
  '\\i': '\\mathrm{i}',
  '\\ip': '\\langle #1, #2 \\rangle',
  '\\mat': '\\mathsf{#1}',
  '\\norm': '\\|#1\\|',
  '\\dist': '\\mathrm{dist}',
  '\\placeholder': '\\mathord{\\color{lightgray}\\bullet}',
  '\\P': '\\mathbb{P}',
};

export default function render(tex: string, displayMode = false) {
  return katex.renderToString(dedent(tex), { macros, displayMode, output: 'html' });
}
