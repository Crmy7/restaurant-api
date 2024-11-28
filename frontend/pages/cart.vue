<template>
  <NavBar :title="title" />
  <div class="container mx-auto px-5 py-10">
    <!-- Liste des articles dans le panier -->
    <div v-if="cartItems.length > 0" class="space-y-4">
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between p-4 border rounded-md"
      >
        <div class="flex flex-row gap-5">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-16 h-16 object-cover rounded-md"
          />
          <div class="flex flex-col">
            <h2 class="text-lg font-semibold">{{ item.name }}</h2>
            <p class="text-gray-500">{{ item.price }} €</p>
            <p class="text-sm text-gray-400">Quantité : {{ item.quantity }}</p>
          </div>
        </div>
        <button
          @click="removeFromCart(item.id)"
          class="text-red-500 hover:underline"
        >
          Supprimer
        </button>
      </div>
    </div>

    <!-- Message si le panier est vide -->
    <div v-else>
      <p class="text-gray-500">Votre panier est vide.</p>
    </div>

    <!-- Bouton pour créer la commande -->
    <div class="mt-6">
      <button
        @click="submitOrder"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="cartItems.length === 0 || isSubmitting"
      >
        <span v-if="!isSubmitting">Passer la commande</span>
        <span v-else>Création de la commande...</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const router = useRouter();
const cartItems = computed(() => cartStore.items);
const isSubmitting = ref(false); // Indique si la commande est en cours de soumission

const title = "Panier";

const removeFromCart = (id) => {
  cartStore.removeFromCart(id);
};

const submitOrder = async () => {
  try {
    isSubmitting.value = true; // Début du traitement
    await cartStore.createOrder(); // Création de la commande
    router.push("/commandes"); // Redirection vers la page des commandes
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
  } finally {
    isSubmitting.value = false; // Fin du traitement
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
