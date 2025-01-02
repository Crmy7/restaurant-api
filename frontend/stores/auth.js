import { defineStore } from "pinia";
import { useCookie } from "#app";
import axios from "axios";

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
        const response = await axios.post(
          "http://localhost:2000/api/auth/login",
          { username, password }
        );

        const { token, user } = response.data;

        this.token = token;
        this.isAuthenticated = true;
        this.user = user;
        useCookie("authToken").value = this.token;
        this.tokenExpired = false; // Réinitialise l'état après une reconnexion
        return { success: true };
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return {
          success: false,
          error: error.response?.data?.error || "Erreur inconnue",
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

        const response = await axios.get("http://localhost:2000/api/users/@me", {
          headers: {
            Authorization: `Bearer ${this.token}`, // Ajoute le token à la requête
          },
        });

        this.user = response.data; // Met à jour les infos utilisateur
        return response.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        if (error.response?.status === 498) {
          console.warn("Token expiré. Redirection vers la page de connexion.");
          this.logout(); // Nettoie les informations de session
        }

        this.user = null; // Réinitialise l'utilisateur en cas d'erreur
        throw error;
      }
    },
    async register(username, password, isAdmin = false) {
      try {
        const url = isAdmin
          ? "http://localhost:2000/api/auth/admin/register"
          : "http://localhost:2000/api/auth/register";

        const response = await axios.post(url, { username, password });

        const { token, user } = response.data;

        this.token = token;
        this.isAuthenticated = true;
        this.user = user;
        useCookie("authToken").value = this.token;

        return { success: true };
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        return {
          success: false,
          error: error.response?.data?.error || "Erreur inconnue",
        };
      }
    },
  },
});
