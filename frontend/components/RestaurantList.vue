<template>
  <!-- Liste des restaurants -->
  <div class="max-w-2xl px-5 mx-auto">
    <h1>Restaurants</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <NuxtLink
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :to="`/restaurant/${restaurant.slug}`"
        class="w-80 h-36 relative block"
      >
        <div class="w-80 h-36 left-0 top-0 absolute bg-black/40 rounded-md"></div>
        <div class="w-32 h-9 left-[20px] top-[86px] absolute">
          <div
            class="left-0 top-0 absolute text-white text-base font-medium font-['Lexend']"
          >
            {{ restaurant.name }}
          </div>
          <div
            class="left-0 top-[18px] absolute text-white/60 text-base font-medium font-['Lexend']"
          >
            {{ restaurant.city }}
          </div>
        </div>
      </NuxtLink>
    </div>
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
