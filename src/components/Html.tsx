interface HtmlProps {
  code?: string
  children?: JSX.Element
  onExecuted?: () => void
}

const style = (code: string) => dedent`
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
        window.frameElement.style.height = cr.height + 5 + "px";
      }
    });
    ro.observe(document.body);
  </script>
  </html>
`

export default function Html(props: HtmlProps) {
  const code = () => (props.children ? String(props.children) : String(props.code))
  const iframe = (<iframe width="100%" class="clickable" />) as HTMLIFrameElement

  createEffect(() => {
    iframe.srcdoc = style(code())
    if (props.onExecuted) {
      props.onExecuted()
    }
  })

  return iframe
}
