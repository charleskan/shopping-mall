export interface AuthState {
    [x: string]: any;
    username: string | null;
    loggedIn: boolean | null;
    token : string |null;
  }