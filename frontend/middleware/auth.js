export default defineNuxtRouteMiddleware((to, from) => {
  const authToken = useCookie('authToken').value;

  console.log('Middleware global auth exécuté pour la route :', to.fullPath);

  console.log('Authentifié avec le token :', authToken);
});
