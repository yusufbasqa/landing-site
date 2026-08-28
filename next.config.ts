import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets devices on the local network (e.g. a phone at 192.168.1.x) load
  // dev-mode JS chunks/HMR when testing against `next dev` on this machine.
  // Dev-only: the underlying cross-origin check only runs under `next dev`,
  // so this has no effect on the built production site (e.g. on Vercel).
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.*"],
};

export default nextConfig;
