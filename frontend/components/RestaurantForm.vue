<script setup>
defineProps(["restaurant"]);

const emit = defineEmits(["update"]);

const submitForm = () => {
  emit("update");
};
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-bold mb-6">Mon Restaurant</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <input
          v-model="restaurant.name"
          type="text"
          class="w-full p-2 border rounded-lg"
          placeholder="Nom du restaurant"
        />
      </div>
      <div>
        <input
          v-model="restaurant.address"
          type="text"
          class="w-full p-2 border rounded-lg"
          placeholder="Adresse"
        />
      </div>
      <div>
        <input
          v-model="restaurant.zipCode"
          type="text"
          class="w-full p-2 border rounded-lg"
          placeholder="Code postal"
          maxlength="5"
        />
      </div>
      <div>
        <input
          v-model="restaurant.city"
          type="text"
          class="w-full p-2 border rounded-lg"
          placeholder="Ville"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
      >
        Modifier
      </button>
    </form>
  </div>
</template>
