import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { MdClose, MdContacts, MdDashboard, MdDomain, MdExitToApp } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
import useAdmin from '../../../hooks/useAdmin';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import { RiHome3Line } from 'react-icons/ri';
import DashboardIcon from '@mui/icons-material/Dashboard';
import useWishList from '../../../hooks/useWishList';
import useCart from '../../../hooks/useCart';

const drawerWidth = 240;
function ResponsiveAppBar(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const location = useLocation();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
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

    const [wish_List] = useWishList();
    const drawer = (
        <div>
            <List onClick={handleDrawerClose}>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            color: location.pathname === '/dashboard' ? '#CC3333' : 'inherit',
                            justifyContent: open ? 'initial' : 'center',
                        }}
                        component={Link}
                        to={user && (isAdmin ? '/dashboard/adminHome' : '/dashboard/userHome')}
                        selected={location.pathname === '/dashboard'}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 4 : 'auto',
                                color: open ? 'inherit' : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <MdDashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" color="black" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            color: location.pathname === '/' ? '#CC3333' : 'inherit',
                            justifyContent: open ? 'initial' : 'center',
                        }}
                        component={Link}
                        to="/"
                        selected={location.pathname === '/'}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 4 : 'auto',
                                color: open ? 'inherit' : 'auto',
                                justifyContent: 'center',
                            }}>
                            <IoHome />
                        </ListItemIcon>
                        <ListItemText primary="Home" color="black" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            color: location.pathname === '/shop' ? '#CC3333' : 'inherit',
                            justifyContent: open ? 'initial' : 'center',
                        }}
                        component={Link}
                        to="/shop"
                        selected={location.pathname === '/shop'}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 4 : 'auto',
                                color: open ? 'inherit' : 'auto',
                                justifyContent: 'center',
                            }}>
                            <MdDomain />
                        </ListItemIcon>
                        <ListItemText primary="Shop" color="black" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{
                            color: location.pathname === '/contact' ? '#CC3333' : 'inherit',
                            justifyContent: open ? 'initial' : 'center',
                        }}
                        component={Link}
                        to="/contact"
                        selected={location.pathname === '/contact'}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 4 : 'auto',
                                color: open ? 'inherit' : 'auto',
                                justifyContent: 'center',
                            }}>
                            <MdContacts />
                        </ListItemIcon>
                        <ListItemText primary="Contact" color="black" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                {user && (
                    <>
                        <ListItem disablePadding>
                            {/* <ListItemButton
                                sx={{
                                    color: location.pathname === '/myProfile' ? '#CC3333' : 'inherit',
                                    justifyContent: open ? 'initial' : 'center',
                                }}
                                component={Link}
                                to="/myProfile"
                                selected={location.pathname === '/myProfile'}
                            >
                                <ListItemIcon>
                                    <CgProfile className='w-5 h-5' />
                                </ListItemIcon>
                                <ListItemText primary="My Profile" color="black" />
                            </ListItemButton> */}
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogOut}>
                                <ListItemIcon>
                                    <MdExitToApp className='w-5 h-5' />
                                </ListItemIcon>
                                <ListItemText primary="Logout" color="black" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const [isTopDrawerOpen, setTopDrawerOpen] = React.useState(false);

    const toggleTopDrawer = () => {
        setTopDrawerOpen(!isTopDrawerOpen);
    };

    const TopDrawerContent = (
        <Box className='lg:min-h-[450px] min-h-[180px]' sx={{ width: '100%', }} role="presentation">

        </Box>
    );

    const [openDrawer, setOpenDrawer] = React.useState(false);

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const [carts] = useCart();

    const [anchorElNotificationDoctor, setAnchorElNotificationDoctor] = React.useState(null);

    const handleOpenNotificationMenuDoctor = (event) => {
        setAnchorElNotificationDoctor(event.currentTarget);
    };

    const handleCloseNotificationMenuDoctor = () => {
        setAnchorElNotificationDoctor(null);
    };

    /// Calculate subtotal
    const subtotal = carts && carts.length > 0 ? carts.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0) : 0;

    // Calculate total (subtotal + shipping)
    const total = subtotal + 25;


    return (
        <AppBar position="static" sx={{ backgroundColor: '#CC3333', color: 'white' }}>
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerToggle}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onTransitionEnd={handleDrawerTransitionEnd}
                            onClose={handleDrawerClose}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            {drawer}

                        </Drawer>
                    </Box>
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 10,
                            display: { xs: 'flex', md: 'none' },
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
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
                        <Button
                            sx={{ my: 2, color: 'white', fontFamily: 700, display: 'block' }}
                        >
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', fontFamily: 700, display: 'block' }}
                        >
                            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', fontFamily: 700, display: 'block' }}
                        >
                            <Link to="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>Blog</Link>
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', fontFamily: 700, display: 'block' }}
                        >
                            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link>
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <Link to='/wishList'>
                            <Tooltip title="Wish List">
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"

                                >
                                    <Badge badgeContent={wish_List.length} color="success">
                                        <FavoriteBorderIcon color="inherit" style={{ fontSize: 24 }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <Tooltip title="Cart">
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={handleOpenNotificationMenuDoctor}

                            >
                                <Badge badgeContent={carts.length} color="success">
                                    <AddShoppingCartIcon color="inherit" style={{ fontSize: 24 }} />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            component="div"
                            sx={{ mt: '58px' }}
                            id="user-menu"
                            anchorEl={anchorElNotificationDoctor}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNotificationDoctor)}
                            onClose={handleCloseNotificationMenuDoctor}
                        >

                            <div className="cart-menu" style={{ width: '340px' }}>
                                <div className="p-2">
                                    {carts && carts.length > 0 ? (
                                        <div>
                                            {carts.map((data) => (
                                                <div key={data._id} className="flex gap-1 mb-2 items-center cursor-pointer hover:bg-gray-100 rounded-md p-2">
                                                    <div className="cart-item-img">
                                                        <img src={data.images[0]} alt="Electric Planer" className="w-28 h-20" />
                                                    </div>
                                                    <div className="cart-item-info">
                                                        <p className="font-bold text-[17px]">{data.product_name}</p>
                                                        <p className="text-sm">Color: {data.color}</p>
                                                        <p className="text-sm">Material: Aluminium</p>
                                                        <p className="text-sm">{data.quantity || 1} × ${data.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className='text-xl text-center py-20'>No items in the cart</p>
                                    )}

                                </div>
                                <div className='flex justify-between px-10 font-bold'>
                                    <div className="subtotal">
                                        <p>Subtotal</p>
                                        <p>Shipping</p>
                                        <p>Tax</p>
                                        <p>Total</p>
                                    </div>
                                    <div className="shipping">
                                        <p>: ${subtotal.toFixed(2)}</p>
                                        <p>: $25.00</p> {/* Shipping cost */}
                                        <p>: $0.00</p> {/* Tax */}
                                        <p>: ${total.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className='flex justify-center m-5 font-bold'>
                                    <div className="flex gap-2">
                                        <Link to="shoppingCart">
                                            <button onClick={handleCloseNotificationMenuDoctor} className="btn hover:bg-base-300 rounded-sm bg-base-300 px-8 py-1">View Cart</button>
                                        </Link>
                                        <Link to='/checkOut'>
                                            <button onClick={handleCloseNotificationMenuDoctor} className="btn hover:bg-[#CC3333] rounded-sm bg-[#CC3333] text-white px-8 py-2">Checkout</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <Tooltip title="Open top drawer">
                            <SearchIcon onClick={toggleTopDrawer} color="inherit" style={{ fontSize: 30 }} sx={{ mx: 0 }}></SearchIcon>
                        </Tooltip>
                        <Drawer
                            anchor="top"
                            open={isTopDrawerOpen}
                            onClose={toggleTopDrawer}
                        >
                            {TopDrawerContent}
                        </Drawer>
                    </Box>
                    <Box sx={{ flexGrow: 0, mx: 1 }}>
                        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                            {user ? (
                                <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
                                    <Avatar alt="User Avatar" src={user?.photoURL} sx={{ width: 40, height: 40 }} />
                                </IconButton>
                            ) : (
                                <Link className='font-bold' to='/login'>
                                    <PersonOutlineIcon color="inherit" style={{ fontSize: 30 }} />
                                </Link>
                            )}
                        </Box>
                        <Drawer sx={{ display: { xs: 'none', md: 'flex' } }} anchor="right" open={openDrawer} onClose={closeDrawer}>
                            <div className="p-4 lg:w-96 w-80 min-h-full bg-base-200">
                                <div className='flex items-center justify-between'>
                                    <Typography variant="h6" className='text-xl font-bold'>Settings</Typography>
                                    <IconButton onClick={closeDrawer} color="primary">
                                        <MdClose className='w-6 h-6 text-[#CC3333]' />
                                    </IconButton>
                                </div>
                                <Divider />
                                <div className="flex justify-between pt-3">
                                    <Typography variant="subtitle1" className='text-[17px] font-bold'>{user?.displayName}</Typography>
                                    <span className="badge bg-[#CC3333] text-white">New</span>
                                </div>
                                <List>
                                    {user &&
                                        <ListItem button component={Link} to='/dashboard/adminHome' onClick={closeDrawer}>
                                            <ListItemIcon><DashboardIcon fontSize='small' /></ListItemIcon>
                                            <ListItemText primary="Dashboard" />
                                        </ListItem>
                                    }
                                    <ListItem button component={Link} to='/' onClick={closeDrawer}>
                                        <ListItemIcon><RiHome3Line className='w-5 h-5' /></ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                    {/* <ListItem button component={Link} to='/myProfile' onClick={closeDrawer}>
                                        <ListItemIcon><CgProfile className='w-5 h-5' /></ListItemIcon>
                                        <ListItemText primary="My Profile" />
                                    </ListItem> */}
                                    <ListItem button onClick={handleLogOut} component={Link} to='/login'>
                                        <ListItemIcon><MdExitToApp className='w-5 h-5' /></ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </List>
                            </div>
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;