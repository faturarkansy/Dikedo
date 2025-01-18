import React, { useContext } from "react";
import { CartContext } from "../features/ContextProvider";

const CartItem = ({ product }) => {
    const { cart, dispatch } = useContext(CartContext)
    const Increase = (id) => {
        const Index = cart.findIndex(p => p.id === id)
        if (cart[Index].quantity < 10) {
            dispatch({ type: "Increase", id })
        }
    };
    const Decrease = (id) => {
        const Index = cart.findIndex(p => p.id === id)
        if (cart[Index].quantity < 10) {
            dispatch({ type: "Decrease", id })
        }
    };
    return (
        <div className="flex items-center justify-between mb-4 border-b pb-4">
            <div className="flex items-center">
                <img
                    src={product.images}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg mr-4"
                />
                <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">Set: Colour Coffee</p>
                </div>
            </div>
            <div className="flex items-center">
                <button className="px-2 py-1 border rounded" onClick={() => Decrease(product.id)}>-</button>
                <span className="mx-2">{product.quantity}</span>
                <button className="px-2 py-1 border rounded" onClick={() => Increase(product.id)}>+</button>
            </div>
            <p className="font-semibold">{product.price}</p>
            <div className="flex items-center">
                <button className="px-2 py-1 border rounded">Remove</button>
            </div>
            <button className="text-red-500 hover:text-red-700">
                <i className="fas fa-trash-alt"></i>
            </button>
        </div>
    )
}

export default CartItem