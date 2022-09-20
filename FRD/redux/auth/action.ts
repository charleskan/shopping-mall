import { AppDispatch } from "../../src/app/store"

export function loggedIn() {
  return {
    type: '@@auth/LOGGED_IN' as const,
    username: localStorage.getItem("username"),
    token:localStorage.getItem("token"),
  }
}

export function loggedOut() {
  return {
    type: '@@auth/LOGGED_OUT' as const,
  }
}

export function logOut(){
  return(dispatch:AppDispatch)=>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch(loggedOut());
  }
}

export type LoggedInAction = ReturnType<typeof loggedIn>

export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction