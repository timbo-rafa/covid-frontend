import TimelineChart from './TimelineChart';
import { useTimelineData } from './use-timeline-data.hook';

export function TimelinePage() {
  const { data, error, isFetching } = useTimelineData();
  console.log('🚀 | TimelinePage | data:', data.data);
  return <TimelineChart data={data.data} />;
}
