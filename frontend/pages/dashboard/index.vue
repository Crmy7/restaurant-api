<script setup>
import { ref } from "vue";
import { useRestaurants } from "@/composables/useRestaurants";
import { useDishes } from "@/composables/useDishes";
import { useOrders } from "@/composables/useOrders";

const currentTab = ref("restaurant");
const restaurant = ref({});
const dishes = ref([]);
const orders = ref([]);
const newDish = ref({ name: "", price: "", image: "", description: "" });
const showAddDishPanel = ref(false);
const successMessage = ref(""); // Success message state
const errorMessage = ref(""); // Error message state

const { getRestaurantByUser, editRestaurant } = useRestaurants();
const { getDishesByRestaurant, addDish } = useDishes();
const { getOrdersByRestaurant } = useOrders();

try {
  const data = await getRestaurantByUser();
  restaurant.value = data;
  dishes.value = await getDishesByRestaurant(restaurant.value.id);
  orders.value = await getOrdersByRestaurant(restaurant.value.id);
} catch (error) {
  errorMessage.value = error.message || "Erreur lors du chargement des données.";
  setTimeout(() => (errorMessage.value = ""), 3000);
  console.error(error);
}

const updateRestaurant = async () => {
  try {
    await editRestaurant(restaurant.value);
    successMessage.value = "Restaurant mis à jour avec succès.";
    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (error) {
    errorMessage.value = error.message || "Erreur lors de la mise à jour du restaurant.";
    setTimeout(() => (errorMessage.value = ""), 3000);
    console.error(error);
  }
};

const addNewDish = async () => {
  try {
    successMessage.value = "";
    errorMessage.value = "";

    await addDish(restaurant.value.id, newDish.value);

    successMessage.value = "Plat ajouté avec succès.";
    dishes.value = await getDishesByRestaurant(restaurant.value.id); // Rafraîchissement des plats
    showAddDishPanel.value = false;
    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (error) {
    console.error("Erreur lors de l'ajout du plat :", error);

    if (error.response?.status === 400) {
      errorMessage.value = error.response.data.error || "Requête invalide.";
    } else {
      errorMessage.value = `Une erreur inattendue s'est produite (${error.message}).`;
    }

    setTimeout(() => (errorMessage.value = ""), 5000);
  }
};

const navigateToTab = (tab) => (currentTab.value = tab);
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar :currentTab="currentTab" @navigate="navigateToTab" />

    <main class="flex-1 p-8">
      <!-- Success Message -->
      <transition name="fade-slide" mode="out-in">
        <div
          v-if="successMessage"
          class="bg-green-200 px-6 py-4 my-4 rounded-md text-lg flex items-center fixed bottom-16 left-1/2 -translate-x-1/2"
        >
          <svg
            viewBox="0 0 24 24"
            class="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
          <span class="text-green-800">{{ successMessage }}</span>
        </div>
      </transition>

      <!-- Error Message -->
      <transition name="fade-slide" mode="out-in">
        <div
          v-if="errorMessage"
          class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center fixed bottom-16 left-1/2 -translate-x-1/2">
            <svg viewBox="0 0 24 24" class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                <path fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                </path>
            </svg>
            <span class="text-red-800"> {{ errorMessage }} </span>
        </div>
      </transition>

      <RestaurantForm
        v-if="currentTab === 'restaurant'"
        :restaurant="restaurant"
        @update="updateRestaurant"
      />

      <Dishes
        v-if="currentTab === 'dishes'"
        :dishes="dishes"
        :newDish="newDish"
        :showAddDishPanel="showAddDishPanel"
        @addDish="addNewDish"
        @toggleAddDishPanel="showAddDishPanel = !showAddDishPanel"
      />

      <Orders
        v-if="currentTab === 'orders'"
        :orders="orders"
        @cancelOrder="(id) => console.log('Cancel order:', id)"
      />
    </main>
  </div>
</template>

<style>
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
