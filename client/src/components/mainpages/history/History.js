import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

export default function History() {
    const state = useContext(GlobalState);
    const [history, setHistory] = state.userAPI.history;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [userInfor] = state.userAPI.userInfor;

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get("/api/payment", {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                } else {
                    const res = await axios.get("/user/history", {
                        headers: { Authorization: token },
                    });
                    setHistory(res.data);
                }
            };
            getHistory();
        }
    }, [token, isAdmin, setHistory]);

    return (
        <>
            <div className="history-user">
                <h1>USER INFOR</h1>
                <dev>
                    <table>
                        <tbody>
                            <tr>
                                <td>Username:</td>
                                <td>{userInfor.name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{userInfor.email}</td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>{userInfor.gender}</td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>{userInfor.address}</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>{userInfor.phone}</td>
                            </tr>
                            <tr>
                                <td>Role:</td>
                                <td>
                                    {userInfor.position === 1
                                        ? "Admin"
                                        : "Customer"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </dev>
            </div>
            <div className="history-page">
                <h2>HISTORY</h2>
                <h3>You have {history.length} ordered</h3>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Date Of Purchased</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((items) => (
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>
                                        {new Date(
                                            items.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <Link to={`/history/${items._id}`}>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
