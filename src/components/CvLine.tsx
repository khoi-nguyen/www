interface CvLineProps {
  children?: JSX.Element;
  dates: (Date | undefined)[];
  employer: string | JSX.Element;
  location?: string | JSX.Element;
  title: string | JSX.Element;
}

export default function CvLine(props: CvLineProps) {
  const showDate = (date?: Date) => {
    if (!date) {
      return;
    }
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };
  return (
    <div class="cv-line block">
      <hgroup class="columns">
        <h4 class="is-8">
          {props.title}, {props.employer} <Show when={props.location}>({props.location})</Show>
        </h4>
        <p class="is-4">
          {props.dates.length === 1 && 'Since '}
          {props.dates
            .filter((x) => x !== undefined)
            .map(showDate)
            .join(' — ')}
        </p>
      </hgroup>
      {props.children}
    </div>
  );
}
