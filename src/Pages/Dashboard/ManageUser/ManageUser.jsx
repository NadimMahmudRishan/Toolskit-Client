import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    IconButton,
    Paper,
    Box,
    TableContainer,
} from '@mui/material';
import { useState } from "react";
import { PersonAdd } from '@mui/icons-material';
import Swal from "sweetalert2";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DashboardTitle from "../../../components/DashboardTitle/DashboardTitle";

const ManageUser = () => {
    const [axiosSecure] = useAxios();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMakeAdmin = (user) => {
        fetch(`https://toold-kit-server.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is now an Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleMakeUser = (user) => {
        fetch(`https://toold-kit-server.vercel.app/users/make-user/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${user.name} is now a regular user`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <Box sx={{ p: 2 }}>
            <DashboardTitle heading="MANAGE USERS" subHeading="Add New Product" route="Dashboard" />
            <Paper sx={{ overflow: 'hidden', boxShadow: 3, mt: 2 }}>
                <TableContainer
                    sx={{
                        width: {
                            xs: '335px',
                            sm: '350px',
                            md: '100%',
                        },
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Make Admin</TableCell>
                                <TableCell>Make User</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(user => (
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            {user.name} - <span style={{ fontWeight: 'bold', color: '#CC3333' }}>({user.role})</span>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleMakeAdmin(user)}>
                                                <VerifiedUserIcon style={{ color: user.role === 'admin' ? '#CC3333' : 'inherit' }} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleMakeUser(user)}>
                                                <PersonAdd style={{ color: user.role === 'user' ? '#CC3333' : 'inherit' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{ bgcolor: 'background.paper' }}
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ManageUser;
