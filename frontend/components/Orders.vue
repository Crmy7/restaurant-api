<script setup>
defineProps(["orders"]);

defineEmits(["cancelOrder"]);
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-bold mb-6">Commandes</h2>

    <div v-if="orders.length > 0">
      <div
        v-for="order in orders"
        :key="order.id"
        class="border rounded-lg p-4 mb-4"
      >
        <h3 class="font-bold">Commande #{{ order.id }}</h3>
        <p>Total : {{ order.total }} €</p>
        <p>Statut : {{ order.status }}</p>
        <ul class="mt-4">
          <div
            v-for="item in order.OrderItems"
            :key="item.id"
            class="text-gray-700"
          >
            <img
              :src="item.Dish.image"
              alt="Dish image"
              class="w-16 h-16 rounded object-cover"
            />
            <div>
              <p class="font-bold">{{ item.Dish.name }}</p>
              <p class="text-sm text-gray-600">
                {{ item.price.toFixed(2) }}€
              </p>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <p v-else class="text-gray-500">
      Aucune commande trouvée pour ce restaurant.
    </p>
  </div>
</template>
