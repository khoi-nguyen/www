const meta: Metadata = {
  title: 'Test',
  description: 'Poll tests',
}

export default function () {
  return (
    <Page meta={meta}>
      <Factorise />
      <Differentiate expr="x^2 - 5x + 6" />
      <Differentiate expr={'\\sin(4x^2+3x)'} />
      <Differentiate expr={'e^x'} />
    </Page>
  )
}
