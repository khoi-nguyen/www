import type { EventImpl } from '@fullcalendar/core/internal'
import { lang } from '~/lib/signals'

interface CalendarProps {
  initialView?: 'listMonth' | 'timeGridWeek' | 'listWeek'
  changeEvent?: (event: EventImpl) => void
  showLocation?: boolean
  filter?: (event: EventImpl) => boolean
}

export default (props: CalendarProps) => {
  props = mergeProps({ initialView: 'listMonth' as const }, props)
  const host = (<div />) as HTMLDivElement

  onMount(async () => {
    const root = host.attachShadow({ mode: 'open' })
    const mount = (<div />) as HTMLDivElement
    root.appendChild(mount)

    const [fc, enLocale, frLocale, icalendarPlugin, listPlugin, timeGridPlugin] = await Promise.all(
      [
        import('@fullcalendar/core'),
        (await import('@fullcalendar/core/locales/en-gb')).default,
        (await import('@fullcalendar/core/locales/fr')).default,
        (await import('@fullcalendar/icalendar')).default,
        (await import('@fullcalendar/list')).default,
        (await import('@fullcalendar/timegrid')).default,
      ],
    )
    const calendar = new fc.Calendar(mount, {
      height: 'auto',
      plugins: [listPlugin, icalendarPlugin, timeGridPlugin],
      initialView: props.initialView,
      locale: lang() === 'fr' ? frLocale : enLocale,
      events: {
        url: 'https://calendar.ecam.be/sics/NGY?t=99c3d0028d08bcc3fcc74855d669e2c63e2cd814c1fb23525e1743152d7613f8',
        format: 'ics',
      },
      eventDidMount: function (info) {
        if (props.filter && !props.filter(info.event)) {
          info.event.setProp('display', 'none')
        } else {
          if (props.changeEvent) {
            props.changeEvent(info.event)
          }
          if (props.showLocation) {
            const location = info.event.extendedProps.location
            if (location) {
              info.event.setProp('title', `${info.event.title} (${location})`)
            }
          }
        }
      },
      allDaySlot: false,
      slotMinTime: '08:00:00',
      slotMaxTime: '18:00:00',
    })
    calendar.render()
  })

  return host
}
