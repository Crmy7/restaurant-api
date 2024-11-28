export const useDishes = () => {
  const config = useRuntimeConfig();
  const urlBase = "http://localhost:2000/api/";

  // Fonction pour récupérer un restaurant par son slug
  async function getDishBySlug(slug: string) {
    try {
      const { data, error } = await useFetch(`${urlBase}dishes/${slug}`, {
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`, // Ajoute le token de l'utilisateur
        },
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      return data.value;
    } catch (error) {
      console.error("Erreur dans .getRestaurantBySlug :", error);
      throw error;
    }
  }

  // Fonction pour récupérer les plats d'un restaurant spécifique
  async function getDishesByRestaurant(restaurantId: number) {
    try {
      const { data, error } = await useFetch(
        `${urlBase}restaurant/dishes/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      return data.value;
    } catch (error) {
      console.error("Erreur dans useDishes.getDishesByRestaurant :", error);
      throw error;
    }
  }

  // Fonction pour ajouter un plat à un restaurant
  async function addDish(restaurantId: number, dishData: FormData) {
    try {
      const { data, error } = await useFetch(
        `${urlBase}restaurant/dishes/${restaurantId}/new-dish`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
          body: dishData,
        }
      );

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      return data.value;
    } catch (error) {
      console.error("Erreur dans useDishes.addDish :", error);
      throw error;
    }
  }

  return {
    getDishBySlug,
    getDishesByRestaurant,
    addDish,
  };
};
