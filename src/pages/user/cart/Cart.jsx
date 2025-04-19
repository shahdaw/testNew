import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export default function Cart() {

    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getCart = async () => {

        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get("https://ecommerce-node4.onrender.com/cart",

                {
                    headers: {
                        Authorization: `Tariq__${token}`,
                    }
                }


            );

            setCart(response.data.products);

            console.log(response.data.products);

        }

        catch (error) {
            console.log("error", error);
        }

        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getCart();
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    const incQty = async (productId) => {
        const token = localStorage.getItem("userToken");
        const response = await axios.patch("https://ecommerce-node4.onrender.com/cart/incraseQuantity",
            {
                productId: productId
            },

            {
                headers: {
                    Authorization: `Tariq__${token}`,
                }
            }
        );

        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.productId == productId) {
                    return { ...item, quantity: item.quantity + 1 };
                }

                return item;

            })

        });
    }

    return (
        <section className='cart'>
            <h2>Your Cart</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item =>
                        <tr key={item._id}>
                            <td><img src={item.details.mainImage.secure_url} width="50px" /></td>
                            <td>{item.details.name}</td>
                            <td>{item.details.finalPrice}$</td>
                            <td>
                                <Button onClick={() => incQty(item.productId)}>+</Button>
                                {item.quantity}
                                <Button>-</Button>
                            </td>

                            <td>{item.quantity * item.details.finalPrice}$</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </section>
    )
}
