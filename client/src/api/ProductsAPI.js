import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsAPI() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const [brand, setBrand] = useState("");
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(
                `/api/products?limit=${
                    page * 9
                }&${brand}&${sort}&title[regex]=${search}`
            );
            setProducts(res.data.products);
            setResult(res.data.result);
        };
        getProducts();
    }, [callback, brand, sort, search, page]);

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        brand: [brand, setBrand],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
    };
}
