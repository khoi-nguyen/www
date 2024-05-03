import type { MathfieldElement } from 'mathlive'

interface MathFieldProps {
  defaultValue?: string
  onChange: (newValue?: string) => void
  onInput: (newValue?: string) => void
}

export default function MathField(props: MathFieldProps) {
  let container: HTMLDivElement

  let field: MathfieldElement
  const setup = async () => {
    if (!field) {
      const mathlive = await import('mathlive')
      field = new mathlive.MathfieldElement({})
    }
  }

  createEffect(async () => {
    await setup()
    field.style = 'min-width: 250px;'
    if (props.onInput) {
      field.addEventListener('input', () => {
        props.onInput(field.value)
      })
    }
    if (props.onChange) {
      field.addEventListener('change', () => {
        props.onChange(field.value)
      })
    }
    container.appendChild(field)
  })

  return <div ref={container!} />
}
