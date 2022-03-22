module.exports = options => {
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../models/AdminUser');

    return async (req, res, next) => {
        try {
            const token = String(req.headers.authorization).split(' ').pop();
            const {
                id
            } = jwt.verify(token, req.app.get('secret')); // 把token分解成id和key
            req.user = await AdminUser.findById(id);
            await next();
        } catch (error) {
            assert(req.user, 401, '请先登录！');
        }
    }
}