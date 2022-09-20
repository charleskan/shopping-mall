import axios from "axios";
import { AppDispatch } from "../../store"
import { checkResponse, loggedIn, logIn } from "../auth/action"


export function loadedCart(products: []) {
    return {
        type: '@@cart/LOADED_CART' as const,
        products
    }
}

// export function addToCart(products: number) {
//     return {
//         type: '@@cart/ADD_TO_CART' as const,
//         productId
//     }
// }

// export function removeFromCart(products: number) {
//     return {
//       type: '@@cart/REMOVE_FROM_CART' as const,
//       productId
//     }
//   }



type LoadedCartAction = ReturnType<typeof loadedCart>
// type AddToCartAction = ReturnType<typeof addToCart>
// type RemoveToCartAction = ReturnType<typeof removeFromCart>

export type CartActions = LoadedCartAction
// export type CartActions = LoadedCartAction | AddToCartAction | RemoveToCartAction

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

// export function fetchAddToCart(productId: number) {
//     return async (dispatch: AppDispatch) => {
//         dispatch(addToCart(productId))

//         try {
//             const res = await axios.post(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/cart`, {
//                 productId: productId
//             })
//             dispatch(checkResponse(res))
//         } catch (e) {
//             dispatch(removeFromCart(productId));
//             dispatch(loadCart())
//         }
//     }
// }