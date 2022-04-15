import axios from "axios";
import React, { useState, useEffect } from "react";

export default function UserAPI(token) {
    const [isLogged, setIsLogges] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [userInfor, setUserInfor] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get("/user/infor", {
                        headers: { Authorization: token },
                    });
                    setIsLogges(true);
                    setUserInfor(res.data);
                    if (res.data.position === 1) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                    setCart(res.data.cart);
                    //console.log(res);
                } catch (error) {
                    alert(error.response.data.msg);
                }
            };
            getUser();
        }
    }, [token]);

    const addCart = async (product) => {
        if (!isLogged) {
            return alert("Please Login To Continue Buying");
        }
        const check = cart.every((item) => {
            return item._id !== product._id;
        });
        if (check) {
            setCart([...cart, { ...product, quantity: 1 }]);
            await axios.patch(
                "/user/addcart",
                { cart: [...cart, { ...product, quantity: 1 }] },
                {
                    headers: { Authorization: token },
                }
            );
        } else {
            alert("This Product Has Been Added To Cart");
        }
    };

    return {
        isLogged: [isLogged, setIsLogges],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        userInfor: [userInfor, setUserInfor],
    };
}
