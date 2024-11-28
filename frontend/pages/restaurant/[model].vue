<template>
  <NavBar :title="title" />
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
const route = useRoute();
const restaurant = ref(null);
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

const title = computed(() => restaurant.value?.name || "Restaurant");
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
