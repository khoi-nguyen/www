import Prism from 'prismjs'
import 'prismjs/themes/prism-coy.css'
import { transpile } from '~/lib/transpile'

interface TranspileProps {
  code: string
  onChange: () => void
}

export default function Transpile(props: TranspileProps) {
  const tcode = () => transpile(props.code)
  createEffect(
    on(tcode, () => {
      props.onChange()
    }),
  )
  const html = () => Prism.highlight(tcode(), Prism.languages.javascript, 'javascript')

  return (
    <pre>
      <code innerHTML={html()} />
    </pre>
  )
}
