import React from "react";
import { Link } from "react-router-dom";
import ButtonRender from "./ButtonRender";

export default function ProductItem({ product, isAdmin }) {
    return (
        <div className="product_card">
            {isAdmin && (
                <input type="checkbox" checked={product.checked}></input>
            )}
            <img src={product.images.url} alt=""></img>
            <div className="product_box">
                <Link to={`/detail/${product._id}`}>
                    <h2 title={product.product_id}>{product.product_id}</h2>
                </Link>
                <span>{product.price} vnd</span>
                <p>{product.title}</p>
            </div>
            <ButtonRender product={product}></ButtonRender>
        </div>
    );
}
