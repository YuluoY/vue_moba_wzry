module.exports = app => {
    const express = require('express');
    const path = require('path');
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser');

    const router = express.Router({
        mergeParams: true // 将参数合并router中
    });
    const auth = require('../../middleware/auth');
    const resource = require('../../middleware/resource');
    // 登录校验中间件
    // const authMiddleware = async (req, res, next) => {
    //     try {
    //         const token = String(req.headers.authorization).split(' ').pop();
    //         const {id} = jwt.verify(token, app.get('secret')); // 把token分解成id和key
    //         req.user = await AdminUser.findById(id);
    //         await next();
    //     } catch (error) {
    //         assert(req.user, 401, '请先登录！');
    //     }
    // }
    // const resourceMiddleware = async (req, res, next) => {
    //     // 将categories ==> Category
    //     const modelName = require('inflection').classify(req.params.resource);
    //     req.Model = require(`../../models/${modelName}`);
    //     next();
    // }

    // 通用CRUD接口
    // 获取数据
    router.get('/', async (req, res) => {
        let items;
        let queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent';
        }

        if (req.query.id) {
            items = await req.Model.findById(req.query.id);
        } else {
            items = await req.Model.find().setOptions(queryOptions).limit(1000);
        }
        res.send(items);
    });
    // // 添加一条分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });
    // 通过id更新一条数据
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });
    // 通过id删除一条分类
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndRemove(req.params.id, req.body);
        res.send(model);
    });


    app.use('/admin/api/rest/:resource', auth(), resource(), router);

    // Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
    const multer = require('multer');
    const upload = multer({
        dest: path.join(__dirname, '/../../uploads')
    });
    app.post('/admin/api/upload', auth(), upload.single('file'), async (req, res) => {
        let file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file);
    })


    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password
        } = req.body;
        // 1、根据用户名找用户
        const user = await AdminUser.findOne({
            username
        }).select('+password');
        assert(user, 422, '小落：找不到这个用户,换一个吧😟！');
        // if (!user) {
        //     res.status(422).send({
        //         message: '用户不存在！'
        //     })
        // }

        // 2、校验密码
        // console.log(user.password); // 如果想知道加密后的密码，需要设置mongoose中的select配置项
        const checked = require('bcrypt').compareSync(password, user.password)
        assert(checked, 422, '小落：找到了你,可是密码错了诶😥！');
        // if (!checked) {
        //     return res.status(422).send({
        //         message: '密码错误！'
        //     })
        // }

        // 3、返回token
        // 自定义的key生成一个签证
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'));
        res.send({
            token
        });
    })


    // 错误处理中间件
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })


    // #region
    // （基操）
    // 更新一条数据
    // router.put('/categories/:id', async (req, res, next) => {
    //     const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    //     res.send(model);
    // });

    // // 读取所有数据
    // router.get('/categories', async (req, res, next) => {
    //     // populate：有parent关联字段就取出，将关联的字段变成对象。如果不加，则只会copy关联字段的id。
    //     // 简单来说：就是将关联字段copy成了一个对象，并赋值给了parent字段。
    //     const items = await Category.find().populate('parent').limit(10);
    //     res.send(items);
    // });

    // // 通过id查询出要编辑的字段然后返回，作用：让需要编辑的内容显示在输入框中。
    // router.get('/categories/:id', async (req, res, next) => {
    //     const model = await Category.findById(req.params.id);
    //     res.send(model);
    // });

    // // 添加一条分类
    // router.post('/categories', async (req, res, next) => {
    //     const model = await Category.create(req.body);
    //     res.send(model);
    // });

    // // 删除一条分类
    // router.delete('/delCatetory/:id', async (req, res, next) => {
    //     const model = await Category.findByIdAndRemove(req.params.id, req.body);
    //     res.send(model);
    // });
    // # endregion
    return router;
}