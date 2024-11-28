<script setup>
import { ref } from "vue";
import NewRestaurant from "@/components/NewRestaurant.vue";
import RestaurantList from "@/components/RestaurantList.vue";

const showModal = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const toggleModal = () => {
  showModal.value = !showModal.value;
};

// Gestion des messages
const handleSuccess = (message) => {
  successMessage.value = message;
  setTimeout(() => (successMessage.value = ""), 3000);
};

const handleError = (message) => {
  errorMessage.value = message;
  setTimeout(() => (errorMessage.value = ""), 5000);
};

// Rafraîchir la liste des restaurants après ajout
const refreshRestaurants = () => {
  const listComponent = document.querySelector("#restaurant-list");
  if (listComponent && listComponent.refresh) {
    listComponent.refresh();
  }
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-white shadow-lg">
      <div class="p-4">
        <h1 class="text-xl font-bold text-purple-600 mb-8">Admin Dashboard</h1>
        <button
          @click="toggleModal"
          class="w-full text-left px-4 py-2 rounded-lg bg-gray-100"
        >
          Restaurateurs
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8">
      <!-- Success Message -->
      <transition name="fade-slide" mode="out-in">
        <div
          v-if="successMessage"
          class="bg-green-200 px-6 py-4 my-4 rounded-md text-lg flex items-center fixed bottom-16 left-1/2 -translate-x-1/2 z-50"
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
          class="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center fixed bottom-16 left-1/2 -translate-x-1/2 z-50"
        >
          <svg
            viewBox="0 0 24 24"
            class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
          >
            <path
              fill="currentColor"
              d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
            />
          </svg>
          <span class="text-red-800">{{ errorMessage }}</span>
        </div>
      </transition>

      <div class="p-8 bg-gray-100 min-h-screen">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold text-purple-600">
            Liste des Restaurants
          </h1>
          <button
            @click="toggleModal"
            class="text-left px-4 py-2 rounded-lg bg-purple-600 text-white w-fit"
          >
            Ajouter un restaurant
          </button>
        </div>
        <RestaurantList id="restaurant-list" />
      </div>
    </main>

    <!-- Modal -->
    <transition name="fade-slide" mode="out-in">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg max-w-7xl w-full modal-container"
        >
          <button @click="toggleModal" class="text-gray-600 float-right">
            X
          </button>
          <NewRestaurant
            @success="(msg) => { handleSuccess(msg); toggleModal(); refreshRestaurants(); }"
            @error="handleError"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  .modal-container {
    transition: all 0.5s ease;
  }
}
.fade-slide-enter-from {
  .modal-container {
    opacity: 0;
    transform: translateY(-20px);
  }
}
.fade-slide-leave-to {
  .modal-container {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
