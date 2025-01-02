<script setup>
import { ref, onMounted } from "vue";
import { useRestaurants } from "@/composables/useRestaurants";

const { getRestaurants, deleteRestaurant } = useRestaurants();

const restaurants = ref([]);
const successMessage = ref("");
const errorMessage = ref("");

const fetchRestaurants = async () => {
  try {
    restaurants.value = await getRestaurants();
  } catch (error) {
    errorMessage.value = error.message || "Erreur lors du chargement des restaurants.";
    setTimeout(() => (errorMessage.value = ""), 5000);
  }
};

const handleDelete = async (id) => {
  try {
    await deleteRestaurant(id);
    successMessage.value = "Restaurant supprimé avec succès.";
    setTimeout(() => (successMessage.value = ""), 3000);
    fetchRestaurants(); // Rafraîchit la liste après suppression
  } catch (error) {
    errorMessage.value = error.message || "Erreur lors de la suppression.";
    setTimeout(() => (errorMessage.value = ""), 5000);
  }
};

onMounted(fetchRestaurants);
</script>

<template>
  <div>
    <table class="table-auto w-full bg-white shadow rounded-lg">
      <thead class="bg-gray-100 border-b">
        <tr>
          <th class="text-left px-4 py-2 font-bold">Nom</th>
          <th class="text-left px-4 py-2 font-bold">Email</th>
          <th class="text-right px-4 py-2 font-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="border-b"
        >
          <td class="px-4 py-2">{{ restaurant.name }}</td>
          <td class="px-4 py-2">{{ restaurant.email }}</td>
          <td class="px-4 py-2 text-right">
            <button
              @click="handleDelete(restaurant.id)"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Supprimer
            </button>
          </td>
        </tr>
        <tr v-if="restaurants.length === 0">
          <td colspan="3" class="text-center py-4 text-gray-500">
            Aucun restaurant trouvé.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Messages -->
    <div v-if="successMessage" class="mt-4 bg-green-200 p-4 rounded">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mt-4 bg-red-200 p-4 rounded">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.table-auto th,
.table-auto td {
  padding: 0.5rem;
}
</style>
