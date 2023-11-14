const User = require('../databaseModels/user');
const Collection = require('../databaseModels/collection');

module.exports.addToCollection = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const userCollection = await Collection.find({ user: user._id });
        const category = req.body.category;
        const item = req.body.item;

        if (userCollection.length === 0) {
            const newCollection = new Collection({
                user: user._id
            });

            newCollection[category].push(item);

            newCollection.save();
        } else {
            const userCategoryCollection = userCollection[0][category];

            for (let collectionItem of userCategoryCollection) {
                if (collectionItem.id === item.id) {
                    return res.status(201).send({ message: "Item already exists in your collection." });
                }
            }

            userCategoryCollection.push(item);
            userCollection[0].save();
        }

        res.send({ loggedInUserInfo: user, message: "Item successfully added to your collection." });
    }
    catch (err) {
        return next(err);
    }
}