import axios from "axios";

export const useDishes = () => {
  const config = useRuntimeConfig();
  const urlBase = "http://localhost:2000/api/";

  const authHeader = () => {
    const token = useCookie("authToken").value;
    return { Authorization: `Bearer ${token}` };
  };

  // Fonction pour récupérer un plat par son slug
  async function getDishBySlug(slug: string) {
    try {
      const response = await axios.get(`${urlBase}dishes/${slug}`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Erreur dans useDishes.getDishBySlug :", error);
      handleApiError(error);
    }
  }

  // Fonction pour récupérer les plats d'un restaurant spécifique
  async function getDishesByRestaurant(restaurantId: number) {
    try {
      const response = await axios.get(
        `${urlBase}manage/restaurant/dishes/${restaurantId}`,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur dans useDishes.getDishesByRestaurant :", error);
      handleApiError(error);
    }
  }

  // Fonction pour ajouter un plat à un restaurant
  async function addDish(restaurantId: number, dishData: any) {
    try {
      const response = await axios.post(
        `${urlBase}manage/restaurant/dishes/${restaurantId}/new-dish`,
        dishData, // Envoyer directement l'objet en JSON
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur dans useDishes.addDish :", error);
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
    getDishBySlug,
    getDishesByRestaurant,
    addDish,
  };
};
