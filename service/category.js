let Category = require('../model/category');
let config = require('../config');

/**
 * 分页查询分类的数据
 * @param page
 * @returns {Promise<void>}
 */
async function getCategorysByPage(page = 1) {
    return await Category.find().skip(config.PageCount * (page - 1)).limit(PageCount).sort("created").select("-__v");
}

/**
 * 增加分类
 * category: {name: "服装"}
 * @param category
 * @returns {Promise<void>}
 */
async function addCategory(category) {
    return await Category.create(category);
}

/**
 * 删除分类
 * @param id
 * @returns {Promise<void>}
 */
async function deleteCategory(id) {
    //判断id是否存在
    await isExist(id);
    //删除， res: {n:1, mModify:1, ok: 1}
    let res = await Category.deleteOne({_id: id});
    if (res.n < 1) {
        throw Error("删除失败！");
    }
}

/**
 * 更新分类
 * @param id
 * @param update
 * @returns {Promise<void>}
 */
async function updateCategory(id,update) {
    //判断id是否存在
    await isExist(id);
    //删除， res: {n:1, mModify:1, ok: 1}
    let res = await Category.updateOne({_id: id},update);
    if (res.n < 1) {
        throw Error("更新失败！");
    }
}

//判断id是否存在
async function isExist(id) {
    let res = await Category.findOne({_id: id});
    if (!res) {
        throw Error(`id为【${id}】的分类不存在！`);
    }
}

module.exports = {
    getCategorysByPage,
    addCategory,
    updateCategory,
    deleteCategory
};