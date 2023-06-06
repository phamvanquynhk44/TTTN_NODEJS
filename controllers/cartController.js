const productModel = require('../models/frontendModel');
const c =require('../helpers/common');
const cartModel = require('../models/cartModel');
//const { cart } = require('../models/cartModel');
var nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
var crypto = require('crypto');
module.exports.addToCart = async function(req,res,next){
    if(req.session.cart==undefined){
      req.session.cart=[];
      req.session.amount=[];
      req.session.numberOfItem=0;
    }
    let id= req.params.id;
    k=req.session.cart.findIndex(function(v){return id==v});

    if(k== -1){
      req.session.cart.push(id);
      req.session.amount.push(1);
      req.session.numberOfItem++;

    }else{
      req.session.amount[k]++;
    }
    /* res.send(req.session); */
    res.redirect('/showCart');
}

module.exports.delCart = async function(req,res,next){
  if(req.session.cart==undefined){
    req.session.cart=[];
    req.session.amount=[];
    req.session.numberOfItem=0;
  }
  let id= req.params.id;
  k=req.session.cart.findIndex(function(v){return id==v});

  delete req.session.cart[id];
  delete req.session.amount[id];
  req.session.numberOfItem--;
/* 
  res.send(req.session); */
  res.redirect('/showCart');
}


module.exports.updateCart = async function(req,res,next){
  if(req.session.cart==undefined){
    req.session.cart=[];
    req.session.amount=[];
    req.session.numberOfItem=0;
  }
  let id= req.body.id;
  let qty= req.body.qty;
  k=req.session.cart.findIndex(function(v){return id==v});

  req.session.amount[id]=qty;
 /*  res.send(req.session); */
  res.redirect('/showCart');
}


module.exports.delAllCart = async function(req,res,next){
    req.session.cart=[];
    req.session.amount=[];
    req.session.numberOfItem=0;
    res.redirect('/showCart');
}

//giỏ hàng
//
module.exports.doKeyShowCart = async function(req,res,next){
    const randomString3 = crypto.randomBytes(16).toString('hex');
    res.redirect(`/infoCart/${randomString3}`);
  }
//
module.exports.showCart = async function(req,res,next){
  let menu1 = await c.showAlltable('menu1',1,'menumain');
  let newMenu = await productModel.newMenu();
    let tb='';

    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    'menu1':menu1
}});
    
    let contentMenu = [];
    contentMenu.push({'view':'partial/nav' ,
    'data':{
    'menu':newMenu,
    'menu1':menu1
}});

    let slider = await c.showAlltable('slider',1,'slidermain');
    let contentSlider=[];
    contentSlider.push({'view':'partial/slidershow' ,
    'data':{
    'slider':slider,
}});
if(req.session.cart==undefined){
  res.json('ko co gi');
  cart = await cartModel.cart(0);
}
else{
  cart = await cartModel.cart(req.session.cart);
}
let content = [];
content.push({'view':'page/cart' ,
'data':{'cart':cart
}});

res.render('cartHome', {
 'content': content,
 'contentHeader':contentHeader,
 'contentMenu':contentMenu,
 'tb':tb
});
}

module.exports.infoCart = async function(req,res,next){
  let token=req.params.id;
  let menu1 = await c.showAlltable('menu1',1,'menumain');
  let newMenu = await productModel.newMenu();
  let tb='';

  let contentHeader = [];
  contentHeader.push({'view':'partial/header' ,
  'data':{
  'menu':newMenu,
  'menu1':menu1
}});
 
  let contentMenu = [];
  contentMenu.push({'view':'partial/nav' ,
  'data':{
  'menu':newMenu,
  'menu1':menu1
}});

  let slider = await c.showAlltable('slider',1,'slidermain');
  let contentSlider=[];
  contentSlider.push({'view':'partial/slidershow' ,
  'data':{
  'slider':slider,
}});
if(req.session.cart==undefined){
  res.redirect('/');
}
else{
  cart = await cartModel.cart(req.session.cart);
}
let content = [];
content.push({'view':'page/infoCart' ,
'data':{'cart':cart,
'token':token
}});
res.render('cartHome', {
 'content': content,
 'contentHeader':contentHeader,
 'contentMenu':contentMenu,
 'tb':tb
});
}

