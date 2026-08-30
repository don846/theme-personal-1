import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  output: 'static',
  site: 'https://theme-personal-1.socialpower.tech',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
