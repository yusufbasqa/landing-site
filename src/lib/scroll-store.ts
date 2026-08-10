// Mutable, non-reactive scroll position shared between the Lenis provider
// and any R3F scene that wants per-frame scroll access without re-rendering.
export const scrollStore = { y: 0 };
