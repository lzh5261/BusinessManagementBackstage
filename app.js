//引入dib
require('./db');
// process.env.NODE_ENV = 'production';
// 引入异常捕获处理
require('express-async-errors');
let morgan = require('morgan');            //morgan中间件记录日志,可以将请求信息打印在控制台
let bodyParser = require('body-parser');  //请求体解析中间件
let config = require('./config');          //引入配置文件
let express = require('express');          //应用开发框架

let app = express();

// log中间件
app.use(morgan('combined'));

//注册自定义的中间件
app.use(require('./middleWare/res_md'));
app.use(require('./middleware/token_md'));  // token认证的中间件
app.use(require('./middleware/permission_md'));  // 权限检查的中间件

// 注册body-parser中间件  parse application/json
app.use(bodyParser.json());

// 注册路由
app.use("/user", require('./router/user'));
app.use("/category", require('./router/category'));
app.use("/product", require('./router/product'));
app.use("/order", require('./router/order'));

// 注册异常处理中间件
app.use((err, req, res, next) => {
    res.fail(err.toString())
});

//启动
app.listen(config.PORT);
