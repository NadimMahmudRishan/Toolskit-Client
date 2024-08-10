import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem, Tooltip, Hidden } from '@mui/material';
import { TbLogout2 } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import ListRoute from '../ListRoute/ListRoute';

const drawerWidth = 260;


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(0)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 10,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);



function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(window.innerWidth > theme.breakpoints.values.sm);

    const handleDrawerOpen = () => {
        setOpen(true);

    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const [anchorElProfile, setAnchorElProfile] = React.useState(null);
    // const [anchorElNotification, setAnchorElNotification] = React.useState(null);
    // const [anchorElNotificationDoctor, setAnchorElNotificationDoctor] = React.useState(null);

    const handleOpenProfileMenu = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setAnchorElProfile(null);
    };



    // const handleOpenNotificationMenu = (event) => {
    //     setAnchorElNotification(event.currentTarget);
    // };

    // const handleCloseNotificationMenu = () => {
    //     setAnchorElNotification(null);
    // };

    // const handleOpenNotificationMenuDoctor = (event) => {
    //     setAnchorElNotificationDoctor(event.currentTarget);
    // };

    // const handleCloseNotificationMenuDoctor = () => {
    //     setAnchorElNotificationDoctor(null);
    // };



    const { user, logOut } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message);
            })
    }




    return (
        <Box sx={{ display: 'flex' }}>
            <AppBarStyled position="fixed" open={open} sx={{ backgroundColor: '#CC3333' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 2,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 0,
                            flexGrow: 1,
                            textDecoration: 'none',
                        }}
                    >
                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="120px" fill="#ffffff" height="20px"><path d="M118.5,20h-1.1c-0.6,0-1.2-0.4-1.4-1l-1.5-4h-6.1l-1.5,4c-0.2,0.6-0.8,1-1.4,1h-1.1c-1,0-1.8-1-1.4-2l1.1-3
                                 l1.5-4l3.6-10c0.2-0.6,0.8-1,1.4-1h1.6c0.6,0,1.2,0.4,1.4,1l3.6,10l1.5,4l1.1,3C120.3,19,119.5,20,118.5,20z M111.5,6.6l-1.6,4.4
                                 h3.2L111.5,6.6z M99.5,20h-1.4c-0.4,0-0.7-0.2-0.9-0.5L94,14l-2,3.5v1c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5v-17
                                 C88,0.7,88.7,0,89.5,0h1C91.3,0,92,0.7,92,1.5v8L94,6l3.2-5.5C97.4,0.2,97.7,0,98.1,0h1.4c1.2,0,1.9,1.3,1.3,2.3L96.3,10l4.5,7.8
                                 C101.4,18.8,100.7,20,99.5,20z M80.3,11.8L80,12.3v6.2c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5v-6.2l-0.3-0.5l-5.5-9.5
                                 c-0.6-1,0.2-2.3,1.3-2.3h1.4c0.4,0,0.7,0.2,0.9,0.5L76,4.3l2,3.5l2-3.5l2.2-3.8C82.4,0.2,82.7,0,83.1,0h1.4c1.2,0,1.9,1.3,1.3,2.3
                                 L80.3,11.8z M60,20c-5.5,0-10-4.5-10-10S54.5,0,60,0s10,4.5,10,10S65.5,20,60,20z M60,4c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6
                                 S63.3,4,60,4z M47.8,17.8c0.6,1-0.2,2.3-1.3,2.3h-2L41,14h-4v4.5c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5v-17
                                 C33,0.7,33.7,0,34.5,0H41c0.3,0,0.7,0,1,0.1c3.4,0.5,6,3.4,6,6.9c0,2.4-1.2,4.5-3.1,5.8L47.8,17.8z M42,4.2C41.7,4.1,41.3,4,41,4h-3
                                 c-0.6,0-1,0.4-1,1v4c0,0.6,0.4,1,1,1h3c0.3,0,0.7-0.1,1-0.2c0.3-0.1,0.6-0.3,0.9-0.5C43.6,8.8,44,7.9,44,7C44,5.7,43.2,4.6,42,4.2z
                                  M29.5,4H25v14.5c0,0.8-0.7,1.5-1.5,1.5h-1c-0.8,0-1.5-0.7-1.5-1.5V4h-4.5C15.7,4,15,3.3,15,2.5v-1C15,0.7,15.7,0,16.5,0h13
                                 C30.3,0,31,0.7,31,1.5v1C31,3.3,30.3,4,29.5,4z M6.5,20c-2.8,0-5.5-1.7-6.4-4c-0.4-1,0.3-2,1.3-2h1c0.5,0,0.9,0.3,1.2,0.7
                                 c0.2,0.3,0.4,0.6,0.8,0.8C4.9,15.8,5.8,16,6.5,16c1.5,0,2.8-0.9,2.8-2c0-0.7-0.5-1.3-1.2-1.6C7.4,12,7,11,7.4,10.3l0.4-0.9
                                 c0.4-0.7,1.2-1,1.8-0.6c0.6,0.3,1.2,0.7,1.6,1.2c1,1.1,1.7,2.5,1.7,4C13,17.3,10.1,20,6.5,20z M11.6,6h-1c-0.5,0-0.9-0.3-1.2-0.7
                                 C9.2,4.9,8.9,4.7,8.6,4.5C8.1,4.2,7.2,4,6.5,4C5,4,3.7,4.9,3.7,6c0,0.7,0.5,1.3,1.2,1.6C5.6,8,6,9,5.6,9.7l-0.4,0.9
                                 c-0.4,0.7-1.2,1-1.8,0.6c-0.6-0.3-1.2-0.7-1.6-1.2C0.6,8.9,0,7.5,0,6c0-3.3,2.9-6,6.5-6c2.8,0,5.5,1.7,6.4,4C13.3,4.9,12.6,6,11.6,6
                                 z"></path></svg>
                        </div>
                    </Typography>


                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={user?.displayName}>
                            <IconButton onClick={handleOpenProfileMenu} sx={{ pe: 1 }}>
                                <Avatar alt="Remy Sharp" src={user?.photoURL || ''} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            component="div"
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElProfile}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElProfile)}
                            onClose={handleCloseProfileMenu}
                        >
                            <div className='lg:w-[340px] lg:h-96 w-72 h-72'>
                                <div className="flex justify-center mb-3 lg:p-14 p-3">
                                    <div>
                                        <div className="mask mask-circle lg:w-28 w-20 mx-auto">
                                            {user && <img src={user?.photoURL || ''} alt="User" />}
                                        </div>
                                        <div className="pt-4 text-center">
                                            <p className="text-[18px] font-bold">{user?.displayName}</p>
                                            <p className="text-[12px]">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <MenuItem sx={{ borderBottom: '1px solid gray', mx: 2 }} onClick={handleCloseProfileMenu}>
                                        <Typography variant="body1" component={Link} to='/myProfile' align="center">My Profile</Typography>
                                    </MenuItem>
                                    <MenuItem sx={{ mx: 2 }} onClick={handleCloseProfileMenu}>
                                        <Typography variant="body1" onClick={handleLogOut} align="center" sx={{ display: 'flex', alignItems: 'center' }}>Logout<TbLogout2 className="w-6 h-6" /></Typography>
                                    </MenuItem>
                                </div>
                            </div>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBarStyled>

            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={open}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider sx={{ backgroundColor: 'black' }} />
                    <List onClick={handleDrawerClose}>
                        <ListRoute />
                    </List>
                </Drawer>
            </Hidden>

            <Hidden mdDown implementation="css">
                <DrawerStyled variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider sx={{ backgroundColor: 'black' }} />
                    <List >
                        <ListRoute />
                    </List>
                </DrawerStyled>
            </Hidden>
            <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#F1F5F9' }}>
                <DrawerHeader />
                <Box sx={{ minHeight: '100vh' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box >
    );
}

export default MiniDrawer;
