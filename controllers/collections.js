const User = require('../databaseModels/user');
const Collection = require('../databaseModels/collection');
const AppError = require('../errorHandling/AppError');

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

module.exports.getUserCollection = async (req, res, next) => {
    try {
        const category = req.query.category;
        const userCollection = await Collection.find({ user: req.user._id });

        if (userCollection.length === 0) {
            res.send([]);
        }
        else {
            res.send(userCollection[0][category]);
        }
    }
    catch (err) {
        return next(err);
    }
}

module.exports.removeFromCollection = async (req, res, next) => {
    const category = req.body.category;
    const id = req.body.id;

    try {
        const user = await User.findById(req.user._id);
        const userCollection = await Collection.find({ user: user._id });
        
        if (userCollection.length === 0) {
            next(new AppError(404, 'Item does not exist in your collection.'));
        }

        const indexToRemove = userCollection[0][category].findIndex((item) => item.id === id);

        if (indexToRemove === -1) {
            next(new AppError(404, 'Item does not exist in your collection.'));
        }

        userCollection[0][category].splice(indexToRemove, 1);
        await userCollection[0].save();
        res.send("Item successfully removed from your collection.");
    }
    catch (err) {
        return next(err);
    }
}