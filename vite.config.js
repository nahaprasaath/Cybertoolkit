import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT for GitHub Pages:
// If you deploy to https://<username>.github.io/<repo-name>/
// set base to '/<repo-name>/'. If this is a "username.github.io" root repo,
// leave base as '/'.
export default defineConfig({
  plugins: [react()],
  base: '/Cybertoolkit/',
})
