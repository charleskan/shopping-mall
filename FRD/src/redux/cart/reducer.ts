import produce from "immer";
import { LoadingState } from "../../models";
import { CartActions } from "./action";
import { CartState } from "./state";

const initialState: CartState = {
  productDetailIds: [],
  products: [],
  loading: LoadingState.NotLoaded
}

export function cartReducer(state: CartState = initialState, action: CartActions): CartState {
  switch (action.type) {
    case '@@cart/LOADED_CART':
      return {
        ...state,
        products: action.products,
        loading: LoadingState.Loaded,
      }
    case '@@cart/ADD_TO_CART':
      return {
        ...state,
        productDetailIds: [...state.productDetailIds, 
          { productId: action.productId, 
            colorId: action.colorId, 
            sizeId: action.sizeId }],
      };
    case '@@cart/REMOVE_FROM_CART':
      return produce(state, state => {
        const index = state.productDetailIds.
          findIndex(p => p.productId === action.productId)
        state.productDetailIds.splice(index, 1)
      });
  }
  return state;
}