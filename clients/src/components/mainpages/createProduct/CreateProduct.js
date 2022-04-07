import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

const initoalState = {
    product_id: "",
    price: 0,
    title: "",
    brand: "",
    origin: "",
    gender: "",
    glass: "",
    insurance: "",
    waterproof: "",
    _id: "",
};

export default function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initoalState);
    const [brands] = state.brandAPI.brand;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const history = useNavigate();
    const param = useParams();
    const [products] = state.productsAPI.products;
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        if (param.id) {
            products.forEach((product) => {
                if (product._id === param.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            });
        } else {
            setOnEdit(false);
            setProduct(initoalState);
            setImages(false);
        }
    }, [param.id, products]);

    const styleUpload = {
        display: images ? "block" : "none",
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) {
                return alert("You are not an admin");
            }
            const file = e.target.files[0];
            if (!file) {
                return alert("File not exist");
            }
            if (file.size > 1024 * 1024) {
                return alert("Size too large");
            }
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                return alert("File format is incorrect");
            }
            let formData = new FormData();
            formData.append("file", file);
            setLoading(true);
            const res = await axios.post("/api/upload", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: token,
                },
            });
            setLoading(false);
            setImages(res.data);
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    const handleDestroy = async () => {
        try {
            if (!isAdmin) {
                return alert("You are not admin");
            }
            setLoading(true);
            await axios.post(
                "/api/destroy",
                { public_id: images.public_id },
                {
                    headers: { Authorization: token },
                }
            );
            setLoading(false);
            setImages(false);
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin) {
                return alert("You are not an admin");
            }
            if (!images) {
                return alert("No image upload");
            }
            await axios.post(
                "/api/products",
                { ...product, images },
                {
                    headers: { Authorization: token },
                }
            );
            setImages(false);
            setProduct(initoalState);
            history.push("/");
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    return (
        <div className="create_product">
            <div className="upload">
                <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={handleUpload}
                ></input>
                {loading ? (
                    <div id="file_img">
                        <Loading></Loading>
                    </div>
                ) : (
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ""} alt=""></img>
                        <span onClick={handleDestroy}>Delete</span>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input
                        type="text"
                        name="product_id"
                        id="product_id"
                        required
                        value={product.product_id}
                        onChange={handleChangeInput}
                        disabled={onEdit}
                    ></input>
                </div>
                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        value={product.price}
                        onChange={handleChangeInput}
                    ></input>
                </div>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <textarea
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={product.title}
                        rows="5"
                        onChange={handleChangeInput}
                    ></textarea>
                </div>
                <div className="row">
                    <label htmlFor="brand">Brand</label>
                    <select
                        name="brand"
                        value={product.brand}
                        onChange={handleChangeInput}
                    >
                        <option value="">--- Select Brand ---</option>
                        {brands.map((brand) => (
                            <option value={brand.name} key={brand._id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    <label htmlFor="origin">Origin</label>
                    <input
                        type="text"
                        name="origin"
                        id="origin"
                        required
                        value={product.origin}
                        onChange={handleChangeInput}
                    ></input>
                </div>
                <div className="row">
                    <label htmlFor="brand">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        required
                        value={product.gender}
                        onChange={handleChangeInput}
                    >
                        <option value="">--- Select Gender ---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="row">
                    <label htmlFor="glass">Glass</label>
                    <input
                        type="text"
                        name="glass"
                        id="glass"
                        required
                        value={product.glass}
                        onChange={handleChangeInput}
                    ></input>
                </div>
                <div className="row">
                    <label htmlFor="insurance">Insurance</label>
                    <input
                        type="text"
                        name="insurance"
                        id="insurance"
                        required
                        value={product.insurance}
                        onChange={handleChangeInput}
                    ></input>
                </div>
                <div className="row">
                    <label htmlFor="waterproof">Waterproof</label>
                    <input
                        type="text"
                        name="waterproof"
                        id="waterproof"
                        required
                        value={product.waterproof}
                        onChange={handleChangeInput}
                    ></input>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
