import { AuthActions } from "./action";

export interface AuthState {
  nickname: string | null;
  loggedIn: boolean | null;
}

const initialState: AuthState = {
  nickname: null,
  loggedIn: null
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case '@@auth/LOGGED_IN':
      return {
        ...state,
        nickname: action.nickname,
        loggedIn: true
      };
    case '@@auth/LOGGED_OUT':
      return {
        ...state,
        nickname: null,
        loggedIn: false
      }
    default: 
      return state;
  }
}