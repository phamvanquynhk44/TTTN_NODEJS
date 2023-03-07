const c =require('../helpers/common');

const paginator = require('../helpers/paginator');
const { newCategory } = require('../models/frontendModel');

const fs = require('fs');
const { email_token } = require('../helpers/common');


module.exports.notification = async function(req,res,next)
{
    let countRows_orders=await c.countRows_orders('orders','ĐƠN HÀNG MỚI');
   let show_orders = await c.show_orders('orders');
    let content = [];
    content.push({'view':'orders_details/notification' , 'data':{
        'show_orders':show_orders,
        'countRows_orders':countRows_orders
}});
res.render('backend/index',{'content':content,
    'countRows_orders':countRows_orders,
});
}
module.exports.form = async function(req,res,next)
{
    let order_code=req.params.id;
   let show_orders_code = await c.show_orders_code('orders',order_code);
   let show_tt = await c.show_tt('orders',order_code);
    let content = [];
    content.push({'view':'orders_details/form' , 'data':{
    'show_orders_code':show_orders_code,
    'show_tt':show_tt,
}});
res.render('backend/index',{'content':content
});
}
//
module.exports.thongke = async function(req,res,next)
{
    let content = [];
    content.push({'view':'orders_details/thongke' , 'data':{
}});
res.render('backend/index',{'content':content
});
}
//
module.exports.phanhoi = async function(req,res,next)
{
   // let contact_name=req.body.name;
  //  let email=req.body.email;
  let dem_phanhoi = await c.countRows_contact('contact');
   let phanhoi = await c.phanhoi('contact');
    let content = [];
    content.push({'view':'orders_details/phanhoi' , 'data':{
        'phanhoi':phanhoi,
        'dem_phanhoi':dem_phanhoi,
}});
res.render('backend/index',{'content':content
});
}
//
module.exports.formphanhoi = async function(req,res,next)
{
    let email =req.params.id;
    let phanhoi = await c.formphanhoi('contact',email);
    let content = [];
    content.push({'view':'orders_details/formphanhoi' , 'data':{
        'phanhoi':phanhoi
}});
res.render('backend/index',{'content':content
});
}