<template>
  <NavBar :title="title" />
  <div class="container mx-auto px-5 py-10">
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
const { getOrders } = useOrders();

const orders = ref([]);

try {
  orders.value = await getOrders();
} catch (error) {
  console.error("Erreur lors de la récupération des données :", error);
}

const title = "Commandes";
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
