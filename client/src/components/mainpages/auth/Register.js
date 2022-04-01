import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        address: "",
        phone: "",
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/user/register", { ...user });
            localStorage.setItem("firstLogin", true);
            window.location.href = "/";
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={user.name}
                    onChange={onChangeInput}
                ></input>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={user.email}
                    onChange={onChangeInput}
                ></input>
                <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={user.password}
                    onChange={onChangeInput}
                ></input>
                <select
                    name="gender"
                    id="gender"
                    required
                    value={user.gender}
                    onChange={onChangeInput}
                >
                    <option value="">--- Select Gender ---</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    name="address"
                    required
                    placeholder="Address"
                    value={user.address}
                    onChange={onChangeInput}
                ></input>
                <input
                    type="text"
                    name="phone"
                    required
                    placeholder="Phone"
                    value={user.phone}
                    onChange={onChangeInput}
                ></input>
                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}
