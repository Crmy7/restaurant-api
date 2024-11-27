export default defineNuxtPlugin((nuxtApp) => {
  // Capture les erreurs spécifiques à Vue.js
  nuxtApp.hook("vue:error", (err) => {
    console.error("Erreur dans Vue :", err);
  });
});
