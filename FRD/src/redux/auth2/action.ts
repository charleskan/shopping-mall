import { AppDispatch } from "../../store";
import axios, { AxiosResponse } from "axios";


export function loginSucceeded(token2: string) {
    return {
        type: '@@auth2/LOGIN_SUCCEEDED' as const,
        token2
    }
}

export function logoutSucceeded() {
    return {
        type: '@@auth2/LOGOUT_SUCCEEDED' as const,
    }
}

type LoginSucceededAction = ReturnType<typeof loginSucceeded>
type LogoutSucceededAction = ReturnType<typeof logoutSucceeded>

export type AuthActions2 = LoginSucceededAction | LogoutSucceededAction

export function checkResponse(res: AxiosResponse<any, any>) {
    return (dispatch: AppDispatch) => {
      if (res.headers['x-c21-token'] != null) {
        dispatch(login(res.headers['x-c21-token']))
      }
    }
  }


  export function login(token2: string) {
    return (dispatch: AppDispatch) => {
      localStorage.setItem('token2', token2);
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${token2}`
  
      dispatch(loginSucceeded(token2));
    }
  }

  export function logout(token2: string) {
    return (dispatch: AppDispatch) => {
      localStorage.removeItem('token2');
  
      delete axios.defaults.headers.common['Authorization'];
      
      dispatch(logoutSucceeded());
    }
  }