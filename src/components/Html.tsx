interface HtmlProps {
  code?: string
  clickable?: boolean
  children?: JSX.Element
  onExecuted?: () => void
}

const style = (code: string) => html.raw`
  <!DOCTYPE html>
  <html>
  <style>
    html, body {
      margin: 0;
      padding: 0;
    }
    body {
      border: 1px solid white;
    }
    body, input, textarea, button {
      font-size: 1.5em;
    }
  </style>
  <body>
  ${code}
  </body>
  <script type="text/javascript">
    var ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        window.frameElement.style.height = cr.height + 2 + "px";
      }
    });
    ro.observe(document.body);
  </script>
  </html>
`

export default function Html(props: HtmlProps) {
  props = mergeProps({ clickable: true }, props)
  const code = () => (props.children ? String(props.children) : String(props.code))
  const iframe = (
    <iframe width="100%" classList={{ clickable: props.clickable }} />
  ) as HTMLIFrameElement

  createEffect(() => {
    iframe.srcdoc = style(code())
    if (props.onExecuted) {
      props.onExecuted()
    }
  })

  return iframe
}
