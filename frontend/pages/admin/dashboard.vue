<script setup>
import { ref } from "vue";
import { useRestaurants } from "@/composables/useRestaurants";

// État du formulaire avec des valeurs par défaut
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

// Messages de feedback
const successMessage = ref("");
const errorMessage = ref("");

// Utilisation du composable
const { addRestaurant } = useRestaurants();

// Fonction pour envoyer le formulaire d'ajout d'un restaurant
const submitRestaurant = async () => {
  try {
    successMessage.value = "";
    errorMessage.value = "";

    await addRestaurant(newRestaurant.value);

    successMessage.value = "Restaurant créé avec succès.";
    // Réinitialiser le formulaire après succès
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

    setTimeout(() => (successMessage.value = ""), 3000); // Clear success message after 3 seconds
  } catch (error) {
    console.error("Erreur lors de l'ajout du restaurant :", error);
    errorMessage.value = error.message || "Une erreur s'est produite.";
    setTimeout(() => (errorMessage.value = ""), 3000); // Clear error message after 3 seconds
  }
};
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold text-purple-600 mb-6">Admin Dashboard</h1>
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-bold mb-4">Ajouter un Restaurant</h2>

      <!-- Feedback Messages -->
      <transition name="fade-slide" mode="out-in">
        <p
          v-if="successMessage"
          class="bg-green-200 px-4 py-2 rounded-md text-green-800 flex items-center mb-4 fixed bottom-16 left-1/2 -translate-x-1/2"
        >
          <svg viewBox="0 0 24 24" class="w-5 h-5 mr-2 text-green-600">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
          {{ successMessage }}
        </p>
      </transition>

      <transition name="fade-slide" mode="out-in">
        <p
          v-if="errorMessage"
          class="bg-red-200 px-4 py-2 rounded-md text-red-800 flex items-center mb-4 fixed bottom-16 left-1/2 -translate-x-1/2"
        >
          <svg viewBox="0 0 24 24" class="w-5 h-5 mr-2 text-red-600">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
          {{ errorMessage }}
        </p>
      </transition>

      <!-- Formulaire -->
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
            <label
              for="zipCode"
              class="block text-sm font-medium text-gray-700"
            >
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
            <label
              for="country"
              class="block text-sm font-medium text-gray-700"
            >
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
            <label
              for="website"
              class="block text-sm font-medium text-gray-700"
            >
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
