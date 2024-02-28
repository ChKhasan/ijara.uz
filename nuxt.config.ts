// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/custom-theme.scss", "@/assets/css/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "nuxt3-leaflet",
    "dayjs-nuxt",
  ],
  devServer: {
    host: "127.0.0.1",
    port: 3000,
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || "http://api.rent-home.uz",
    },
  },
});
