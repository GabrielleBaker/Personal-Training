import React, {useState,useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mdiDumbbell } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import './CustomerList';
import Customerapp from './CustomerList';
import Trainings from './Trainings';
import './Trainings';
import './HomePage';
import HomePage from './HomePage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  } from "react-router-dom";
  

//code for the drawer adapted from following source
//https://mui.com/material-ui/react-drawer/#drawer
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

<BrowserRouter className="navigate">
        <Link to="/CustomerList">Customers</Link>{' '}
        <Link to="/Trainings">Training Sessions</Link>{' '}
        <Link to=' '>HomePage</Link>{' '}
        <Link to='/'>HomePage</Link>{' '}
        <Link to='/HomePage'>HomePage</Link>{' '}
        </BrowserRouter>

  return(
    <Box sx={{ display: 'flex' , backgroundColor: '#ffe6f7'}} >
    <CssBaseline />
    <AppBar position="fixed" open={open} style={{ background: '#ff66b3' }} >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="white" noWrap component="a" href="/HomePage">
          Personal Trainer App
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
          <ListItem>
            <ListItemButton component="a" href="/Trainings">
              <ListItemIcon>
                {  
                //material iu icons source https://mui.com/material-ui/icons/
                //mdi icons source https://pictogrammers.com/library/mdi/
                <Icon path={mdiDumbbell} 
                size={1.5} 
                color="#e60099"/>
                 }
              </ListItemIcon>
              <ListItemText primary="Trainings" />
              <ListItemText  />
              </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component="a" href="/CustomerList">
              <ListItemIcon>
                {  
                //material iu icons source https://mui.com/material-ui/icons/
                //mdi icons source https://pictogrammers.com/library/mdi/
                <Icon path={mdiAccount}
                size={1.5}
                color="#ff33bb"/> 
                 }
              </ListItemIcon>
                <ListItemText primary="Customers" />
                <ListItemText/>
              </ListItemButton>
          </ListItem>
      </List>
     
    </Drawer>
    <Main open={open}>
      <DrawerHeader />
      <BrowserRouter className="navigate">
      <Routes>
            <Route path="/HomePage" element={<HomePage />} />
            <Route exact path="/" element={<HomePage />}/>
            <Route path="/CustomerList" element={<Customerapp />} />
            <Route path="/Trainings" element={<Trainings />} />
        </Routes>
          </BrowserRouter>
    </Main>
  </Box>
  ); 
}