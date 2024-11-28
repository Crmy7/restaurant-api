<template>
  <!-- Liste des restaurants -->
  <div class="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
    <NuxtLink
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      :to="`/restaurant/${restaurant.slug}`"
      class="relative flex h-36 xl:h-[300px] w-full rounded-md"
    >
      <div class="absolute top-0 left-0 z-0 h-full w-full rounded-md">
        <div
          class="absolute w-full h-full bg-black/50 top-0 left-0 z-[30] rounded-md"
        ></div>
        <img
          src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
          class="object-cover rounded-md w-full h-full"
        />
      </div>
      <div class="z-10 flex w-full h-full p-5 flex-col items-start justify-end">
        <h2 class="text-white text-2xl font-medium font-['Lexend']">
          {{ restaurant.name }}
        </h2>
        <p class="text-white/60 text-base font-medium font-['Lexend']">
          {{ restaurant.city }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const { getRestaurants } = useRestaurants();
const restaurants = ref([]);

// Charger les restaurants lors du montage du composant
try {
  restaurants.value = await getRestaurants();
  console.log("Restaurants chargés :", restaurants.value);
} catch (error) {
  console.error("Erreur lors de la récupération des restaurants :", error);
}
</script>
