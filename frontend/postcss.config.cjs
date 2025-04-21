// postcss.config.cjs
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),  // Use the separate PostCSS plugin for Tailwind
    require('autoprefixer'),
  ],
};