module.exports.sendMailCart = async function(req,res,next){
  const { email } = req.body;
  const { token } = req.body;
  let menu1 = await c.showAlltable('menu1',1,'menumain');
  let newMenu = await productModel.newMenu();
  let contentHeader = [];
  contentHeader.push({'view':'partial/header' ,
  'data':{
  'menu':newMenu,   
  'menu1':menu1 
}});
  let contentMenu = [];
  contentMenu.push({'view':'partial/nav' ,
  'data':{
  'menu':newMenu,
}});
let content = [];
content.push({'view':'page/messageCart' ,
'data':{
}});
  //cryto email
  const randomString3 = crypto.randomBytes(16).toString('hex');
  await c.sendMailToken(randomString3,email);
  let result = await c.sendMail(email);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "phamvanquynhk44@gmail.com",
      pass: "hwosmucwvljbjipb",
    },
  });
  await transporter.sendMail(
    {
      from: "phamvanquynhk44@gmail.com",
      to: `${email}`, 
      subject: "XÁC NHẬN ĐƠN HÀNG",
      text: "Hello world?",
      html: "<b><a href="+`http://localhost:3000/checkoutCart/${randomString3}`+"><button>Xác nhận</button></a></b>",
    },
  );   
  if(result == 0){  
      res.json('lỗi');
   }else{
    res.render('cartHome', {
      'content': content,
      'contentHeader':contentHeader,
      'contentMenu':contentMenu
     });
   }
}
///
module.exports.checkoutCart = async function(req,res,next){
  let token=req.params.token;
  let userConfirm = await c.userConfirm(token);
  if(userConfirm==0){
    res.json('Lỗi token');
  }
  let menu1 = await c.showAlltable('menu1',1,'menumain');
  let newMenu = await productModel.newMenu();
  let tb='';

  let contentHeader = [];
  contentHeader.push({'view':'partial/header' ,
  'data':{
  'menu':newMenu,
  'menu1':menu1
}});

  let contentMenu = [];
  contentMenu.push({'view':'partial/nav' ,
  'data':{
  'menu':newMenu,
  'menu1':menu1
}});

  let slider = await c.showAlltable('slider',1,'slidermain');
  let contentSlider=[];
  contentSlider.push({'view':'partial/slidershow' ,
  'data':{
  'slider':slider,
}});
if(req.session.cart==undefined){
  res.redirect('/');
}
else{
  cart = await cartModel.cart(req.session.cart);
}
let content = [];
content.push({'view':'page/checkoutCart' ,
'data':{'cart':cart,
'token':token
}});
res.render('cartHome', {
 'content': content,
 'contentHeader':contentHeader,
 'contentMenu':contentMenu,
 'tb':tb
});
}

//////
module.exports.saveCart = async function(req,res,next){
  let email=req.body.email;
  let token=req.body.token;
  let idAuthority=req.body.idAuthority;
  let payment=req.body.payment;

  let nameOrder=req.body.nameOrder;
  let sumOrder=req.body.sumOrder;
  let infoMail=[];
  infoMail.push(
    {'<h2>ĐƠN HÀNG ĐÃ MUA</h2>':'<h3>Tên sản phẩm:</h3> <p></p>'+nameOrder}, 
    {'':'<h3>Tổng tiền đơn hàng:</h3> '+sumOrder+' vnđ'},
  );

  if(payment==1){
    let order=[];
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    let address=req.body.address;
    let payment=req.body.payment;
    let delivered='0';
    order.push(
      {'fullname':name}, 
      {'email':email},
      {'phone':phone},
      {'address':address},
      {'order_code':token},
      {'payment':payment},
      {'delivered':delivered},
    );
    await c.addRecord('orders',order);
    let lastId = await c.lastId('orders');
    let order_id=lastId[0].id;
  
    let shopCart= req.session.cart;
    let a=req.session.amount;
    let n=shopCart.length;
  
    let detail=[];
    for(i=0;i<n;i++){
      let productId=shopCart[i];
      let qty=a[i];
      detail.push(order_id,productId,qty);
    }
    await cartModel.addDetail(detail);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "phamvanquynhk44@gmail.com",
        pass: "hwosmucwvljbjipb",
      },
    });

    let MailGenerator = new Mailgen({
      theme: "default",
      product : {
          name: "GEARQ",
          link : 'http://localhost:3000/'
      }
  })

  let response = {
      body: {
          name : `${name}`,
          intro: "Đơn hàng của bạn vừa mua",
          table : {
              data : 
              infoMail
          },
          outro: "Cảm ơn bạn đã mua hàng"
      }
  }

  let mail = MailGenerator.generate(response)

    await transporter.sendMail(
      {
        from: "phamvanquynhk44@gmail.com",
        to: `${email}`, 
        subject: "ĐƠN HÀNG CỦA BẠN",
        text: "Hello world?",
        html: mail
      },
    ); 
    cart = await cartModel.cart(req.session.cart);
    console.log(response);

    req.session.cart=[];
    req.session.amount=[];
    req.session.numberOfItem=0;
    res.redirect('/endCart');
    }else if(payment==2){
      let checkUser = await c.checkUser('password_otp','users',1,email);
      let check=checkUser[0].password_otp;
      if(check==0){
        res.redirect(`/createOTP/${idAuthority}/${token}`);
      }else{
        res.redirect(`/enterOTP/${idAuthority}/${token}`);
      }
    }
}
////

