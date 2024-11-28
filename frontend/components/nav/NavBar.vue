<template>
  <div class="w-full top-0 p-2 xl:p-4 flex justify-between max-w-7xl mx-auto">
    <!-- Bouton de retour -->
    <button @click="goBack" class="flex items-center text-black">
      <Icon
        v-if="!isHomePage"
        name="material-symbols-light:chevron-left"
        class="mr-2"
        size="30"
      />
    </button>

    <h1 class="text-3xl font-bold">
      {{ title }}
    </h1>

    <button @click="goToCart" class="text-black relative">
      <span
        v-if="cartCount > 0"
        class="absolute z-10 -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ cartCount }}
      </span>
      <Icon name="lucide:shopping-cart" size="30" class="z-[1]" />
    </button>
  </div>
  <header
    class="flex justify-evenly items-baseline p-4 bg-gray-100 fixed bottom-0 w-full z-50"
  >
    <NuxtLink to="/" class="text-black/50 nav-link hover:text-black">
      <Icon name="circum:home" size="30" />
    </NuxtLink>

    <!-- bouton logout -->
    <Icon
      name="circum:power"
      class="text-black/50 nav-link hover:text-black"
      size="30"
      @click="authStore.logout"
    />

    <NuxtLink to="/commandes" class="text-black/50 nav-link hover:text-black">
      <Icon name="material-symbols-light:shopping-bag-outline" size="30" />
    </NuxtLink>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

// Définir le prop pour recevoir un titre
defineProps({
  title: {
    type: String,
    default: "Restaurants", // Valeur par défaut
  },
});

// Accéder aux routes
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore(); // Accès au store Pinia

// Calculer le nombre total d'articles dans le panier
const cartCount = computed(() =>
  cartStore.items.reduce((total, item) => total + item.quantity, 0)
);

// Vérifie si l'utilisateur est sur la page d'accueil
const isHomePage = computed(() => route.path === "/");

// Fonction pour revenir à la page précédente
const goBack = () => {
  router.back();
};

// Fonction pour aller au panier
const goToCart = () => {
  router.push("/cart");
};
</script>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid #ddd;
}

a.nav-link.router-link-active {
  position: relative;
  color: #000000;

  &::after {
    content: "\00B7"; /* Point médian */
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
