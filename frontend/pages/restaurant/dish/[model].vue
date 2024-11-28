<template>
  <NavBar :title="title" />
  <div class="container mx-auto px-5 py-10">
    <!-- Informations du plat -->
    <div v-if="dish">
      <div class="image-container relative mb-5">
        <img
          :src="dish.image"
          :alt="dish.name"
          class="w-full h-[215px] md:h-80 object-cover rounded-[7px]"
        />
      </div>

      <h1 class="text-4xl font-bold">
        {{ dish.name }}
        <span class="text-4xl font-bold text-gray-800">
          - {{ dish.price }} €</span
        >
      </h1>
      <p class="text-lg mt-2">{{ dish.description }}</p>

      <div class="mt-5">
        <button
          @click="addToCart(dish)"
          class="flex items-center justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500">Chargement du plat...</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

// Récupération des données avec `asyncData`
const { getDishBySlug } = useDishes();
const route = useRoute();
const cartStore = useCartStore(); // Store Pinia pour le panier

const { data: dish, error } = await useAsyncData("dish", () =>
  getDishBySlug(route.params.model)
);

useHead({
  title: dish.value?.name || "Restaurant",
});

const title = computed(() => dish.value?.name || "Restaurant");

// Gestion des erreurs (facultatif)
if (error.value) {
  console.error("Erreur lors de la récupération des données :", error.value);
}

// Ajouter un plat au panier
const addToCart = (dish) => {
  cartStore.addToCart(dish);
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
