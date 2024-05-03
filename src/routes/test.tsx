const meta: Metadata = {
  title: 'Test',
  description: 'Poll tests',
}

export default function () {
  return (
    <Page meta={meta}>
      <p>What is the area of the circle of radius {tex`r`}?</p>
      <NumericPoll id="circle-area" answer="\pi r^2" />
      <Factorise />
      <Differentiate expr="x^2 - 5x + 6" />
      <Differentiate expr={'\\sin(4x^2+3x)'} />
      <Differentiate expr={'e^x'} />
    </Page>
  )
}