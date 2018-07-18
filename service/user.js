let User = require('../model/user');
let crypto = require('lxj-crypto');
let config = require('../config');

// 获取用户信息
async function getUserInfo(username) {
    let res = await User.findOne({username:username}).select("-__v -password");
    //判断用户是否存在
    if (!res){
        throw Error(`用户名${username}不存在！`);
    }
    return res;
}
// 删除用户
async function deleteUser(username) {
    await isExist(username);
    // res: {n:1, mModify:1, ok: 1}
    let res = await User.deleteOne({username:username});
    if (n<1){
        throw Error("删除失败");
    }
}
// 注册 user: { username: xxx, password: xx, age: 11, role: 100}
async function registerUser(user) {
    //判断用户是否存在
    let res = await User.findOne({username:user.username}).select('-password');
    if (res){
        throw Error(`用户名${user.username}已经存在！`);
    }
    //密码加密的操作
    user.password = crypto.sha256Hmac(user.password,user.username);
    user.role = 0;  //默认是商家用户
    // 存库操作
    res = await User.create(user);
    res.password = '';
    return res;
}
// 登录 user: {username: xxx, password: 'xxx'}
async function loginUser(user) {
    //对密码进行加密，加密算法和注册的一样
    user.password = crypto.sha256Hmac(user.password,user.username);
    //查询账户是否存在
    let res = await User.findOne({username:user.username,password:user.password});
    if (!res){
        throw Error("用户名或者密码错误");
    }
    //若账户存在则给用户生成一个token,AES算法生成
    let tokeData = {
        username:user.username,
        expires:Date.now() + config.TokenExpire
    };
    let token = crypto.aesEncrypt(JSON.stringify(tokeData),config.TokenKey);
    return token;
}


//判断用户是否存在
async function isExist(username) {
    let res = await User.findOne({username:username});
    if (!res){
        throw Error(`用户名${username}不存在！`);
    }
}

module.exports = {
    registerUser,
    getUserInfo,
    deleteUser,
    loginUser
};