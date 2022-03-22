const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// const crypto = require('crypto')

const schema = new mongoose.Schema({
    username: { type: String },
    password: { type: String , 
        select: false, // 不显示密码，且密码只会打散一次。
        set(val){  // 不可逆加密
        // let hash = crypto.createHash('sha256');
        // return hash.update(val, 'utf-8').digest('hex');
        return bcrypt.hashSync(val, 10);
    }}
});

module.exports = mongoose.model('AdminUser', schema);