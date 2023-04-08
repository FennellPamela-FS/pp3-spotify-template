/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  // paths that will use Tailwind CSS class names
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    //   'sm': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'md': '768px',
    //   // => @media (min-width: 768px) { ... }

    //   'lg': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'xl': '1280px',
    //   // => @media (min-width: 1280px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    // },
    // colors: {
    //   sgreen: '#1D8954',
    //   swhite: '#FFFFFF',
    //   sblack: '#191414',
    // },
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      // serif: ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
    },
    extend: {
      // containers: {
      //   '2xs': '16rem',
      // },
    },
  },
  plugins: [
    // require('@tailwindcss/container-queries'),
    // ...
  ],
}


