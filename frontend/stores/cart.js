import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: useCookie("cart").value || [], // Récupère le panier depuis les cookies
  }),
  actions: {
    addToCart(dish) {
      const existingItem = this.items.find((item) => item.id === dish.id);
      if (existingItem) {
        existingItem.quantity += 1; // Incrémente la quantité si l'article existe déjà
      } else {
        this.items.push({ ...dish, quantity: 1 }); // Ajoute un nouvel article avec une quantité
      }

      this.saveCart();
    },
    removeFromCart(dishId) {
      this.items = this.items.filter((item) => item.id !== dishId);
      this.saveCart();
    },
    clearCart() {
      this.items = [];
      this.saveCart();
    },
    saveCart() {
      useCookie("cart").value = this.items; // Sauvegarde le panier dans les cookies
    },
    async createOrder() {
      try {
        const { data } = await useFetch("/api/orders", {
          baseURL: "http://localhost:2000",
          method: "POST",
          body: { items: this.items },
          headers: {
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
        });
        this.items = []; // Vide le panier après la commande
        this.saveCart();
        return data;
      } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        throw error;
      }
    },
  },
});
