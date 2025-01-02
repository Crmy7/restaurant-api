<script setup>
import { ref } from "vue";

defineProps(["orders"]);
const emit = defineEmits(["cancelOrder"]);

const expandedOrderId = ref(null);

const toggleDetails = (id) => {
  expandedOrderId.value = expandedOrderId.value === id ? null : id;
};

const handleCancelOrder = (orderId) => {
  emit("cancelOrder", orderId); // Émettre l'événement pour informer le parent
};
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
        <!-- Ligne principale de la commande -->
        <div class="flex justify-between items-center">
          <div
            @click="toggleDetails(order.id)"
            class="cursor-pointer flex-1 flex items-center"
          >
            <div class="flex-1">
              <h3 class="font-bold">Commande #{{ order.id }}</h3>
              <p>Total : {{ order.total }} €</p>
              <p>
                Statut :
                <select
                  v-model="order.status"
                  class="border rounded px-2 py-1"
                  @click.stop
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </p>
            </div>
            <Icon
              v-if="expandedOrderId !== order.id"
              name="tabler:chevron-down"
              class="w-6 h-6 text-gray-500"
            />
            <Icon
              v-else
              name="tabler:chevron-up"
              class="w-6 h-6 text-gray-500"
            />
          </div>
          <button
            class="bg-red-500 text-white flex justify-center items-center w-[30px] h-[30px] rounded-full hover:bg-red-600 ml-4"
            @click.stop="handleCancelOrder(order.id)"
          >
            <Icon name="material-symbols:close-rounded" class="w-5 h-5" />
          </button>
        </div>

        <!-- Détails de la commande -->
        <transition name="expand">
          <div v-if="expandedOrderId === order.id" class="mt-4 overflow-hidden">
            <h4 class="font-semibold">Détails des plats :</h4>
            <ul class="mt-2">
              <li
                v-for="item in order.OrderItems"
                :key="item.id"
                class="flex items-center mb-4"
              >
                <img
                  :src="item.Dish.image"
                  alt="Dish image"
                  class="w-16 h-16 rounded object-cover mr-4"
                />
                <div>
                  <p class="font-bold">{{ item.Dish.name }}</p>
                  <p class="text-sm text-gray-600">
                    {{ item.price.toFixed(2) }}€ (x{{ item.quantity }})
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <p v-else class="text-gray-500">
      Aucune commande trouvée pour ce restaurant.
    </p>
  </div>
</template>
