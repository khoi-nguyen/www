import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

interface ModalProps {
  children: JSX.Element | JSX.Element[]
  open?: boolean
  onClose?: () => void
}

export default function Modal(props: ModalProps) {
  let dialog: HTMLDialogElement
  createEffect(() => {
    if (dialog && props.open) {
      dialog.showModal()
    } else if (dialog && !props.open) {
      dialog.close()
    }
  })
  return (
    <dialog ref={dialog!}>
      <div class="columns">
        <div class="is-narrow">
          <button onClick={props.onClose}>
            <Fa icon={faCircleXmark} />
          </button>
        </div>
        <div>{props.children}</div>
      </div>
    </dialog>
  )
}
