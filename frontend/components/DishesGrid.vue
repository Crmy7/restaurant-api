<template>
  <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="dish in dishes"
      :key="dish.id"
      class="relative rounded-md overflow-hidden shadow-md"
    >
      <img
        :src="dish.image"
        :alt="dish.name"
        class="object-cover w-full h-40"
      />
      <div class="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
        <h2 class="text-white text-lg font-semibold">{{ dish.name }}</h2>
        <p class="text-white text-sm mt-2">{{ dish.price.toFixed(2) }} €</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dishes: {
    type: Array,
    required: true,
  },
});
</script>
