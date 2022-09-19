
import { AppDispatch } from "../../store"
import axios, { AxiosResponse } from "axios";

export function checkResponse(res: AxiosResponse<any, any>) {
  return (dispatch: AppDispatch) => {
    if (res.status === 401) {
      dispatch(loggedIn())
    }
  }
}

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