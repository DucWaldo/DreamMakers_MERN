import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

export default function Filter() {
    const state = useContext(GlobalState);
    const [brands] = state.brandAPI.brand;
    //const [products, setProducts] = state.productAPI.products;
    const [brand, setBrand] = state.productsAPI.brand;
    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;

    //console.log(brands);

    const handleBrand = (e) => {
        setBrand(e.target.value);
        setSearch("");
    };

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="brand" value={brand} onChange={handleBrand}>
                    <option value="">---All Products---</option>
                    {brands.map((brand) => (
                        <option value={"brand=" + brand.name} key={brand._id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>
            <input
                type="text"
                value={search}
                placeholder="Search something-->"
                onChange={(e) => setSearch(e.target.value)}
            ></input>
            <div className="row">
                <span>Sort by: </span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">---Newest---</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best Sales</option>
                    <option value="sort=-price">Price: Hight To Low</option>
                    <option value="sort=price">Price: Low To Hight</option>
                </select>
            </div>
        </div>
    );
}
