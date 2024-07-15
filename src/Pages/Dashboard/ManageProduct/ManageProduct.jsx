import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    IconButton,
    Checkbox,
    Button // Import Button from MUI
} from '@mui/material';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

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
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://toold-kit-server.vercel.app/delete-product/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                            refetch();
                        }
                    });
            }
        });
    };

    const handleCheckboxChange = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allIds = collection.map(item => item._id);
            setSelectedItems(allIds);
        }
        setSelectAll(!selectAll);
    };

    const handleDeleteAll = () => {
        // Delete all selected items
        if (selectedItems.length > 0) {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete all!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Perform delete operation for all selected items
                    Promise.all(selectedItems.map(id => {
                        return fetch(`https://toold-kit-server.vercel.app/delete-product/${id}`, {
                            method: 'DELETE'
                        }).then(res => res.json());
                    })).then(results => {
                        const deletedCount = results.reduce((total, result) => total + result.deletedCount, 0);
                        if (deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'All selected items have been deleted.',
                                'success'
                            );
                            // Refetch data after deletion
                            refetch();
                            // Clear selected items
                            setSelectedItems([]);
                            // Unselect all checkbox
                            setSelectAll(false);
                        }
                    });
                }
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError.message}</div>;

    return (
        <div className="p-4 min-h-screen">
            <div className="bg-white mb-3 px-4 py-1">
                <h1 className="text-xl font-bold">Manage Users</h1>
                <p>Total user: <span className="font-bold">{collection?.length}</span></p>
            </div>
            <Table>
                <TableHead sx={{ backgroundColor: 'white' }}>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                checked={selectAll}
                                onChange={handleSelectAll}
                                indeterminate={selectedItems.length > 0 && selectedItems.length < collection.length}
                            />
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: 'white' }}>
                    {collection
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(data => (
                            <TableRow key={data._id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedItems.includes(data._id)}
                                        onChange={() => handleCheckboxChange(data._id)}
                                    />
                                </TableCell>
                                <TableCell>{data.product_name}</TableCell>
                                <TableCell>{data.price}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(data._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
                <div className="my-2">
                    {selectedItems.length > 0 && (
                        <Button variant="contained" color="error" onClick={handleDeleteAll}>
                            Delete All Selected
                        </Button>
                    )}
                </div>
            <TablePagination
                sx={{ backgroundColor: 'white' }}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={collection.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default ManageProduct;
