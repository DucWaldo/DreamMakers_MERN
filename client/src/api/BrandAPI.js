import axios from "axios";
import React, { useState, useEffect } from "react";

export default function BrandAPI() {
    const [brand, setBrand] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getBrand = async () => {
            const res = await axios.get("/api/brand");
            setBrand(res.data);
        };
        getBrand();
    }, [callback]);
    return {
        brand: [brand, setBrand],
        callback: [callback, setCallback],
    };
}
