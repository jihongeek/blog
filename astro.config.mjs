// @ts-check
import { defineConfig } from 'astro/config';
import rehypeMathJaxSvg from 'rehype-mathjax/svg';
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
    rehypePlugins: [rehypeMathJaxSvg],
  },
});
