export const useOrders = () => {
  const config = useRuntimeConfig();
  const urlBase = "http://localhost:2000/api/";

  // Récupérer les commandes de l'utilisateur
  async function getOrders() {
    try {
      const { data, error } = await useFetch(`${urlBase}orders`, {
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`, // Ajoute le token de l'utilisateur
        },
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      return data.value;
    } catch (error) {
      console.error("Erreur dans .getOrders :", error);
      throw error;
    }
  }

  //   Get orders by restaurant
  async function getOrdersByRestaurant(restaurantId: number) {
    try {
      const { data, error } = await useFetch(`${urlBase}restaurant/${restaurantId}/orders`, {
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`, // Ajoute le token de l'utilisateur
        },
      });

      if (error.value) {
        throw new Error(error.value.message || "Erreur API");
      }

      return data.value;
    } catch (error) {
      console.error("Erreur dans .getOrders :", error);
      throw error;
    }
  }

  return {
    getOrders,
    getOrdersByRestaurant,
  };
};
