import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: useCookie("authToken").value || null,
    isAuthenticated: !!useCookie("authToken").value,
    tokenExpired: false, // Indique si le token a expiré
  }),
  actions: {
    setTokenExpired(status) {
      this.tokenExpired = status; // Modifie l'état du token expiré
    },
    async login(username, password) {
      try {
        const { data, error } = await useFetch("/api/auth/login", {
          baseURL: "http://localhost:2000",
          method: "POST",
          body: { username, password },
        });

        if (error.value) throw error.value;

        this.token = data.value.token;
        this.isAuthenticated = true;
        this.user = data.value.user;
        useCookie("authToken").value = this.token;
        this.tokenExpired = false; // Réinitialise l'état après une reconnexion
        return { success: true };
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return {
          success: false,
          error: error.data?.error || "Erreur inconnue",
        };
      }
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.user = null;
      useCookie("authToken").value = null;
      navigateTo("/auth/login");
    },
    async getUser() {
      try {
        if (!this.token) {
          console.error("Token manquant. L'utilisateur n'est pas authentifié.");
          return null;
        }

        const { data, error } = await useFetch("/api/users/@me", {
          baseURL: "http://localhost:2000",
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`, // Ajoute le token à la requête
          },
        });

        if (error.value) throw error.value;

        this.user = data.value; // Met à jour les infos utilisateur
        return data.value;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        this.user = null; // Réinitialise l'utilisateur en cas d'erreur
        throw error;
      }
    },
    async register(username, password, isAdmin = false) {
      try {
        const url = isAdmin ? "/api/auth/admin/register" : "/api/auth/register";

        const { data, error } = await useFetch(url, {
          baseURL: "http://localhost:2000",
          method: "POST",
          body: { username, password },
        });

        if (error.value) throw error.value;

        this.token = data.value.token;
        this.isAuthenticated = true;
        this.user = data.value.user;
        useCookie("authToken").value = this.token;
        return { success: true };
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        return {
          success: false,
          error: error.data?.error || "Erreur inconnue",
        };
      }
    },
  },
});
