export const useRestaurants = () => {
  const config = useRuntimeConfig();
  const urlBase = "http://localhost:2000/api/";

  // Fonction pour récupérer les restaurants
  async function getRestaurants() {
    try {
      const { data, error } = await useFetch(`${urlBase}restaurants`, {
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`, // Ajoute le token de l'utilisateur
        },
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      } 


      return data.value;
    } catch (error: any) {
      console.error("Erreur dans useRestaurants.getRestaurants :", error);
      throw error;
    }
  }

  // Fonction pour récupérer un restaurant par son slug
  async function getRestaurantBySlug(slug: string) {
    try {
      const { data, error } = await useFetch(`${urlBase}restaurants/${slug}`, {
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`, // Ajoute le token de l'utilisateur
        },
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      return data.value;
    } catch (error) {
      console.error("Erreur dans useRestaurants.getRestaurantBySlug :", error);
      throw error;
    }
  }


  return {
    getRestaurants,
    getRestaurantBySlug,
  };
};
