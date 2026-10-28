// PM2 process file. Secrets are NOT stored here: the API reads them from server/.env on the VPS.
// Build first: `npm run build:server`, then `pm2 start ecosystem.config.cjs`.
module.exports = {
  apps: [
    {
      name: 'signature-car-lounge-api',
      cwd: './server',
      script: 'dist/index.js',
      instances: 1, // the rate limiter is in-memory, so keep a single instance
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '200M',
      env: { NODE_ENV: 'production' },
    },
  ],
}
