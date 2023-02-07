// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=500, initial-scale=1",
      title: "Logos 0|0",
      meta: [
        // <meta name="description" content="My amazing site">
        { name: "description", content: "My amazing site." },
      ],
      link: [
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
