import { Public } from '@mui/icons-material';
import { styled } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { pages } from './pages';
import { GridTableRowsIcon } from '@mui/x-data-grid';

export const HighlightedActiveText = styled(ListItemText)<{ isActive: boolean }>(({ isActive }) =>
  isActive ? { backgroundColor: 'grey' } : {},
);

export const MainListItems = () => {
  const isWorldPage = useMatch(pages.WorldPage + '/:column');
  const isTimelinePage = useMatch(pages.TimelinePage);
  const isDataTablePage = useMatch(pages.DataTablePage);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate(pages.WorldPage + '/total_cases')}>
        <ListItemIcon>
          <Public style={isWorldPage ? { color: 'black' } : undefined} />
        </ListItemIcon>
        <ListItemText primary="World Map" primaryTypographyProps={{ fontWeight: isWorldPage ? 'bold' : undefined }} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate(pages.TimelinePage)}>
        <ListItemIcon>
          <TimelineIcon style={isTimelinePage ? { color: 'black' } : undefined} />
        </ListItemIcon>
        <ListItemText primary="Timeline" primaryTypographyProps={{ fontWeight: isTimelinePage ? 'bold' : undefined }} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate(pages.DataTablePage)}>
        <ListItemIcon>
          <GridTableRowsIcon style={isDataTablePage ? { color: 'black' } : undefined} />
        </ListItemIcon>
        <ListItemText primary="Timeline" primaryTypographyProps={{ fontWeight: isDataTablePage ? 'bold' : undefined }} />
      </ListItemButton>
    </React.Fragment>
  );
};

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
