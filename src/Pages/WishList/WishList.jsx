import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, IconButton, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useWishList from "../../hooks/useWishList";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const WishList = () => {
    const { user } = useAuth();
    const [products, refetch] = useWishList();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
                fetch(`http://localhost:5000/delete-product/wishList/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
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


    const handleAddToCart = (data) => {
        const saveData = {
            product_name: data.product_name,
            price: data.price,
            images: data.images,
            email: user?.email,
            userName: user?.displayName
        }
        fetch('http://localhost:5000/carts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `'${saveData.product_name}' added on the cart.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }


    return (
        <div className="mx-40 my-10">
            <h1>This is WishList</h1>
            <Table>
                <TableHead sx={{ backgroundColor: 'white' }}>
                    <TableRow>
                        <TableCell>Images</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: 'white' }}>
                    {products
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(data => (
                            <TableRow key={data._id}>
                                <TableCell>
                                    <img src={data.images[0]} alt={data.name} style={{ width: "50px", height: "50px" }} />
                                </TableCell>
                                <TableCell>{data.product_name}</TableCell>
                                <TableCell>{data.price}</TableCell>
                                <TableCell>
                                    <Button type="submit"
                                        variant="contained"
                                        sx={{
                                            bgcolor: "#CC3333",
                                            '&:hover': {
                                                bgcolor: "#CC3333"
                                            }
                                        }}
                                        onClick={() => handleAddToCart(data)}
                                    >
                                        Add to Cart
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(data._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                sx={{ backgroundColor: 'white' }}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default WishList;