module.exports.createOTP = async function(req,res,next){
  let id=req.params.id;
  let token=req.params.token;
  let showUser = await c.showUser(id);
  if(showUser==0){
    res.json('Lỗi token');
  }
if(req.session.cart==undefined){
  res.redirect('/');
}
else{
  cart = await cartModel.cart(req.session.cart);
}
let content = [];
content.push({'view':'page/createOTP' ,
'data':{'cart':cart,
'token':token,
'idAuthority':id
}});
res.render('Home', {
'content': content,
});
}
///
module.exports.doCreateOTP = async function(req,res,next){
  let OTP1=req.body.OTP1;
  let OTP2=req.body.OTP2;
  let OTP3=req.body.OTP3;
  let OTP4=req.body.OTP4;
  let OTP5=req.body.OTP5;
  let token=req.body.token;
  let idAuthority=req.body.idAuthority;
  let codeOTP=OTP1+OTP2+OTP3+OTP4+OTP5;
  var sha = crypto.createHash('sha1')
  sha.update(codeOTP);
  let p = sha.digest('hex');
  await c.updateUsers('users',1,p,idAuthority);
  res.redirect(`/infoCart/${token}`);
}
////
module.exports.enterOTP = async function(req,res,next){
  let id=req.params.id;
  let token=req.params.token;
  let showUser = await c.showUser(id);
  if(showUser==0){
    res.json('Lỗi token');
  }
if(req.session.cart==undefined){
  res.redirect('/');
}
else{
  cart = await cartModel.cart(req.session.cart);
}
let content = [];
content.push({'view':'page/enterOTP' ,
'data':{'cart':cart,
'token':token,
'idAuthority':id
}});
res.render('Home', {
'content': content,
});
}
////
///
module.exports.doEnterOTP = async function(req,res,next){
  let OTP1=req.body.OTP1;
  let OTP2=req.body.OTP2;
  let OTP3=req.body.OTP3;
  let OTP4=req.body.OTP4;
  let OTP5=req.body.OTP5;
  let token=req.body.token;
  let idAuthority=req.body.idAuthority;
  let codeOTP=OTP1+OTP2+OTP3+OTP4+OTP5;
  var sha = crypto.createHash('sha1')
  sha.update(codeOTP);
  let p = sha.digest('hex');
  let checkPassOTP=await c.checkPassOTP(1,p,idAuthority);
  if(checkPassOTP==0){
    res.redirect(`/infoCart/${token}`);
  }else{
    let order=[];
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    let address=req.body.address;
    let payment=req.body.payment;
    let delivered="";
    if(payment==1){
      delivered = 0;
    }
    order.push(
      {'fullname':name}, 
      {'email':email},
      {'phone':phone},
      {'address':address},
      {'order_code':token},
      {'payment':payment},
      {'delivered':delivered},
    );
    await c.addRecord('orders',order);
    let lastId = await c.lastId('orders');
    let order_id=lastId[0].id;
  
    let shopCart= req.session.cart;
    let a=req.session.amount;
    let n=shopCart.length;
  
    let detail=[];
    for(i=0;i<n;i++){
      let productId=shopCart[i];
      let qty=a[i];
      detail.push(order_id,productId,qty);
    }
    await cartModel.addDetail(detail);
    req.session.destroy();
    res.redirect('/endCart');
  } 
}
////



module.exports.endCart = async function(req,res,next){
  let menu1 = await c.showAlltable('menu1',1,'menumain');
  let newMenu = await productModel.newMenu();
  let tb='';

  let contentHeader = [];
  contentHeader.push({'view':'partial/header' ,
  'data':{
  'menu':newMenu,
  'menu1':menu1
}});
  
  let contentMenu = [];
  contentMenu.push({'view':'partial/nav' ,
  'data':{
  'menu':newMenu,
  'menu1':menu1
}});

  let slider = await c.showAlltable('slider',1,'slidermain');
  let contentSlider=[];
  contentSlider.push({'view':'partial/slidershow' ,
  'data':{
  'slider':slider,
}});
let content = [];
content.push({'view':'page/endCart' ,
'data':{
}});
res.render('cartHome', {
 'content': content,
 'contentHeader':contentHeader,
 'contentMenu':contentMenu,
 'tb':tb
});
}

