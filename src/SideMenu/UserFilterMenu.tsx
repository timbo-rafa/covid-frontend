import { Box, Paper, Tab, Tabs, useTheme } from '@mui/material';
import React from 'react';
import { TabContent } from 'src/molecules/TabContent';
import { ColumnsCheckList } from './ColumnsCheckList';
import { CountriesCheckList } from './CountriesCheckList';

export function UserFilterMenu() {
  const theme = useTheme();

  const COLUMNS_TAB = 0;
  const COUNTRIES_TAB = 1;
  const [currentTab, setCurrentTab] = React.useState(COLUMNS_TAB);
  return (
    <Paper>
      <Tabs value={currentTab} onChange={(_, newTab) => setCurrentTab(newTab)} aria-label="User filter tabs">
        <Tab label="Columns" />
        <Tab label="Countries" />
      </Tabs>
      <Box display={'flex'} flexDirection={'column'} sx={{ margin: theme.spacing(3) }}>
        <TabContent currentTab={currentTab} index={COLUMNS_TAB}>
          <ColumnsCheckList />
        </TabContent>
        <TabContent currentTab={currentTab} index={COUNTRIES_TAB}>
          <CountriesCheckList />
        </TabContent>
      </Box>
    </Paper>
  );
}
