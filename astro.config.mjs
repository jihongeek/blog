// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
// https://astro.build/config
export default defineConfig({
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
    remarkPlugins: [remarkMath],
  },
});
