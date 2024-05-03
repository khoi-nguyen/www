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
    field.addEventListener('input', () => {
      if (props.onInput) {
        props.onInput(field.value)
      }
    })
    field.addEventListener('change', () => {
      if (props.onChange) {
        props.onChange(field.value)
      }
    })
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
