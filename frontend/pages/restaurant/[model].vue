<template>
  <div class="container mx-auto px-5 py-10">
    <!-- Informations du restaurant -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold">{{ restaurant?.name }}</h1>
      <p class="text-lg mt-2">{{ restaurant?.description }}</p>
      <p class="text-gray-500">{{ restaurant?.address }}</p>
    </div>

    <!-- Liste des plats (utilisation de DishesGrid) -->
    <DishesGrid :dishes="restaurant?.Dishes" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRestaurants } from "@/composables/useRestaurants";
import DishesGrid from "@/components/DishesGrid.vue";

const route = useRoute();
const restaurant = ref(null);
const { getRestaurantBySlug } = useRestaurants();

try {
  restaurant.value = await getRestaurantBySlug(route.params.model);
} catch (error) {
  console.error("Erreur lors de la récupération des données :", error);
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
