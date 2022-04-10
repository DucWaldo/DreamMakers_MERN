import axios from "axios";
import React, { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";

export default function Brand() {
    const state = useContext(GlobalState);
    const [brands] = state.brandAPI.brand;
    const [brand, setBrand] = useState("");
    const [token] = state.token;
    const [callback, setCallback] = state.brandAPI.callback;
    const [onEdit, setOnEdit] = useState(false);
    const [id, setId] = useState("");

    const createBrand = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await axios.put(
                    `/api/brand/${id}`,
                    { name: brand },
                    {
                        headers: { Authorization: token },
                    }
                );
                alert(res.data.msg);
            } else {
                const res = await axios.post(
                    "/api/brand",
                    { name: brand },
                    {
                        headers: { Authorization: token },
                    }
                );
                alert(res.data.msg);
            }
            setOnEdit(false);
            setBrand("");
            setCallback(!callback);
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    const editBrand = async (id, name) => {
        setId(id);
        setBrand(name);
        setOnEdit(true);
    };

    const deleteBrand = async (id) => {
        try {
            if (window.confirm("Do you want to delete this brand")) {
                const res = await axios.delete(`/api/brand/${id}`, {
                    headers: { Authorization: token },
                });
                alert(res.data.msg);
                setCallback(!callback);
            }
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <div className="brand">
            <form onSubmit={createBrand}>
                <label htmlFor="brand">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={brand}
                    required
                    onChange={(e) => setBrand(e.target.value)}
                ></input>
                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
            <div className="col">
                {brands.map((brand) => (
                    <div className="row" key={brand._id}>
                        <p>{brand.name}</p>
                        <div>
                            <button
                                onClick={() => editBrand(brand._id, brand.name)}
                            >
                                Edit
                            </button>
                            <button onClick={() => deleteBrand(brand._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
