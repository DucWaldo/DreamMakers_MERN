import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import FormatVND from "../utils/formater/FormatVND";

export default function HistoryDetail() {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history;
    const [historyDetail, setHistoryDetail] = useState([]);

    const params = useParams();
    useEffect(() => {
        if (params.id) {
            history.forEach((item) => {
                if (item._id === params.id) {
                    setHistoryDetail(item);
                }
            });
        }
    }, [params.id, history]);
    if (historyDetail.length === 0) {
        return null;
    }
    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date Of Purchased</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{historyDetail.name}</td>
                        <td>{historyDetail.email}</td>
                        <td>
                            {new Date(
                                historyDetail.createdAt
                            ).toLocaleDateString()}
                        </td>
                        <td>
                            {FormatVND(
                                historyDetail.cart.reduce((prev, item) => {
                                    return prev + item.price * item.quantity;
                                }, 0)
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table style={{ margin: "30px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {historyDetail.cart.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <img src={item.images.url} alt=""></img>
                            </td>
                            <td>{item.product_id}</td>
                            <td>{item.quantity}</td>
                            <td>{FormatVND(item.price * item.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
