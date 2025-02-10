import { Box } from '@mui/material';
import TimelineChart from './TimelineChart';
import { useTimelineData } from './use-timeline-data.hook';
import { LoadingSpinner } from 'src/molecules/LoadingSpinner';

export function TimelinePage() {
  const { data, error, isFetching } = useTimelineData();
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <LoadingSpinner isLoading={isFetching} >
        <TimelineChart data={data} />
      </LoadingSpinner>
    </Box>
  );
}
