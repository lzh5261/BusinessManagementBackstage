let mongoose = require('mongoose');  //建模，指定模型
let schema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,'用户名不能为空！']
    },
    password:{
        type:String,
        required:[true,'密码不能为空！']
    },
    age:{
        type:Number,
        min:[0,'年龄不能小于0！'],
        max:[120,'年龄不能大于120！'],
        default: 18
    },
    role:{
        type:Number,
        default:0   //0表示普通商家，1表示超级管理员
    },
    createdTime:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users', schema);