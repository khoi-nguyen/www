import type { MathfieldElement } from 'mathlive'

interface MathFieldProps {
  defaultValue?: string
  onChange?: (newValue?: string) => void
  onInput?: (newValue?: string) => void
  readOnly?: boolean
}

export default function MathField(props: MathFieldProps) {
  let container: HTMLDivElement

  let field: MathfieldElement
  const setup = async () => {
    if (!field) {
      const mathlive = await import('mathlive')
      field = new mathlive.MathfieldElement({})
      field.value = props.defaultValue || ''
      field.readOnly = props.readOnly || false
    }
  }

  createEffect(async () => {
    await setup()
    field.style = 'min-width: 250px;'
    if (props.onInput) {
      field.addEventListener('input', (event: Event) => {
        props.onInput!((event.target as MathfieldElement).getValue('latex-without-placeholders'))
      })
    }
    if (props.onChange) {
      field.addEventListener('change', (event: Event) => {
        props.onChange!((event.target as MathfieldElement).getValue('latex-without-placeholders'))
      })
    }
    container.appendChild(field)
  })

  createEffect(async () => {
    await setup()
    if (props.defaultValue) {
      field.value = props.defaultValue
    }
  })

  return <div ref={container!} />
}
