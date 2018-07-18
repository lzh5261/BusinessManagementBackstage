let categoryService = require('../service/category');
let router = require('express').Router();

router.get('/',async (req,res)=>{
   let categorys = await categoryService.getCategorysByPage(req.query.page);
    res.success(categorys);
});
router.post('/',async (req,res)=>{
    let c = await categoryService.addCategory(req.body);
    res.success(c);
});
router.put('/:id',async (req,res)=>{
    await categoryService.updateCategory(req.params.id,req.body);
    res.success();
});
router.delete('/:id',async (req,res)=>{
    await categoryService.deleteCategory(req.params.id);
    res.success();
});

module.exports = router;