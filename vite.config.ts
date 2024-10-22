import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/learner_mentor-app/",
  plugins: [react()],
})
