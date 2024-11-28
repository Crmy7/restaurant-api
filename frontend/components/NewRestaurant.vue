<script setup>
import { ref } from "vue";
import { useRestaurants } from "@/composables/useRestaurants";

// Définir les événements émis
const emit = defineEmits(["success", "error"]);

const newRestaurant = ref({
  name: "Restaurant par défaut",
  address: "123 Rue Exemple",
  city: "Paris",
  zipCode: "75001",
  country: "France",
  phone: "+33 1 23 45 67 89",
  email: "restaurant@example.com",
  website: "https://www.example.com",
  description: "Description par défaut du restaurant.",
  image: "https://via.placeholder.com/150",
  ownerEmail: "proprietaire@example.com",
  ownerPassword: "motdepassepardefault",
});

const successMessage = ref("");
const errorMessage = ref("");

const { addRestaurant } = useRestaurants();

const resetForm = () => {
  newRestaurant.value = {
    name: "Restaurant par défaut",
    address: "123 Rue Exemple",
    city: "Paris",
    zipCode: "75001",
    country: "France",
    phone: "+33 1 23 45 67 89",
    email: "restaurant@example.com",
    website: "https://www.example.com",
    description: "Description par défaut du restaurant.",
    image: "https://via.placeholder.com/150",
    ownerEmail: "proprietaire@example.com",
    ownerPassword: "motdepassepardefault",
  };
};

const submitRestaurant = async () => {
  try {
    await addRestaurant(newRestaurant.value);
    emit("success", "Restaurant ajouté avec succès.");
  } catch (error) {
    emit("error", error.message || "Erreur lors de l'ajout du restaurant.");
  }
};
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Ajouter un Restaurant</h2>
    <form @submit.prevent="submitRestaurant" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Nom du restaurant
          </label>
          <input
            v-model="newRestaurant.name"
            type="text"
            id="name"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <input
            v-model="newRestaurant.address"
            type="text"
            id="address"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label for="city" class="block text-sm font-medium text-gray-700">
            Ville
          </label>
          <input
            v-model="newRestaurant.city"
            type="text"
            id="city"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label for="zipCode" class="block text-sm font-medium text-gray-700">
            Code postal
          </label>
          <input
            v-model="newRestaurant.zipCode"
            type="text"
            id="zipCode"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label for="country" class="block text-sm font-medium text-gray-700">
            Pays
          </label>
          <input
            v-model="newRestaurant.country"
            type="text"
            id="country"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <input
            v-model="newRestaurant.phone"
            type="text"
            id="phone"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            v-model="newRestaurant.email"
            type="email"
            id="email"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label for="website" class="block text-sm font-medium text-gray-700">
            Site Web
          </label>
          <input
            v-model="newRestaurant.website"
            type="text"
            id="website"
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div class="col-span-2">
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            v-model="newRestaurant.description"
            id="description"
            rows="4"
            class="w-full p-2 border rounded-lg"
          ></textarea>
        </div>

        <h2 class="text-xl font-bold col-span-2">Propriétaire</h2>

        <div>
          <label
            for="ownerEmail"
            class="block text-sm font-medium text-gray-700"
          >
            Email du propriétaire
          </label>
          <input
            v-model="newRestaurant.ownerEmail"
            type="email"
            id="ownerEmail"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label
            for="ownerPassword"
            class="block text-sm font-medium text-gray-700"
          >
            Mot de passe du propriétaire
          </label>
          <input
            v-model="newRestaurant.ownerPassword"
            type="password"
            id="ownerPassword"
            required
            class="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      <!-- Bouton de soumission -->
      <div class="mt-6 flex justify-end">
        <button
          type="submit"
          class="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 shadow-lg"
        >
          Ajouter le Restaurant
        </button>
      </div>
    </form>
  </div>
</template>
