<script setup>
defineProps(["dishes", "showAddDishPanel", "newDish"]);

defineEmits(["addDish", "toggleAddDishPanel"]);
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-bold mb-6">Plats</h2>

    <!-- Liste des plats -->
    <div v-if="dishes.length > 0" class="grid grid-cols-4 gap-5">
      <div
        v-for="dish in dishes"
        :key="dish.id"
        class="border-b flex justify-between relative rounded-xl overflow-hidden"
      >
        <img
          :src="dish.image"
          :alt="dish.name"
          class="object-cover w-full h-full"
        />
        <div
          class="absolute inset-0 bg-black/40 flex flex-col justify-end p-4"
        >
          <h3 class="text-white font-bold">{{ dish.name }}</h3>
          <p class="text-white text-sm">{{ dish.price }} €</p>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">
      Aucun plat trouvé pour ce restaurant.
    </p>

    <!-- Bouton pour afficher le panneau d'ajout -->
    <button
      @click="$emit('toggleAddDishPanel')"
      class="mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
    >
      Ajouter un plat
    </button>

    <!-- Panneau d'ajout de plat -->
    <div
      v-if="showAddDishPanel"
      class="mt-6 bg-gray-100 p-6 rounded-lg shadow"
    >
      <h3 class="text-xl font-bold mb-4">Ajouter un plat</h3>
      <form @submit.prevent="$emit('addDish')" class="space-y-4">
        <div>
          <input
            v-model="newDish.name"
            type="text"
            class="w-full p-2 border rounded-lg"
            placeholder="Nom du plat"
          />
        </div>
        <div>
          <input
            v-model="newDish.price"
            type="number"
            step="0.01"
            class="w-full p-2 border rounded-lg"
            placeholder="Prix"
          />
        </div>
        <div>
          <input
            v-model="newDish.image"
            type="text"
            class="w-full p-2 border rounded-lg"
            placeholder="URL de l'image"
          />
        </div>
        <div>
          <textarea
            v-model="newDish.description"
            class="w-full p-2 border rounded-lg"
            placeholder="Description"
          ></textarea>
        </div>
        <div class="flex justify-between">
          <button
            type="button"
            @click="$emit('toggleAddDishPanel')"
            class="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
