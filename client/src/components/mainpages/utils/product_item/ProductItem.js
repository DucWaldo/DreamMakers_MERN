import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ButtonRender from "./ButtonRender";

export default function ProductItem({
    product,
    isAdmin,
    token,
    callback,
    setCallback,
}) {
    const deleteProduct = async () => {
        try {
            const destroyImage = await axios.post(
                "/api/destroy",
                { public_id: product.images.public_id },
                {
                    headers: { Authorization: token },
                }
            );
            const deleteProduct = axios.delete(`/api/products/${product._id}`, {
                Headers: { Authorization: token },
            });
            await destroyImage;
            await deleteProduct;
            setCallback(!callback);
        } catch (error) {
            alert("abc" + error.response.data.msg);
        }
    };

    return (
        <div className="product_card">
            {isAdmin && (
                <input type="checkbox" checked={product.checked}></input>
            )}
            <img src={product.images.url} alt=""></img>
            <div className="product_box">
                {isAdmin ? (
                    <Link to={`/edit_product/${product._id}`}>
                        <h2 title={product.product_id}>{product.product_id}</h2>
                    </Link>
                ) : (
                    <Link to={`/detail/${product._id}`}>
                        <h2 title={product.product_id}>{product.product_id}</h2>
                    </Link>
                )}

                <span>{product.price} vnd</span>
                <p>{product.title}</p>
            </div>
            <ButtonRender
                product={product}
                deleteProduct={deleteProduct}
            ></ButtonRender>
        </div>
    );
}
