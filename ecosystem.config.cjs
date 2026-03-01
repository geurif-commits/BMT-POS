module.exports = {
  apps: [
    { name: 'bmtechrd-pos-api', cwd: './backend', script: 'dist/server.js', instances: 1, exec_mode: 'fork', env_file: './backend/.env' },
    { name: 'bmtechrd-pos-web', cwd: './frontend', script: 'npm', args: 'run dev' }
  ]
};
