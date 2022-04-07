import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";

export default function Products() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    //console.log(products)
    const getProducts = async () => {
        const res = await axios.get("/api/products");
        setProducts(res.data.products);
    };
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="products">
                {products.map((product) => {
                    return (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                        ></ProductItem>
                    );
                })}
            </div>
            {products.length === 0 && <Loading></Loading>}
        </>
    );
}
