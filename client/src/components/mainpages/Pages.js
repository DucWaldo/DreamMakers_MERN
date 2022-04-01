import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./products/Products";
import DetailProducts from "./detailProduct/DetailProduct";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Male from "./products/Male";
import Female from "./products/Female";
import NotFound from "./utils/not_found/NotFound";

import { GlobalState } from "../../GlobalState";

export default function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;

    return (
        <Routes>
            <Route path="/" element={<Products></Products>}></Route>
            <Route
                path="/detail/:id"
                element={<DetailProducts></DetailProducts>}
            ></Route>
            <Route path="/male" element={<Male></Male>}></Route>
            <Route path="/female" element={<Female></Female>}></Route>
            <Route
                path="/login"
                element={isLogged ? <NotFound></NotFound> : <Login></Login>}
            ></Route>
            <Route
                path="/register"
                element={
                    isLogged ? <NotFound></NotFound> : <Register></Register>
                }
            ></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
    );
}
