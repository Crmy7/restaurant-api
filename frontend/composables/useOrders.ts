import axios from "axios";

export const useOrders = () => {
  const config = useRuntimeConfig();
  const urlBase = "http://localhost:2000/api/";

  // Générer les en-têtes d'autorisation
  const authHeader = () => {
    const token = useCookie("authToken").value;
    return { Authorization: `Bearer ${token}` };
  };

  // Récupérer les commandes de l'utilisateur
  async function getOrders() {
    try {
      const response = await axios.get(`${urlBase}orders`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Erreur dans useOrders.getOrders :", error);
      handleApiError(error);
    }
  }

  // Récupérer les commandes d'un restaurant spécifique
  async function getOrdersByRestaurant(restaurantId: number) {
    try {
      const response = await axios.get(
        `${urlBase}manage/restaurant/${restaurantId}/orders`,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur dans useOrders.getOrdersByRestaurant :", error);
      handleApiError(error);
    }
  }

  async function deleteOrder(orderId: number) {
    try {
      const response = await axios.delete(`${urlBase}manage/restaurant/order/${orderId}`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Erreur dans useOrders.deleteOrder :", error);
      handleApiError(error);
    }
  }  

  // Gestion des erreurs API
  function handleApiError(error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error || "Erreur API inconnue.";
      throw { status, message };
    } else {
      throw { status: 500, message: "Erreur inattendue." };
    }
  }

  return {
    getOrders,
    getOrdersByRestaurant,
    deleteOrder
  };
};
