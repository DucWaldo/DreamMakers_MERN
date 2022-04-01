import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";

export default function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [detailProduct, setDetailProduct] = useState([]);
    useEffect(() => {
        if (params) {
            products.forEach((product) => {
                if (product._id === params.id) {
                    setDetailProduct(product);
                }
            });
        }
    }, [params, products]);
    console.log(detailProduct);
    if (detailProduct.length === 0) {
        return null;
    }
    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt=""></img>
                <div className="box_detail">
                    <h2>{detailProduct.product_id}</h2>
                    <h4>{detailProduct.title}</h4>
                    <span>Giá bán: {detailProduct.price} vnd</span>
                    <p>Thương hiệu: {detailProduct.brand}</p>
                    <p>Xuất sứ: {detailProduct.origin}</p>
                    <p>Giới tính: {detailProduct.gender}</p>
                    <p>Mặt kính: {detailProduct.glass}</p>
                    <p>Bảo hành: {detailProduct.insurance}</p>
                    <p>Chống nước: {detailProduct.waterproof}</p>
                    <p>Số lượng bán: {detailProduct.sold}</p>
                    <Link to="/cart" className="cart">
                        Add to cart
                    </Link>
                </div>
            </div>
            <div>
                <h2>Gợi ý sản phẩm cùng nhãn hiệu</h2>
                <div className="products">
                    {products.map((product) => {
                        return product.brand === detailProduct.brand &&
                            product.product_id !== detailProduct.product_id ? (
                            <ProductItem
                                key={product._id}
                                product={product}
                            ></ProductItem>
                        ) : null;
                    })}
                </div>
            </div>
        </>
    );
}
