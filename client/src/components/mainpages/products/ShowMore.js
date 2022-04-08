import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

export default function ShowMore() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;
    return (
        <div>
            {result < page * 12 ? (
                ""
            ) : (
                <button onClick={() => setPage(page + 1)}>Show More</button>
            )}
        </div>
    );
}
