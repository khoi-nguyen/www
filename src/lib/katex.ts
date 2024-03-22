import katex from 'katex'
import 'katex/dist/katex.min.css'
import { lang } from '~/lib/signals'

const macros = () => ({
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
  '\\defeq': '\\stackrel{\\mathsf{def}}{=}',
  '\\del': '\\vec{\\nabla}',
  '\\divergence': '\\vec \\nabla \\cdot',
  '\\dom': '\\mathrm{dom}\\,',
  '\\e': '\\mathrm{e}',
  '\\epsilon': '\\varepsilon',
  '\\grad': '\\vec{\\nabla}',
  '\\i': '\\mathrm{i}',
  '\\ip': '\\langle #1, #2 \\rangle',
  '\\mat': '\\mathsf{#1}',
  '\\norm': '\\left\\|#1\\right\\|',
  '\\range': '\\mathrm{im}\\,',
  '\\rot': '\\del \\times',
  '\\dist': '\\mathrm{dist}',
  '\\placeholder': '\\mathord{\\color{lightgray}\\bullet}',
  '\\vec': lang() === 'en' ? '\\mathbf{\\boldsymbol{#1}}' : null,
  '\\P': '\\mathbb{P}',
})

export default function render(tex: string, displayMode = false) {
  if (displayMode && tex.indexOf('\\begin{align') === -1) {
    tex = '\\begin{align*}' + tex + '\\end{align*}'
  }
  return katex.renderToString(tex, { macros: macros(), displayMode, output: 'html' })
}
