import axios from "axios";
import { AppDispatch } from "../../store"
import { checkResponse, loggedIn, logIn } from "../auth/action"


export function loadedCart(products: []) {
    return {
        type: '@@cart/LOADED_CART' as const,
        products
    }
}

export function addToCart(
    productId: number,
    colorId: number,
    sizeId: number) {
    return {
        type: '@@cart/ADD_TO_CART' as const,
        productId,
        colorId,
        sizeId
    }
}

export function removeFromCart(productId: number) {
    return {
        type: '@@cart/REMOVE_FROM_CART' as const,
        productId
    }
}



type LoadedCartAction = ReturnType<typeof loadedCart>
type AddToCartAction = ReturnType<typeof addToCart>
type RemoveToCartAction = ReturnType<typeof removeFromCart>

// export type CartActions = LoadedCartAction | AddToCartAction 
export type CartActions = LoadedCartAction | AddToCartAction | RemoveToCartAction

export function loadCart() {
    return async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/cart`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
            const data = await res.json()

            if (res.status === 401) {
                dispatch(logIn(data))
                // dispatch(checkResponse(data))
            } else {
                dispatch(loadedCart(data.productRecord))
            }
        } catch {
            dispatch(loadCart())
        }

    }
}

export function fetchAddToCart(
    productId: number,
    colorId: number,
    sizeId: number,
) {
    return async (dispatch: AppDispatch) => {
        dispatch(addToCart(productId,
            colorId,
            sizeId))

        try {
            // const res = await axios.post(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/cart`, {
            //     productId: productId,
            //     colorId: colorId,
            //     sizeId: sizeId
            // })
            const res = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/cart/${productId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        productId,
                        colorId,
                        sizeId,
                    })
                })
                console.log(res);
                
            const data = await res.json()

            if (res.status === 401) {
                dispatch(logIn(data))
            }

            // dispatch(checkResponse(data))
        } catch (e) {
            // dispatch(removeFromCart(productId));
            dispatch(loadCart())
        }
    }
}