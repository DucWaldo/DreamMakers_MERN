import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

export default function ButtonRender({ product }) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;
    return (
        <div className="row_button">
            {isAdmin ? (
                <>
                    <Link id="button_buy" to="#">
                        Delete
                    </Link>
                    <Link id="button_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        id="button_buy"
                        to="#!"
                        onClick={() => addCart(product)}
                    >
                        Buy
                    </Link>
                    <Link id="button_view" to={`/detail/${product._id}`}>
                        View
                    </Link>
                </>
            )}
        </div>
    );
}
