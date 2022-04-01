import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";

export default function Female() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    //console.log(products)

    return (
        <>
            <div className="products">
                {products.map((product) => {
                    return product.gender === "Female" ? (
                        <ProductItem
                            key={product._id}
                            product={product}
                        ></ProductItem>
                    ) : null;
                })}
            </div>
            {products.length === 0 && <Loading></Loading>}
        </>
    );
}
