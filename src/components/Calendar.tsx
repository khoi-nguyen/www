import { Calendar } from '@fullcalendar/core';
import type { EventImpl } from '@fullcalendar/core/internal';
import enLocale from '@fullcalendar/core/locales/en-gb';
import frLocale from '@fullcalendar/core/locales/fr';
import icalendarPlugin from '@fullcalendar/icalendar';
import listPlugin from '@fullcalendar/list';
import { lang } from '~/lib/signals';

interface CalendarProps {
  filter?: (event: EventImpl) => boolean;
}

export default (props: CalendarProps) => {
  const host = (<div />) as HTMLDivElement;

  onMount(() => {
    const calendar = new Calendar(host, {
      height: 'auto',
      plugins: [listPlugin, icalendarPlugin],
      initialView: 'listMonth',
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
    });
    calendar.render();
  });

  return <>{host}</>;
};
