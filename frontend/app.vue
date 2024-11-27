<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#app";

// Récupère le store d'authentification et la route actuelle
const authStore = useAuthStore();
const route = useRoute();

// Liste des pages accessibles sans authentification
const publicPages = ["/auth/login", "/auth/register", "/auth/admin/register"];

// Vérifie si l'utilisateur est connecté ou si la page est publique
if (!authStore.isAuthenticated && !publicPages.includes(route.path)) {
  console.log("Utilisateur non authentifié, redirection vers /auth/login");
  navigateTo("/auth/login"); // Redirige uniquement si la page n'est pas dans la whitelist
} else {
  console.log("Accès autorisé à la page :", route.path);
}
</script>

<template>
  <!-- button logout mdi:power -->
  <button class="flex w-full justify-end p-2 xl:p-4 absolute">
    <Icon name="mdi:power" class="mr-2 text-indigo-500" size="30" @click="authStore.logout"/>
  </button>
  <NavBar />
  <NuxtPage />
</template>
