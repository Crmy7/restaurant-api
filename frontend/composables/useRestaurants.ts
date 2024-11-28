import axios from "axios";

export const useRestaurants = () => {
  const config = useRuntimeConfig();
  const urlBase = "http://localhost:2000/api/";

  const authHeader = () => {
    const token = useCookie("authToken").value;
    return { Authorization: `Bearer ${token}` };
  };

  // Fonction pour récupérer les restaurants
  async function getRestaurants() {
    try {
      const response = await axios.get(`${urlBase}restaurants`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Erreur dans useRestaurants.getRestaurants :", error);
      handleApiError(error);
    }
  }

  // Fonction pour récupérer un restaurant par son slug
  async function getRestaurantBySlug(slug: string) {
    try {
      const response = await axios.get(`${urlBase}restaurants/${slug}`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      console.error("Erreur dans useRestaurants.getRestaurantBySlug :", error);
      handleApiError(error);
    }
  }

  // Récupérer les informations du restaurant lié à l'utilisateur connecté
  async function getRestaurantByUser() {
    try {
      const response = await axios.get(`${urlBase}manage/restaurant/my-restaurant`, {
        headers: authHeader(),
      });
      console.log("Info restau", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur dans useRestaurants.getRestaurantByUser :", error);
      handleApiError(error);
    }
  }

  // Modifier les informations d'un restaurant
  async function editRestaurant(updateData: any) {
    try {
      const response = await axios.patch(
        `${urlBase}manage/restaurant/my-restaurant`,
        updateData,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur dans useRestaurants.editRestaurant :", error);
      handleApiError(error);
    }
  }

  // Fonction pour ajouter un nouveau restaurant
  async function addRestaurant(newRestaurant: Record<string, any>) {
    try {
      const response = await axios.post(
        `${urlBase}admin/restaurants/new-restaurant`,
        newRestaurant,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erreur dans useRestaurants.addRestaurant :", error);
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
    getRestaurants,
    getRestaurantBySlug,
    getRestaurantByUser,
    editRestaurant,
    addRestaurant,
  };
};
