const meta: Metadata = {
  title: 'Séance 1',
  description: 'Séance 1',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Rappels"></Slide>
    </Slideshow>
  )
}
