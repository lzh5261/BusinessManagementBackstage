function success(res,data){
    res.send({
        code:0,
        msg:"操作成功！",
        data:data
    })
}
function fail(res,msg){
    res.send({
        code:-1,
        msg:msg,
    })
}
module.exports = {
    success,fail
};