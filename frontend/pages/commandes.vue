<template>
  <NavBar :title="title" />
  <div class="container mx-auto px-5 py-10">
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="errorMessage"
        class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center fixed bottom-16 left-1/2 -translate-x-1/2"
      >
        <svg viewBox="0 0 24 24" class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
          <path
            fill="currentColor"
            d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
          />
        </svg>
        <span class="text-red-800"> {{ errorMessage }} </span>
      </div>
    </transition>

    <div v-if="orders.length > 0" class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="p-4 border rounded-md"
      >
        <h2 class="text-lg font-semibold">Commande #{{ order.id }}</h2>
        <p class="text-gray-500">Total : {{ order.total }} €</p>
        <p class="text-sm text-gray-400">Statut : {{ order.status }}</p>

        <div class="mt-4 space-y-2">
          <h3 class="font-semibold">Plats commandés :</h3>
          <ul>
            <li
              v-for="item in order.OrderItems"
              :key="item.id"
              class="flex justify-between"
            >
              <span>{{ item.Dish.name }} (x{{ item.quantity }})</span>
              <span>{{ item.price }} €</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-gray-500">Aucune commande trouvée.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useOrders } from "@/composables/useOrders";

const { getOrders } = useOrders();
const orders = ref([]);
const errorMessage = ref("");
const title = "Commandes";

try {
  orders.value = await getOrders();
} catch (error) {
  errorMessage.value = error.message || "Une erreur s'est produite lors de la récupération des commandes.";
  console.error(error);
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
}
.fade-slide-leave-to {
  opacity: 0;
}
</style>
