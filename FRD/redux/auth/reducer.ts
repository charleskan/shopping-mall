import { AuthActions } from "./action";

export interface AuthState {
  nickname: string | null;
  loggedIn: boolean | null;
  token : string |null;
}

const initialState: AuthState = {
  nickname: null,
  loggedIn: null,
  token : null
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case '@@auth/LOGGED_IN':
      return {
        ...state,
        nickname: action.nickname,
        token :action.token,
        loggedIn: true
      };
    case '@@auth/LOGGED_OUT':
      return {
        ...state,
        nickname: null,
        token:null,
        loggedIn: false
      }
    default: 
      return state;
  }
}