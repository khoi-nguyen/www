import { Calendar } from '@fullcalendar/core';
import type { EventImpl } from '@fullcalendar/core/internal';
import enLocale from '@fullcalendar/core/locales/en-gb';
import frLocale from '@fullcalendar/core/locales/fr';
import icalendarPlugin from '@fullcalendar/icalendar';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { lang } from '~/lib/signals';

interface CalendarProps {
  initialView?: 'listMonth' | 'timeGridWeek';
  filter?: (event: EventImpl) => boolean;
}

export default (props: CalendarProps) => {
  props = mergeProps({ initialView: 'listMonth' as const }, props);
  const host = (<div />) as HTMLDivElement;

  onMount(() => {
    const calendar = new Calendar(host, {
      height: 'auto',
      plugins: [listPlugin, icalendarPlugin, timeGridPlugin],
      initialView: props.initialView,
      locale: lang() === 'fr' ? frLocale : enLocale,
      events: {
        url: 'https://calendar.ecam.be/ics/ngy',
        format: 'ics',
      },
      eventDidMount: function (info) {
        if (props.filter && !props.filter(info.event)) {
          info.event.setProp('display', 'none');
        }
      },
      allDaySlot: false,
      slotMinTime: '08:00:00',
      slotMaxTime: '18:00:00',
    });
    calendar.render();
  });

  return <>{host}</>;
};
