
const orderModel = require('../models/orderModel');

const c =require('../helpers/common');



module.exports.order= async function(req,res,next){
    let token = req.params.token; 
    let showOrder= await orderModel.showOrder(0);
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/order/order', {
        "showOrder":showOrder,
        "token":token
    });
     }
}

module.exports.orderDetail= async function(req,res,next){
    let token = req.params.token;
    let id = req.params.id;
    let showOrderDetail= await orderModel.showOrderDetail(id);
    let showOrderProduct= await orderModel.showOrderProduct();

    let showOrderId= await orderModel.showOrderId(id);

    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/order/orderDetail', {
        "showOrderDetail":showOrderDetail,
        'showOrderProduct':showOrderProduct,
        "token":token,
        "showOrder":showOrderId,
        'id':id
    });
     }
}


module.exports.orderStatus= async function(req,res,next){
    let token = req.params.token;
    let id = req.params.id;
    let status = req.params.status;
    let delivered = req.params.delivered;

    let i = await orderModel.UpdateOrder('orders',status,delivered,id);
  
res.redirect(`/orderDetail/${token}/${id}`);
}
