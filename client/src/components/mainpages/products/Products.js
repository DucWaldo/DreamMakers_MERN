import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filter from "../products/Filter";
import ShowMore from "./ShowMore";

export default function Products() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsAPI.callback;
    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    //console.log(products);

    const handleChecked = (id) => {
        products.forEach((product) => {
            if (product._id === id) {
                product.checked = !product.checked;
            }
        });
        setProducts([...products]);
    };

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true);
            const destroyImage = await axios.post(
                "/api/destroy",
                { public_id },
                {
                    headers: { Authorization: token },
                }
            );
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                Headers: { Authorization: token },
            });
            await destroyImage;
            await deleteProduct;
            setLoading(false);
            setCallback(!callback);
        } catch (error) {
            alert(error.response.data.msg);
        }
    };

    const checkAll = () => {
        products.forEach((product) => {
            product.checked = !isCheck;
        });
        setProducts([...products]);
        setIsCheck(!isCheck);
    };

    const deleteAll = () => {
        products.forEach((product) => {
            if (product.checked) {
                deleteProduct(product._id, product.images.public_id);
            }
        });
    };

    if (loading) {
        return (
            <div className="products">
                <Loading></Loading>
            </div>
        );
    }

    return (
        <>
            <div className="filter">
                <Filter></Filter>
            </div>
            {isAdmin && (
                <div className="delete-all">
                    <span>Select All</span>
                    <input
                        type="checkbox"
                        checked={isCheck}
                        onChange={checkAll}
                    ></input>
                    <button onClick={deleteAll}>Delete All</button>
                </div>
            )}
            <div className="products">
                {products.map((product) => {
                    return (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                            deleteProduct={deleteProduct}
                            handleChecked={handleChecked}
                        ></ProductItem>
                    );
                })}
            </div>
            <ShowMore></ShowMore>
            {products.length === 0 && <Loading></Loading>}
        </>
    );
}
