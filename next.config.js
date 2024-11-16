// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Ignora el módulo 'fs' en el lado del cliente.
      };
    }
    return config;
  },
};
