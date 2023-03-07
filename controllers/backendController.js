
const productModel = require('../models/frontendModel')
const c =require('../helpers/common');
var crypto = require('crypto');
var nodemailer = require('nodemailer');


//
module.exports.loginAdmin = async function(req,res,next){
    let message='';

    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});

    res.render('LoginAdmin', {
        'contentHeader':contentHeader,
        'message':message
    });
}
//
module.exports.doLoginAdmin = async function(req,res,next){
    let message='Email hoặc Số điện thoại không đúng';

     let emailOrPhone=req.body.emailOrPhone;
     let pass=req.body.pass;
     //
     var sha = crypto.createHash('sha1')
     sha.update(pass);
     let p = sha.digest('hex');



     let result = await c.doLoginAdmin(emailOrPhone,p,'admin');
     if(result == 0){  
        res.render('LoginAdmin', {
            'message':message
        });
     }else{
       req.session.user = result[0].user;
       req.session.surname = result[0].surname;
       req.session.name = result[0].name;
       req.session.email = result[0].email;
       req.session.phone = result[0].phone;
       req.session.cart = result[0].cart;
       req.session.id = result[0].id;
       res.redirect(`/Admin/${p}`);
     }
   }
//
module.exports.admin= async function(req,res,next){
    let id = req.params.id; 
    let result = await c.adminp('admin',id);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('Admin', {
    });
     }
}
//