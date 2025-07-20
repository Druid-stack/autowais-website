module.exports = {
  apps: [
    {
      name: 'autowais-backend',
      script: 'server.js',
      cwd: '/var/www/autowais',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5001
      },
      error_file: '/var/log/autowais/backend-error.log',
      out_file: '/var/log/autowais/backend-out.log',
      log_file: '/var/log/autowais/backend-combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024'
    },
    {
      name: 'autowais-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/autowais/autowais',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/autowais/frontend-error.log',
      out_file: '/var/log/autowais/frontend-out.log',
      log_file: '/var/log/autowais/frontend-combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024'
    }
  ]
}; 