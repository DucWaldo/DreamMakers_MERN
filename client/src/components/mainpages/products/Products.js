import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";

export default function Products() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsAPI.callback;
    //console.log(products)

    return (
        <>
            <div className="products">
                {products.map((product) => {
                    return (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                            token={token}
                            callback={callback}
                            setCallback={setCallback}
                        ></ProductItem>
                    );
                })}
            </div>
            {products.length === 0 && <Loading></Loading>}
        </>
    );
}
