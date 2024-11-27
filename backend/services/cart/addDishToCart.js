const Cart = require("../../models/Cart");
const CartDishes = require("../../models/CartDishes");

module.exports = async (req, res) => {
    try {
        const userId = req.user.id; // Récupération de l'ID de l'utilisateur à partir du token
        const { dishId, quantity } = req.body; // Récupération des données depuis la requête

        // Vérifier si le panier existe pour cet utilisateur
        let cart = await Cart.findOne({ where: { UserId: userId } });

        // Si pas de panier pour cet utilisateur, le créer
        if (!cart) {
            cart = await Cart.create({ UserId: userId });
        }

        // Vérifier si le plat existe déjà dans le panier
        const cartDish = await CartDishes.findOne({
            where: { CartId: cart.id, DishId: dishId },
        });

        // Si le plat existe, mettre à jour la quantité
        if (cartDish) {
            cartDish.quantity += quantity;
            await cartDish.save();
        } else {
            // Si le plat n'existe pas, l'ajouter au panier avec la quantité
            await CartDishes.create({
                CartId: cart.id,
                DishId: dishId,
                quantity: quantity,
            });
        }

        // Retourner une réponse avec un message de succès
        return res.status(200).json({ message: "Plat ajouté au panier avec succès.", cart });
    } catch (error) {
        console.error("Erreur lors de l'ajout du plat au panier:", error);
        // Assurez-vous d'envoyer une réponse même en cas d'erreur
        if (res && typeof res.status === 'function') {
            return res.status(500).json({ error: "Erreur interne du serveur" });
        } else {
            throw new Error("Invalid response object");
        }
    }
};
