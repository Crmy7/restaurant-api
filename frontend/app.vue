<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";

// Récupère le store d'authentification et la route actuelle
const authStore = useAuthStore();
const route = useRoute();

// Liste des pages accessibles sans authentification
const publicPages = ["/auth/login", "/auth/register", "/auth/admin/register"];

// Titre dynamique basé sur les métadonnées de la page
const title = ref("");

// Stocker l'utilisateur et son rôle
const user = ref(null);

// Vérifie l'accès utilisateur et récupère ses données si authentifié
try {
  if (!authStore.isAuthenticated && !publicPages.includes(route.path)) {
    console.log("Utilisateur non authentifié, redirection vers /auth/login");
    navigateTo("/auth/login"); // Redirige uniquement si la page n'est pas dans la whitelist
  }

  console.log("Accès autorisé à la page :", route.path);

  if (authStore.isAuthenticated) {
    // Récupérer les informations de l'utilisateur
    user.value = await authStore.getUser();
    console.log(
      "Informations utilisateur :",
      user.value?.id,
      user.value?.username,
      user.value?.role
    );

    // Si l'utilisateur avec le rôle "user" essaye d'accéder à /dashboard, rediriger vers /
    if (user.value?.role === "user" && route.path === "/dashboard") {
      console.log("Redirection de l'utilisateur vers la page d'accueil");
      navigateTo("/");
    }

    // Si l'utilisateur n'ayant pas de rôle admin essaye d'accéder aux pages commençant par /admin, rediriger vers /
    if (user.value?.role !== "admin" && route.path.startsWith("/admin")) {
      console.log("Redirection de l'utilisateur vers la page d'accueil");
      navigateTo("/");
    }
  }
} catch (error) {
  console.error("Erreur lors de la récupération de l'utilisateur :", error);
}

</script>

<template>
  <!-- Affiche le rôle de l'utilisateur si défini -->
  <div v-if="user">
    <p class="text-gray-700">
      Rôle utilisateur : <strong>{{ user.role }}</strong>
    </p>
  </div>
  <div v-else>
    <p class="text-gray-500">Chargement des informations utilisateur...</p>
  </div>

  <NuxtPage />
</template>
