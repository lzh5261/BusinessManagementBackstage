
// 一般我们通过环境变量来切换当前的配置文件
// process.env.NODE_ENV = 'development'  'production'

let config = null;
// 默认是不成立的，所以会走开发环境的配置
if (process.env.NODE_ENV === 'production'){
    config = require('./prod');
}else{
    config = require('./dev');

}
module.exports = config;