
import { AppDispatch } from "../../store"
import axios, { AxiosResponse } from "axios";

export function checkResponse(res: AxiosResponse<any, any>) {
  return (dispatch: AppDispatch) => {
    

      dispatch(logIn(res))
    }

    // return (dispatch: AppDispatch) => {
    //   if (res.headers['x-c21-token'] != null) {
    //     dispatch(login(res.headers['x-c21-token']))
    //   }
    // }
  }


export function loggedIn() {
  return {
    type: '@@auth/LOGGED_IN' as const,
    token:localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  }
}

export function loggedOut() {
  return {
    type: '@@auth/LOGGED_OUT' as const,
  }
}

export function logIn(data:any) {
  return (dispatch: AppDispatch) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    dispatch(loggedIn());
  }
}
export function logOut() {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch(loggedOut());
  }
}

export type LoggedInAction = ReturnType<typeof loggedIn>

export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction 