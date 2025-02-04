import { DataTable } from './DataTable';
import { useTimelineData } from '../Timeline/use-timeline-data.hook';

export function DataTablePage() {
  const { data, error, isFetching } = useTimelineData();
  console.log('🚀 | TimelinePage | data:', data.data);
  return <DataTable data={data.data} />;
}
