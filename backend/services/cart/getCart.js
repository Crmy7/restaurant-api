const Cart = require("../../models/Cart");
const CartDishes = require("../../models/CartDishes");

module.exports = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { UserId: userId },
            include: CartDishes,
        });

        return cart ? cart : { message: "Panier vide ou utilisateur introuvable." };
    } catch (error) {
        console.error(error);
        return { message: "Une erreur s'est produite lors de la récupération du panier." };
    }
};