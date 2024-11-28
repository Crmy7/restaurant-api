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

  // Récupérer les informations du restaurant lié à l'utilisateur connecté
  async function getRestaurantByUser() {
    try {
      const { data, error } = await useFetch(`${urlBase}restaurant/my-restaurant`, {
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      console.log("Info restau", data.value);

      return data.value;
    } catch (error) {
      console.error("Erreur dans useRestaurants.getRestaurantByUser :", error);
      throw error;
    }
  }

  // Modifier les informations d'un restaurant
  async function editRestaurant(updateData: any) {
    try {
      const { data, error } = await useFetch(`${urlBase}restaurant/my-restaurant`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: updateData,
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      return data.value;
    } catch (error) {
      console.error("Erreur dans useRestaurants.editRestaurant :", error);
      throw error;
    }
  }

  // Fonction pour ajouter un nouveau restaurant
  async function addRestaurant(newRestaurant: Record<string, any>) {
    try {
      const { data, error } = await useFetch(`${urlBase}admin/restaurants/new-restaurant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`, // Ajoute le token de l'utilisateur
        },
        body: newRestaurant,
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      return data.value;
    } catch (error) {
      console.error("Erreur dans useRestaurants.addRestaurant :", error);
      throw error;
    }
  }


  return {
    getRestaurants,
    getRestaurantBySlug,
    getRestaurantByUser,
    editRestaurant,
    addRestaurant,
  };
};
