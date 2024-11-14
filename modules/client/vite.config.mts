import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        open: true,
        port: 3000,
    },
    build: {
        outDir: 'build',
    },
    plugins: [react(), tsconfigPaths()],
});
