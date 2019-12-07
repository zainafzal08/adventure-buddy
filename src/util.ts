export function getNavigateEvent(target: string) {
  return new CustomEvent('navigate', {
    bubbles: true,
    composed: true,
    detail: {
      target,
    },
  });
}
export function getLogoutEvent() {
  return new CustomEvent('logout', {
    bubbles: true,
    composed: true,
  });
}
export function getLoginEvent(user: firebase.User) {
  return new CustomEvent('login', {
    bubbles: true,
    composed: true,
    detail: {
      user,
    },
  });
}

export function exhaustiveCheck(param: never) {
  param;
}
