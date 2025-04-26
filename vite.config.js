import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
    base: '/event20250521/',
    plugins: [
        tailwindcss(),
    ],
})