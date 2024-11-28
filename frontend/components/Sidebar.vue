<script setup>
const tabs = [
  { name: "Mon Restaurant", key: "restaurant" },
  { name: "Plats", key: "dishes" },
  { name: "Commandes", key: "orders" },
];

defineProps(["currentTab"]);

defineEmits(["navigate"]);
</script>

<template>
  <aside class="w-64 bg-white shadow-lg">
    <div class="p-4">
      <h1 class="text-xl font-bold text-purple-600 mb-8">
        Back Office : Rôle Restaurant
      </h1>
      <div v-for="tab in tabs" :key="tab.key" class="mb-6">
        <button
          @click="$emit('navigate', tab.key)"
          class="w-full text-left px-4 py-2 rounded-lg"
          :class="
            currentTab === tab.key
              ? 'bg-purple-600 text-white'
              : 'hover:bg-gray-100'
          "
        >
          {{ tab.name }}
        </button>
      </div>
    </div>
  </aside>
</template>
