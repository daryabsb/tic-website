// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=500, initial-scale=1",
      title: "Tic Quality Control",
      meta: [
        // <meta name="description" content="My amazing site">
        { name: "description", content: "Tic Quality Control." },
      ],
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Montserrat:400,900",
        },
      ],
    },
  },
  css: [
    "~/assets/css/main.css",
    "~/assets/css/style.scss",
    "~/assets/css/header.css",
    // "~/assets/css/tweenmax.css"
  ],
  plugins: [{ src: "~/plugins/aos", mode: "client" }],
  modules: ["nuxt-headlessui", "@nuxt/content"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["gsap"],
  },
  // modules: ["@fullpage/nuxt-fullpage"],
});
