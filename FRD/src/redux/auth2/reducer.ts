import { AuthActions2 } from "./action";
import { AuthState2 } from "./state";

const initialState: AuthState2 = {
  token2: null
}



export function authReducer2(state: AuthState2 = initialState, action: AuthActions2): AuthState2 {
  switch (action.type) {
    case '@@auth2/LOGIN_SUCCEEDED':
      return {
        ...state,
        token2: action.token2
      }
    case '@@auth2/LOGOUT_SUCCEEDED':
      return {
        ...state,
        token2: null
      }
  }

  return state;
}