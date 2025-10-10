/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ya no necesitamos la reescritura para /api, ya que next-auth
  // crea sus propios endpoints y las llamadas al backend se harán
  // de forma explícita con fetch.
};

export default nextConfig;
