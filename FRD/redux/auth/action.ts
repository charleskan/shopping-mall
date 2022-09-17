import { LineAxisOutlined } from "@mui/icons-material";
import { AppDispatch } from "../../src/app/store"

export function loggedIn(username: string, token: string) {
  return {
    type: '@@auth/LOGGED_IN' as const,
    username: username,
    token: token,
  }
}

export function loggedOut() {
  return {
    type: '@@auth/LOGGED_OUT' as const,
  }
}

export function login(res: Response, username: string, token: string) {
  return async (dispatch: AppDispatch) => {

    if (res.headers.get("X-C21-TOKEN") !== null) {
      const token = localStorage.setItem("token", res.headers.get("X-C21-TOKEN")!);
    }

    dispatch(loggedIn(username, token));
  }
}

export function logOUT() {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    dispatch(loggedOut());
  }
}

export type LoggedInAction = ReturnType<typeof loggedIn>

export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction