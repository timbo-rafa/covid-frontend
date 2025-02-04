import { Public, Room } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { styled } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
import { redirect, useMatch, useNavigate } from 'react-router-dom';
import { pages } from './pages';

export const HighlightedActiveText = styled(ListItemText)<{ isActive: boolean }>(({ isActive }) =>
  isActive ? { backgroundColor: 'grey' } : {},
);

export const MainListItems = () => {
  const isWorldPage = useMatch(pages.WorldPage + '/:column');
  const isTimelinePage = useMatch(pages.TimelinePage);
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
          <BarChartIcon style={isTimelinePage ? { color: 'black' } : undefined} />
        </ListItemIcon>
        <ListItemText primary="Timeline" primaryTypographyProps={{ fontWeight: isTimelinePage ? 'bold' : undefined }} />
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
