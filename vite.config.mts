import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                core: './src/core/index.scss',
            },
        },
    },
});
