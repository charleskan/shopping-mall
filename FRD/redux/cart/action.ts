import { AppDispatch } from "../../src/app/store"
import { login } from "../auth/action"

export function loadedCart(productIds: number){
    return {
        type: '@@cart/LOADED_CART',
        productIds
    }
}


export function addToCart(productId: number){
    return {
        type: '@@cart/ADD_TO_CART',
        productId
    }
}


type LoadedCartAction = ReturnType<typeof loadedCart>
type AddToCartAction = ReturnType<typeof addToCart>
// type RemoveToCartAction = ReturnType<typeof removeToCart>

export type CartActions = LoadedCartAction | AddToCartAction

export function loadCart(){
    return async (dispatch:AppDispatch) => {
        const res = await fetch("http://localhost:8080/cart");
        if (res.headers.get("X-C21-TOKEN") !== null){
            localStorage.setItem("token", res.headers.get("X-C21-TOKEN")!);
        }
            const cart = await res.json();
            dispatch(loadedCart(cart.productIds));
        }
    }

    