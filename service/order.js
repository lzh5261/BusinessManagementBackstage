let Order = require('../model/order');
let config = require('../config');
let productService = require('../service/product');
let Big = require('big.js');

/**
 * 分页获取订单信息
 * @param page //默认它等于1
 * @returns {Promise<void>}
 */
async function getOrdersByPage(page = 1) {
    return await Order.find().skip((page-1)*config.PageCount).limit(config.PageCount).sort("created")/select("-__v");
}

/**
 * 删除订单
 * order: {productId: 'cccc', count: 2}
 * @param order
 * @returns {Promise<*>}
 */
async function addOrder(order) {
    // 1.判断productId是否存在
    let res = await productService.getProductById(order.productId);
    if (!res){
        throw Error(`商品订单号${order.productId}不存在`);
    }
    //2.库存判断
    if (res.stock < res.count){
        throw Error("商品库存不足！");
    }
    //3.给order的字段进行复制
    order.productName = res.name;
    order.productPrice = res.price;
    order.totalPrice = Big(order.productPrice).times(order.count);
    let ord = await Order.create(order);
    //4. 减库存
    await productService.updateProduct(res._id, {stock: res.stock-order.count});
    return ord;
}

module.exports = {
    addOrder,
    getOrdersByPage
};
