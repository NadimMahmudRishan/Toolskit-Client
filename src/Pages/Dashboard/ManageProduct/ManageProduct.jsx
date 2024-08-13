import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import DashboardTitle from '../../../components/DashboardTitle/DashboardTitle';

const headCells = [
    { id: 'product_image', numeric: false, disablePadding: true, label: 'Image' },
    { id: 'product_name', numeric: false, disablePadding: true, label: 'Product Name' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
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
                        inputProps={{ 'aria-label': 'select all products' }}
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
    const { numSelected, onSearchChange } = props;

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
                    Products
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={props.onDeleteAll}>
                        <DeleteIcon color='error' />
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <TextField
                        label="Search Products"
                        variant="outlined"
                        size="small"
                        onChange={onSearchChange}
                        sx={{ mr: 2 }}
                    />
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onDeleteAll: PropTypes.func.isRequired,
};

const ManageProduct = () => {
    const [axiosSecure] = useAxios();
    const { data: collection = [], refetch, isLoading, isError } = useQuery({
        queryKey: ['collection'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/collection`);
                return res.data;
            } catch (error) {
                throw new Error(error.response.data.message);
            }
        },
    });

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('product_name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = collection.map((n) => n._id);
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

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/delete-product/${id}`);
                    setSnackbarMessage('Item deleted successfully.');
                    setSnackbarOpen(true);
                    refetch();
                } catch (error) {
                    console.error('Error deleting product:', error);
                }
            }
        });
    };

    const handleDeleteAll = async () => {
        setOpenConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await Promise.all(selected.map(id => axiosSecure.delete(`/delete-product/${id}`)));
            setSnackbarMessage('Items deleted successfully.');
            setSnackbarOpen(true);
            setSelected([]);
            refetch();
        } catch (error) {
            console.error('Error deleting products:', error);
        }
        setOpenConfirmDialog(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCollection = collection.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <Box sx={{ p: 2 }}>
            <DashboardTitle heading="MANAGE PRODUCT" subHeading="Manage Product" route="Dashboard" />
            <Paper sx={{ width: '100%', mt: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onSearchChange={handleSearchChange}
                    onDeleteAll={handleDeleteAll}
                />
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                        <CircularProgress />
                    </Box>
                ) : isError ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                        <Typography variant="h6" color="error">Error loading data</Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredCollection.length}
                            />
                            <TableBody>
                                {stableSort(filteredCollection, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row._id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="error"
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    <img src={row.images[0]} alt={row.product_name} width="50" height="50" />
                                                </TableCell>
                                                <TableCell align="left">{row.product_name}</TableCell>
                                                <TableCell align="right">{row.price}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton onClick={() => handleDelete(row._id)} color="error">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {/* {emptyRows > 0 && (
                                    <TableRow style={{ height: (53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filteredCollection.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete the selected items?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ManageProduct;
