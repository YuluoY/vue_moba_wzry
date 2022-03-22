module.exports = options => {

    return async (req, res, next) => {
        // 将categories ==> Category
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../models/${modelName}`);
        next();
    }
}