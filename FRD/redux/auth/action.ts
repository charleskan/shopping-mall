import { AppDispatch } from "../../src/app/store"

export function loggedIn(username: string , token:string) {
  return {
    type: '@@auth/LOGGED_IN' as const,
    username:username,
    token:token,
  }
}

export function loggedOut() {
  return {
    type: '@@auth/LOGGED_OUT' as const,
  }
}
export function logOUT(){
  return(dispatch:AppDispatch)=>{
    localStorage.removeItem("token");
    dispatch(loggedOut());
  }
}

export type LoggedInAction = ReturnType<typeof loggedIn>

export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction