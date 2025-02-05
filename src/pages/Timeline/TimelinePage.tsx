import TimelineChart from './TimelineChart';
import { useTimelineData } from './use-timeline-data.hook';

export function TimelinePage() {
  const { data, error, isFetching } = useTimelineData();
  return <TimelineChart data={data.data} />;
}
