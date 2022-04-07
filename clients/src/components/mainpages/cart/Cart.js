import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";
export default function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);
    const [token] = state.token;

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);
            setTotal(total);
        };
        getTotal(total);
    }, [cart]);

    const addToCart = async (cart) => {
        await axios.patch(
            "/user/addcart",
            { cart },
            {
                headers: { Authorization: token },
            }
        );
    };

    const increment = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity += 1;
            }
        });
        setCart([...cart]);
        addToCart(cart);
    };

    const decrement = (id) => {
        cart.forEach((item) => {
            if (item._id === id) {
                item.quantity === 1
                    ? (item.quantity = 1)
                    : (item.quantity -= 1);
            }
        });
        setCart([...cart]);
        addToCart(cart);
    };

    const removeProduct = (id) => {
        if (window.confirm("Do you want to delete this product")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            });
            setCart([...cart]);
            addToCart(cart);
        }
    };
    const tranSuccess = async (payment) => {
        const { paymentID, address } = payment;

        await axios.post(
            "/api/payment",
            { cart, paymentID, address },
            {
                headers: { Authorization: token },
            }
        );

        setCart([]);
        addToCart([]);
        alert("You have successfully placed an order.");
    };

    if (cart.length === 0) {
        return (
            <h2 style={{ textAlign: "center", fontSize: "5rem" }}>
                Cart Empty
            </h2>
        );
    }
    return (
        <div className="cart-page">
            <table>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                {cart.map((product) => (
                    <tr key={product._id}>
                        <td>
                            <img src={product.images.url} alt=""></img>
                        </td>
                        <td>{product.product_id}</td>
                        <td>{product.price}</td>
                        <td>
                            <div className="amount">
                                <button onClick={() => decrement(product._id)}>
                                    -
                                </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}>
                                    +
                                </button>
                            </div>
                        </td>
                        <td>
                            <p>{product.price * product.quantity}</p>
                            <button onClick={() => removeProduct(product._id)}>
                                REMOVE
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
            <div class="total-price">
                <table>
                    <tr>
                        <td>Subtotal (VND)</td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>Subtotal (USD)</td>
                        <td>{(total / 23095).toFixed(2)}</td>
                    </tr>
                </table>
            </div>
            <div>
                <PaypalButton
                    total={(total / 23095).toFixed(2)}
                    tranSuccess={tranSuccess}
                ></PaypalButton>
            </div>
        </div>
    );
}
