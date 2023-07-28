import React from 'react';
import { mainListItems, secondaryListItems } from './ListItems';
import { AppBar, IconButton, Toolbar, Typography, Badge, Drawer, Divider, styled } from '@mui/material';
import { Menu, Notifications, ChevronLeft, List } from '@mui/icons-material'

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)<{ isOpen: boolean }>(({ theme, isOpen }) => isOpen ? ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}) : ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
})
);

// keep right padding when drawer closed
const StyledToolbar = styled(Toolbar)({
  paddingRight: 24,
})

const TitleTypography = styled(Typography)({
  flexGrow: 1,
})

const StyledMenuIconButton = styled(IconButton)<{ isOpen: boolean }>(({ isOpen }) => ({
  marginRight: 36,
  display: isOpen ? 'none' : undefined
}))

const StyledDrawer = styled(Drawer)<{ isOpen: boolean }>(({ theme, isOpen }) => isOpen ?
  ({
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: 'green',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }) : ({
    position: 'relative',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    backgroundColor: 'red',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  })
);

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 8px',
  ...theme.mixins.toolbar
}))

const StyledSpan = styled('span')<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  backgroundColor: isOpen ? 'green' : 'red'
}))

export function SideMenu() {
  const [isOpen, setIsOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setIsOpen(true);
  };
  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return <>
    <StyledAppBar position="absolute" isOpen>
      <StyledToolbar>
        <StyledMenuIconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          isOpen={isOpen}
        >
          <Menu />
        </StyledMenuIconButton>
        <TitleTypography variant="h6" color="inherit" noWrap>
          My App
        </TitleTypography>
        <StyledSpan isOpen >asdasdas</StyledSpan>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
      </StyledToolbar>
    </StyledAppBar>

    <StyledDrawer
      variant="permanent"
      isOpen={isOpen}
    >
      <StyledDiv >
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </StyledDiv>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems}</List>
    </StyledDrawer>
  </>;
}