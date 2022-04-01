import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
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

    const addToCart = async () => {
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
        addToCart();
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
        addToCart();
    };

    const removeProduct = (id) => {
        if (window.confirm("Do you want to delete this product")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            });
            setCart([...cart]);
            addToCart();
        }
    };

    if (cart.length === 0) {
        return (
            <h2 style={{ textAlign: "center", fontSize: "5rem" }}>
                Cart Empty
            </h2>
        );
    }
    return (
        <div class="small-container cart-page">
            <table>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                {cart.map((product) => (
                    <tr key={product._id}>
                        <td>
                            <div class="cart-info">
                                <img src={product.images.url} alt=""></img>
                                <div class="item-info">
                                    <p>{product.product_id}</p>
                                </div>
                            </div>
                        </td>
                        <td>{product.price}</td>
                        <td>
                            <div className="amount">
                                <button onClick={() => decrement(product._id)}>
                                    {" "}
                                    -{" "}
                                </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}>
                                    {" "}
                                    +{" "}
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
                        <td>Subtotal</td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>- 0</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{total}</td>
                    </tr>
                </table>
            </div>
            <div>
                <button type="submit" class="btnBuy">
                    Go to checkout
                </button>
            </div>
        </div>
    );
}
