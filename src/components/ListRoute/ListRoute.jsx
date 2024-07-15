import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Link } from "react-router-dom";
// import DashboardIcon from '@mui/icons-material/Dashboard';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import useAdmin from "../../hooks/useAdmin";

const ListRoute = () => {
    const [isAdmin] = useAdmin()
    return (
        <List>
            {isAdmin && (
                <>
                    {/* <ListItem title="Dashboard Home" disablePadding>
                        <ListItemButton
                            sx={{
                                color: location.pathname === '/dashboard/dashboardHome' ? '#CC3333' : 'inherit',
                                justifyContent: open ? 'initial' : 'center',
                            }}
                            component={Link}
                            to="/dashboard/dashboardHome"
                            selected={location.pathname === '/dashboard/dashboardHome'}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 4 : 'auto',
                                    color: open ? 'inherit' : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <DashboardIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard Home" />
                        </ListItemButton>
                    </ListItem> */}
                    {/* <Divider sx={{ backgroundColor: 'black' }} /> */}
                    <ListItem title="Admin Home" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/dashboard/adminHome"
                            selected={location.pathname === '/dashboard/adminHome'}
                            sx={{
                                color: location.pathname === '/dashboard/adminHome' ? '#CC3333' : 'inherit',
                                justifyContent: open ? 'initial' : 'center',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 4 : 'auto',
                                    color: open ? 'inherit' : 'auto',
                                    justifyContent: 'center'
                                }}>
                                <AddHomeIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Admin Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem title="Manage User" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/dashboard/manageUsers"
                            selected={location.pathname === '/dashboard/manageUsers'}
                            sx={{
                                color: location.pathname === '/dashboard/manageUsers' ? '#CC3333' : 'inherit',
                                justifyContent: open ? 'initial' : 'center',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 4 : 'auto',
                                    color: open ? 'inherit' : 'auto',
                                    justifyContent: 'center'
                                }}>
                                <ManageAccountsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Manage User" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem title="Add Product" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/dashboard/addProduct"
                            selected={location.pathname === '/dashboard/addProduct'}
                            sx={{
                                color: location.pathname === '/dashboard/addProduct' ? '#CC3333' : 'inherit',
                                justifyContent: open ? 'initial' : 'center',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 4 : 'auto',
                                    color: open ? 'inherit' : 'auto',
                                    justifyContent: 'center'
                                }}>
                                <AddShoppingCartIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Add Product" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem title="Manage Product" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/dashboard/manageProduct"
                            selected={location.pathname === '/dashboard/manageProduct'}
                            sx={{
                                color: location.pathname === '/dashboard/manageProduct' ? '#CC3333' : 'inherit',
                                justifyContent: open ? 'initial' : 'center',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 4 : 'auto',
                                    color: open ? 'inherit' : 'auto',
                                    justifyContent: 'center'
                                }}>
                                <ManageSearchIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Manage Product" />
                        </ListItemButton>
                    </ListItem>
                </>
            )}
        </List>

    );
};

export default ListRoute;
