import logo from '~/assets/nyu.svg'

const meta: Metadata = {
  title: 'New York University',
  description: "List of all the courses I'm teaching at NYU",
  hideHeader: true,
}

export default () => {
  return (
    <Page meta={meta}>
      <div class="has-text-centered">
        <img src={logo} alt="New York University" style={{ height: '100px' }} />
      </div>
      <Explorer
        filter={(page) => page.subtitle?.startsWith('NYU') === true}
        pattern={`teaching/.*/index\.json$`}
      />
    </Page>
  )
}
