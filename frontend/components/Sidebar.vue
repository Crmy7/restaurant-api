<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const tabs = [
  { name: "Mon Restaurant", key: "restaurant" },
  { name: "Plats", key: "dishes" },
  { name: "Commandes", key: "orders" },
];

defineProps(["currentTab"]);

defineEmits(["navigate"]);
</script>

<template>
  <aside
    class="w-64 p-4 bg-white shadow-lg flex flex-col justify-between top-0 sticky"
    style="max-height: calc(100vh - 24px)"
  >
    <div class="">
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
    <!-- button logout -->
    <button @click="authStore.logout" class="w-full text-left px-4 py-2 rounded-lg flex items-center">
      <span class="flex">
        <Icon name="material-symbols:logout" class="w-6 h-6 mr-2" />
      </span>
      <span class="text-black/90 text-base font-bold font-['Lexend']"
        >Déconnexion</span
      >
    </button>
  </aside>
</template>
