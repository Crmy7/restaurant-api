const Cart = require("../../models/Cart");
const CartDishes = require("../../models/CartDishes");

module.exports = async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { UserId: userId } });

        if (!cart) {
            throw new Error("Panier introuvable.");
        }

        const cartDish = await CartDishes.findOne({
            where: { CartId: cart.id, DishId: dishId },
        });

        if (!cartDish) {
            throw new Error("Plat introuvable dans le panier.");
        }

        await cartDish.destroy();
        res.status(200).send({ message: "Plat retiré du panier avec succès." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};