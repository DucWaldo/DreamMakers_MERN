import React from "react";
import { Link } from "react-router-dom";
import ButtonRender from "./ButtonRender";
import FormatVND from "../formater/FormatVND";

export default function ProductItem({
    product,
    isAdmin,
    deleteProduct,
    handleChecked,
}) {
    return (
        <div className="product_card">
            {isAdmin && (
                <input
                    type="checkbox"
                    checked={product.checked}
                    onChange={() => handleChecked(product._id)}
                ></input>
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
                <span>{FormatVND(product.price)}</span>
                <p>{product.title}</p>
            </div>
            <ButtonRender
                product={product}
                deleteProduct={deleteProduct}
            ></ButtonRender>
        </div>
    );
}
