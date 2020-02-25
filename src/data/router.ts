export interface Router {
  location: string;
}

export function defaultRouter() {
  return {
    location: '/',
  };
}
