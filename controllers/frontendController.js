const productModel = require('../models/frontendModel')
const c =require('../helpers/common');
var crypto = require('crypto');
var nodemailer = require('nodemailer');



module.exports.home = async function(req,res,next){
    let newMenu = await productModel.newMenu();

    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    
}});

    let contentMenu = [];
    contentMenu.push({'view':'partial/nav' ,
    'data':{
    'menu':newMenu,
}});

    let newProductPC= await productModel.newProductPC();
    let newProductLaptop= await productModel.newProductLaptop();
    let content = [];
    content.push({'view':'product/productBlock' ,
    'data':{
    'productPC':newProductPC,
    'productLaptop':newProductLaptop,
    'titlePC':'PC GEARVN - MIỄN PHÍ GIAO HÀNG TOÀN QUỐC',
    'titleLaptop':'LAPTOP GAMING BÁN CHẠY'
}});

    res.render('index', {
     'content': content,
     'contentHeader':contentHeader,
     'contentMenu':contentMenu
     
    });
}


//Trang collections
module.exports.collections = async function(req,res,next){

    let categoryId = req.params.id; 

    let newProductPC= await productModel.getProductsByCat(categoryId);
    let content = [];
    content.push({'view':'product/productList' ,
    'data':{
    'productPC':newProductPC,
    'titlePC':'PC GEARVN - MIỄN PHÍ GIAO HÀNG TOÀN QUỐC',
    'titleLaptop':'LAPTOP GAMING BÁN CHẠY'
}});

    let newMenu = await productModel.newMenu();

    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});

    let contentMenu = [];
    contentMenu.push({'view':'partial/nav' ,
    'data':{
    'menu':newMenu,
}});

    res.render('collections', {
        'content': content,
        'contentMenu':contentMenu,
        'contentHeader':contentHeader
    });
}


module.exports.detail = async function(req,res,next){

    let id = req.params.id; 

    let newMenu = await productModel.newMenu();

    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});

    let contentMenu = [];
    contentMenu.push({'view':'partial/nav' ,
    'data':{
    'menu':newMenu,
}});

    let getProductDetails=await productModel.getProductDetails(id)
    let getProductDetailsImg=await productModel.getProductDetailsImg(id)

    res.render('Detail', {
        'contentMenu':contentMenu,
        'contentHeader':contentHeader,
        'getProductDetails':getProductDetails,
        'getProductDetailsImg':getProductDetailsImg
    });
}

module.exports.register = async function(req,res,next){
    let message='';

    let newMenu = await productModel.newMenu();

    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});

    res.render('Register', {
        'contentHeader':contentHeader,
        'message':message
    });
}

module.exports.doRegister = async function(req,res,next){
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});
    //
    let params=[];
    let user='user';
    let surname=req.body.surname;
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    let pass=req.body.pass;
    //cryto pass
    var sha = crypto.createHash('sha1')
    sha.update(pass);
    let p = sha.digest('hex');
/*     //cryto email
    var sha = crypto.createHash('sha1')
    sha.update(email);
    let e = sha.digest('hex'); */
    
    params.push(
      {'user':user},
      {'password':p},
      {'surname':surname},
      {'name':name}, 
      {'email':email},
      {'phone':phone},
    );

    let message='Email hoặc Số điện thoại đã được đăng ký';

    let result = await c.testphone(email,phone);
    if(result == 0){  
        await c.addRecord('users',params);
        res.redirect('/Login') 
    }else{  
        res.render('Register', {
            'contentHeader':contentHeader,
            'message':message
        });
    }
   
}

//
module.exports.login = async function(req,res,next){
    let message='';

    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});

    res.render('Login', {
        'contentHeader':contentHeader,
        'message':message
    });
}

module.exports.doLogin = async function(req,res,next){
    let message='Email hoặc Số điện thoại không đúng';
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});

     let emailOrPhone=req.body.emailOrPhone;
     let pass=req.body.pass;
     //
     var sha = crypto.createHash('sha1')
     sha.update(pass);
     let p = sha.digest('hex');


     let result = await c.doLogin(emailOrPhone,p,'user');
     if(result == 0){  
        res.render('Login', {
            'contentHeader':contentHeader,
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
       res.redirect('/')
     }
   }

   module.exports.logout = async function(req,res,next){
    req.session.destroy();
    res.redirect('/')
  }
  //
  module.exports.fogotpass = async function(req,res,next){
    let message='';

    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});

    res.render('Fogotpass', {
        'contentHeader':contentHeader,
        'message':message
    });
}
//
//
module.exports.sendMail = async function(req,res,next){
    const { email } = req.body;
    let message='Email không đúng';
    let messageT='Hãy kiểm tra email '+`${email}`+' để lấy lại mật khẩu';
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});
    //cryto email
    const randomString3 = crypto.randomBytes(16).toString('hex');
    await c.sendMailToken(randomString3,email);
    let result = await c.sendMail(email);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "phamvanquynhk44@gmail.com", // generated ethereal user
        pass: "hwosmucwvljbjipb", // generated ethereal password
      },
    });
    // send mail with defined transport object
    await transporter.sendMail(
      {
        from: "phamvanquynhk44@gmail.com", // sender address
        to: `${email}`, // list of receivers
        subject: "Lấy lại mật khẩu", // Subject line
        text: "Hello world?", // plain text body
        html: "<b><a href="+`http://localhost:3000/resetPass/${randomString3}`+"><button>Thiết lập mật khẩu</button></a></b>",
      },
    );   
    if(result == 0){  
        res.render('Fogotpass', {
            'contentHeader':contentHeader,
            'message':message
        });
     }else{
        res.render('Login', {
            'contentHeader':contentHeader,
            'message':messageT
        });
     }
}
//
module.exports.resetpass = async function(req,res,next){
    let id = req.params.id; 
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});
    let result = await c.emailVerification(id);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('Resetpass', {
        'contentHeader':contentHeader,
        'token':id,
    });
     }
}
//
module.exports.doResetpass = async function(req,res,next){
    let pass=req.body.pass;
    let token=req.body.token;
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    }});
     //
     var sha = crypto.createHash('sha1')
     sha.update(pass);
     let p = sha.digest('hex');

     let result = await c.doResetpass(p,token);
     if(result == 0){  
        res.json('Lỗi token');
     }else{
        res.redirect('/Login')
     }
   }










