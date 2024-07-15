import { useState, } from 'react';
import useCart from "../../hooks/useCart";
import { Table, TableHead, TableBody, TableRow, TableCell, TablePagination, IconButton, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
    const [carts, refetch, isLoading] = useCart();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [quantities, setQuantities] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const Shipping = 25;
    const [total, setTotal] = useState(subtotal + Shipping);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://toold-kit-server.vercel.app/carts/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    const handleQuantityChange = (id, event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: newQuantity
        }));
        updateCart(id, newQuantity);
        calculateSubtotal();
    };

    const updateCart = (id, quantity) => {
        fetch(`https://toold-kit-server.vercel.app/carts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error updating cart:', error);
            });
    };

    const handleIncrement = (id, quantity) => {
        const currentQuantity = (quantity || 1) + 1;
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: currentQuantity
        }));
        updateCart(id, currentQuantity);
    };

    const handleDecrement = (id, quantity) => {
        const currentQuantity = Math.max((quantity || 1) - 1, 1);
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: currentQuantity
        }));
        updateCart(id, currentQuantity);
    };

    const calculateSubtotal = () => {
        let newSubtotal = 0;
        carts.forEach(cartItem => {
            const itemQuantity = quantities[cartItem._id] || cartItem.quantity || 1;
            newSubtotal += cartItem.price * itemQuantity;
        });
        setSubtotal(newSubtotal);
        setTotal(newSubtotal + Shipping);
    };

    return (
        <div className="mx-40 my-10">
            <h1 className="text-4xl font-bold pb-5">Shopping Cart</h1>
            <Table>
                <TableHead sx={{ backgroundColor: 'white' }}>
                    <TableRow className='bg-base-200'>
                        <TableCell>Images</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: 'white' }}>
                    {isLoading ? (
                        // Skeleton Loading while data is loading
                        Array.from(new Array(rowsPerPage)).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton variant="rectangular" width={50} height={50} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton />
                                </TableCell>
                                <TableCell>
                                    <Skeleton />
                                </TableCell>
                                <TableCell>
                                    <Skeleton />
                                </TableCell>
                                <TableCell>
                                    <Skeleton />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        // Render actual cart items when data is loaded
                        carts && carts.length > 0 ?
                            carts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((cartItem) => (
                                    <TableRow key={cartItem._id}>
                                        <TableCell>
                                            <img src={cartItem.images[0]} alt={cartItem.product_name} style={{ width: "50px", height: "50px" }} />
                                        </TableCell>
                                        <TableCell>{cartItem.product_name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <button className="px-2 py-1 border border-gray-300 rounded-l" onClick={() => handleDecrement(cartItem._id, cartItem.quantity)}>-</button>
                                                <input
                                                    defaultValue={cartItem.quantity}
                                                    type="number"
                                                    className="w-16 px-2 py-1 text-center border-t border-b border-gray-300"
                                                    value={quantities[cartItem._id] || cartItem.quantity || 1}
                                                    onChange={(event) => handleQuantityChange(cartItem._id, event)}
                                                    min="1"
                                                />
                                                <button className="px-2 py-1 border border-gray-300 rounded-r" onClick={() => handleIncrement(cartItem._id, cartItem.quantity)}>+</button>
                                            </div>
                                        </TableCell>
                                        <TableCell>${(cartItem.price * (quantities[cartItem._id] || cartItem.quantity || 1)).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDelete(cartItem._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                <TableRow>
                                    <TableCell colSpan={5}>No items in the cart</TableCell>
                                </TableRow>
                            )
                    )}
                </TableBody>

            </Table>
            <TablePagination
                sx={{ backgroundColor: 'white' }}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={carts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div className='lg:my-16'>
                <div>
                    <div className="card-body lg:w-[450px] w-96 mx-auto border-2 p-10">
                        <h3 className="card-title">Your Order Summary</h3>
                        <table className="table table-md">
                            <tbody className="cart__totals-body">
                                <tr>
                                    <th>Subtotal</th>
                                    <td>${subtotal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td>${Shipping}</td>
                                </tr>
                                <tr>
                                    <th>Tax</th>
                                    <td>$0.00</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>${total.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-muted"><span className='text-[#CC3333]'>* </span>Shipping costs may vary based on location.</p>
                        <Link to='/checkOut' className="btn bg-[#CC3333] hover:bg-[#CC3333] btn-xl btn-block text-white rounded-sm">Proceed to Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
