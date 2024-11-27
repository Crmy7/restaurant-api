<template>
  <div>
    <h1>Bienvenue sur le tableau de bord</h1>
    <p v-if="authStore.user">
      Bonjour, {{ authStore.user.username }} (Rôle : {{ authStore.user.role }})
    </p>
    <p v-else>Chargement des informations utilisateur...</p>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

try {
  await authStore.getUser(); // Charge les informations de l'utilisateur connecté
} catch (error) {
  console.error("Impossible de charger l'utilisateur :", error);
}
</script>
