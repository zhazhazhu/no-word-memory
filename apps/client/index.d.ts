declare module '#app' {
  interface PageMeta {
    auth?: { unauthenticatedOnly?: boolean };
  }
}

export {};
