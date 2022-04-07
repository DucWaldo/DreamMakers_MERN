import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "../icons/menu_black_24dp.svg";
import Close from "../icons/close_black_24dp.svg";
import Cart from "../icons/shopping_cart_black_24dp.svg";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header() {
    const state = useContext(GlobalState);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    const logoutUser = async () => {
        await axios.get("/user/logout");
        setIsAdmin(false);
        setIsLogged(false);
        localStorage.removeItem("firstLogin");
        window.location.href = "/";
    };

    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Create Product</Link>
                </li>
                <li>
                    <Link to="/brand">Brand</Link>
                </li>
            </>
        );
    };
    const loginRouter = () => {
        return (
            <>
                <li>
                    <Link to="/history">History</Link>
                </li>
                <li>
                    <Link to="/" onClick={logoutUser}>
                        Logout
                    </Link>
                </li>
            </>
        );
    };

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width={25}></img>
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">
                        {isAdmin ? "ADMIN PAGE" : "DREAM MAKERS X-WATCH"}
                    </Link>
                </h1>
            </div>
            <ul>
                <li>
                    <Link to="/">{isAdmin ? "Product" : "Shop"}</Link>
                </li>

                {isAdmin ? (
                    ""
                ) : (
                    <li>
                        <Link to="/male">Male</Link>
                    </li>
                )}
                {isAdmin ? (
                    ""
                ) : (
                    <li>
                        <Link to="/female">Female</Link>
                    </li>
                )}

                {isAdmin && adminRouter()}
                {isLogged ? (
                    loginRouter()
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}

                <li>
                    <img src={Close} alt="" width="30" className="menu"></img>
                </li>
            </ul>
            {isAdmin ? (
                ""
            ) : (
                <div className="cart-icon">
                    <span>
                        {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30"></img>
                    </Link>
                </div>
            )}
        </header>
    );
}
