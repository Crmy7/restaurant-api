<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900"
      >
        Connexion à votre compte
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-900">
            Nom d'utilisateur
          </label>
          <div class="mt-2">
            <input
              id="username"
              type="text"
              v-model="username"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-900">
            Mot de passe
          </label>
          <div class="mt-2">
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>
        <p>
          Pas encore de compte ?
          <a href="/auth/register" class="text-indigo-600 hover:underline"
            >Inscrivez-vous
          </a>
        </p>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Se connecter
          </button>
        </div>
        <p v-if="errorMessage" class="mt-2 text-center text-sm text-red-500">
          {{ errorMessage }}
        </p>
        <p v-if="authStore.user">
          Bonjour, {{ authStore.user.username }} (Rôle :
          {{ authStore.user.role }})
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const submit = async () => {
  const { success, error } = await authStore.login(
    username.value,
    password.value
  );
  if (success) {
    try {
      await authStore.getUser(); // Charge les informations de l'utilisateur connecté
      console.log("User ROLE : ", authStore.user.role);
      if (authStore.user.role === "admin") {
        navigateTo("/admin/dashboard");
      } else if (authStore.user.role === "restaurateur") {
        navigateTo("/dashboard");
      } else {
        navigateTo("/");
      }
    } catch (error) {
      console.error("Impossible de charger l'utilisateur :", error);
    }
    // navigateTo("/");
  } else {
    errorMessage.value = error;
  }
};
</script>

<style scoped>
/* Aucun style spécifique supplémentaire n'est requis car Tailwind gère le style */
</style>
