import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://isogunlabs.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
