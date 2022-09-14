import { AuthActions } from "./action";

export interface AuthState {
  username: string | null;
  loggedIn: boolean | null;
  token : string |null;
}

const initialState: AuthState = {
  username: null,
  loggedIn: null,
  token : null
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case '@@auth/LOGGED_IN':
      return {
        ...state,
        username: action.username,
        token :action.token,
        loggedIn: true
      };
    case '@@auth/LOGGED_OUT':
      return {
        ...state,
        username: null,
        token:null,
        loggedIn: false,
      }
    default: 
      return state;
  }
}