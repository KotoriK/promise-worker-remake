import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: ['src/index.ts', 'src/register.ts'],
            name: 'PromiseWorker',
            formats: ['es']
        }
    }
});
