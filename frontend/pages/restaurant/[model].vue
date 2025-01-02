<template>
  <NavBar :title="title" />
  <div class="container mx-auto px-5 py-10">
    <!-- Informations du restaurant -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold">{{ restaurant?.name }}</h1>
      <p class="text-lg mt-2">{{ restaurant?.description }}</p>
      <p class="text-gray-500">{{ restaurant?.address }}</p>
    </div>

    <!-- Barre de recherche pour les plats -->
    <div class="max-w-7xl mx-auto mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Recherchez un plat par nom..."
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
      />
    </div>

    <!-- Liste des plats (utilisation de DishesGrid) -->
    <DishesGrid :dishes="filteredDishes" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useRestaurants } from "@/composables/useRestaurants";

const route = useRoute();
const restaurant = ref(null);
const searchQuery = ref("");
const { getRestaurantBySlug } = useRestaurants();

try {
  restaurant.value = await getRestaurantBySlug(route.params.model);
  // Met à jour dynamiquement le titre de la page
  useHead({
    title: restaurant.value?.name || "Restaurant",
  });
} catch (error) {
  console.error("Erreur lors de la récupération des données :", error);
}

// Titre dynamique pour la page
const title = computed(() => restaurant.value?.name || "Restaurant");

// Propriété calculée pour filtrer les plats
const filteredDishes = computed(() => {
  if (!searchQuery.value.trim()) {
    return restaurant.value?.Dishes || [];
  }
  return restaurant.value?.Dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
