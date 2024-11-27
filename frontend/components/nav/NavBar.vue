<template>
  <header class="flex items-center justify-between p-4 bg-gray-100">
    <!-- Bouton de retour -->
    <button
      v-if="!isHomePage"
      @click="goBack"
      class="flex items-center text-gray-500 hover:text-gray-900"
    >
      <span class="material-icons">arrow_back</span>
    </button>

    <!-- Titre dynamique -->
    <h1 class="flex-1 text-center font-bold text-black">
      {{ title }}
    </h1>

    <!-- Icône Panier -->
    <button @click="goToCart" class="text-gray-500 hover:text-gray-900">
      <span class="material-icons">shopping_cart</span>
    </button>
  </header>
</template>

<script setup>
// Accès global à la route et au routeur
const route = useRoute();
const router = useRouter();

// Définir un titre dynamique basé sur la route ou une valeur par défaut
const title = route.params.model || "Titre par défaut";

// Vérifie si l'utilisateur est sur la page d'accueil
const isHomePage = route.path === "/";

// Fonction pour revenir à la page précédente
const goBack = () => {
  router.back();
};

// Fonction pour aller au panier
const goToCart = () => {
  router.push("/cart"); // Redirige vers la page panier
};
</script>

<style scoped>
header {
  border-bottom: 1px solid #ddd;
}

button {
  display: flex;
  align-items: center;
}

.material-icons {
  font-size: 24px;
}
</style>
