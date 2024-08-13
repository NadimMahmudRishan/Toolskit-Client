import { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Checkbox,
    IconButton,
    Tooltip,
    Snackbar,
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress
} from '@mui/material';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';

const headCells = [
    { id: 'displayName', numeric: false, disablePadding: true, label: 'User Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="error"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all users' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, onSearch, searchTerm } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.error.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <TextField
                label="Search by User Name"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={onSearch}
                sx={{

                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'default',
                        },
                        '&:hover fieldset': {
                            borderColor: '#CC3333',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#CC3333',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'default',
                    },
                    '&:hover .MuiInputLabel-root': {
                        color: '#CC3333',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#CC3333',
                    },
                    mr: 2
                }}
            />

            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="error"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Users
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon color='error' />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSearch: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
};

const ManageUser = () => {
    const [axiosSecure] = useAxios();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosSecure.get('/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [axiosSecure]);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('displayName');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = users.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (id) => selected.indexOf(id) !== -1;

    const filteredUsers = users.filter(user =>
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMakeAdmin = async (userId) => {
        try {
            await axiosSecure.patch(`/users/make-admin/${userId}`);
            setSnackbarMessage('User has been promoted to Admin');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Failed to promote user');
            setSnackbarOpen(true);
        }
    };

    const handleMakeUser = async (userId) => {
        try {
            await axiosSecure.patch(`/users/make-user/${userId}`);
            setSnackbarMessage('User has been demoted to User');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Failed to demote user');
            setSnackbarOpen(true);
        }
    };

    const handleEnableUser = async (userId) => {
        try {
            axiosSecure.patch(`/users/${userId}/enable`);
            setSnackbarMessage('User has been enabled');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Failed to enable user');
            setSnackbarOpen(true);
        }
    };

    const handleDisableUser = async (userId) => {
        try {
            axiosSecure.patch(`/users/${userId}/disable`);
            setSnackbarMessage('User has been disabled');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Failed to disable user');
            setSnackbarOpen(true);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axiosSecure.delete(`/users/delete/${selectedUserId}`);
            setSnackbarMessage('User has been deleted');
            setSnackbarOpen(true);
            setOpenConfirmDialog(false);
        } catch (error) {
            setSnackbarMessage('Failed to delete user');
            setSnackbarOpen(true);
            setOpenConfirmDialog(false);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <DashboardTitle heading="MANAGE USER" subHeading="Manage User" route="Dashboard" />
            <Paper sx={{ width: '100%', mt: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onSearch={handleSearchChange}
                    searchTerm={searchTerm}
                />
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredUsers.length}
                            />
                            <TableBody>
                                {stableSort(filteredUsers, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => {
                                        const isItemSelected = isSelected(user._id);
                                        return (
                                            <TableRow
                                                hover

                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={user._id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="error"
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': user._id }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={user._id} scope="row" padding="none">
                                                    {user.displayName}
                                                </TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role}</TableCell>
                                                <TableCell>{user.disabled ? 'Disabled' : 'Active'}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() =>
                                                            user.role === 'user'
                                                                ? handleMakeAdmin(user._id)
                                                                : handleMakeUser(user._id)
                                                        }
                                                        variant="contained"
                                                        color={user.role === 'user' ? 'primary' : 'secondary'}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        {user.role === 'user' ? 'Make Admin' : 'Make User'}
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            user.disabled
                                                                ? handleEnableUser(user._id)
                                                                : handleDisableUser(user._id)
                                                        }
                                                        variant="contained"
                                                        color={user.disabled ? 'success' : 'warning'}
                                                        sx={{ mr: 1 }}
                                                    >
                                                        {user.disabled ? 'Enable' : 'Disable'}
                                                    </Button>
                                                    <IconButton
                                                        onClick={() => setOpenConfirmDialog(true) || setSelectedUserId(user._id)}
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                aria-labelledby="confirm-dialog-title"
            >
                <DialogTitle id="confirm-dialog-title">
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteUser} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ManageUser;
