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
    async login(email, password) {
      try {
        const response = await axios.post(
          "http://localhost:8081/api/login",
          { email , password }
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
  },
});