export function loggedIn(nickname: string , token:string) {
  return {
    type: '@@auth/LOGGED_IN' as const,
    nickname: nickname,
    token:token,
  }
}

export function loggedOut() {
  return {
    type: '@@auth/LOGGED_OUT' as const,
  }
}

export type LoggedInAction = ReturnType<typeof loggedIn>

export type LoggedOutAction = ReturnType<typeof loggedOut>

export type AuthActions = LoggedInAction | LoggedOutAction