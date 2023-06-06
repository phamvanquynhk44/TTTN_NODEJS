const productModel = require('../models/frontendModel')
const orderModel = require('../models/orderModel');
const c =require('../helpers/common');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

module.exports.home = async function(req,res,next){
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

    let showFavorite=await c.showFavorite(req.session.idAuthority);
    let showCategory=await productModel.showCategory('category',1);
    let showProductCategory= await productModel.showProductCategory('products',1,1);
    let showProductCategory2= await productModel.showProductCategory('products',1,2);
    let content = [];
    content.push({'view':'product/productBlock' ,
    'data':{
    'showProductCategory':showProductCategory,
    'showProductCategory2':showProductCategory2,
    'showCategory':showCategory,
    'showFavorite':showFavorite
}});

    res.render('index', {
     'content': content,
     'contentHeader':contentHeader,
     'contentMenu':contentMenu,
     'contentSlider':contentSlider,
     'tb':tb,
    });
}


//Trang collections
module.exports.collections = async function(req,res,next){
    let categoryId = req.params.id; 
    let sort = req.params.sort; 
    let whereTable="";
    let whereOrderBy="";
    if(sort==0){
        whereTable='access';
        whereOrderBy='DESC';
    }else if(sort==1){
        whereTable='price';
        whereOrderBy='ASC';
    }else if(sort==2){
        whereTable='price';
        whereOrderBy='DESC';
    }else if(sort==3){
        whereTable='product_name';
        whereOrderBy='ASC';
    }else if(sort==4){
        whereTable='product_name';
        whereOrderBy='DESC';
    }else if(sort==5){
        whereTable='updated_at';
        whereOrderBy='ASC';
    }
    else if(sort==6){
        whereTable='updated_at';
        whereOrderBy='DESC';
    }
    else if(sort==7){
        whereTable='quantity_sold';
        whereOrderBy='DESC';
    } 
    let newProductPC= await c.showAlltableOrderByProduct('products',1,categoryId,whereTable,whereOrderBy);
    let content = [];
    content.push({'view':'product/productList' ,
    'data':{
    'productPC':newProductPC,
    'titlePC':'MIỄN PHÍ GIAO HÀNG TOÀN QUỐC',
    'titleLaptop':'LAPTOP GAMING BÁN CHẠY'
}});
   
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
    'menu1':menu1
}});
    let menubaner = await c.showAlltableId('menu',1,categoryId);
    res.render('collections', {
        'content': content,
        'contentMenu':contentMenu,
        'contentHeader':contentHeader,
        'menubaner':menubaner,
        'id':categoryId,
        'sort':sort

    });
}

module.exports.doSortCollections = async function(req,res,next){
    let sort = req.body.sort; 
    let id = req.body.id; 
    res.redirect(`collections/${id}/${sort}`);
}


module.exports.detail = async function(req,res,next){

    let id = req.params.id; 
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
    'menu1':menu1
}});

    let getProductDetails=await productModel.getProductDetails(id);
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

    let menu1 = await c.showAlltable('menu1',1,'menumain');
    let newMenu = await productModel.newMenu();

    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    'menu1':menu1
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
    let pass=req.body.psw;
    //cryto pass
    var sha = crypto.createHash('sha1')
    sha.update(pass);
    let p = sha.digest('hex');
    const randomString3 = crypto.randomBytes(16).toString('hex');
/*     //cryto email
    var sha = crypto.createHash('sha1')
    sha.update(email);
    let e = sha.digest('hex'); */
    
    params.push(
      {'user':user},
      {'idAuthority':randomString3},
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
    let menu1 = await c.showAlltable('menu1',1,'menumain');

    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    'menu1':menu1
    }});

    res.render('Login', {
        'contentHeader':contentHeader,
        'message':message
    });
}

module.exports.doLogin = async function(req,res,next){
    let message='Email hoặc Số điện thoại không đúng';
    
    let menu1 = await c.showAlltable('menu1',1,'menumain');
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    'menu1':menu1,
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
       req.session.idAuthority = result[0].idAuthority;
       req.session.email = result[0].email;
       req.session.phone = result[0].phone;
       req.session.address = result[0].address;
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

    let menu1 = await c.showAlltable('menu1',1,'menumain');
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    'menu1':menu1,
    }});

    res.render('Fogotpass', {
        'contentHeader':contentHeader,
        'message':message
    });
}
//
//
module.exports.sendMail = async function(req,res,next){
    let email=req.body.email;
    let message='Email không đúng';
    let messageT='Hãy kiểm tra email '+`${email}`+' để lấy lại mật khẩu';
    let menu1 = await c.showAlltable('menu1',1,'menumain');
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    'menu1':menu1,
    }});
    const randomString3 = crypto.randomBytes(16).toString('hex');
    await c.sendMailToken(randomString3,email);
    let result = await c.sendMail(email);
    let result1 = await c.sendMail(email);
    if(result1==0){
        res.render('Fogotpass', {
            'contentHeader':contentHeader,
            'message':message
        });
    }else{

        //cryto email

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
}
//
module.exports.resetpass = async function(req,res,next){
    let id = req.params.id; 
    let menu1 = await c.showAlltable('menu1',1,'menumain');
    let newMenu = await productModel.newMenu();
    let contentHeader = [];
    contentHeader.push({'view':'partial/header' ,
    'data':{
    'menu':newMenu,
    'menu1':menu1,
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
    let pass=req.body.psw;
    let token=req.body.token;
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

   //
   module.exports.account = async function(req,res,next){
    let id = req.params.id; 
    let email = req.params.email; 
    let showOrder= await c.showOrder(email);
    let showUser = await c.showUser(id);
    if(showUser==0){
        res.json('Lỗi token');
    }
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
  let content = [];
  content.push({'view':'page/account' ,
  'data':{'showUser':showUser,'showOrder':showOrder
  ,'email':email
  ,'token':id
  }});
  res.render('Home', {
   'content': content,
   'contentHeader':contentHeader,
   'contentMenu':contentMenu
  });
}


module.exports.showOrder= async function(req,res,next){
    let token = req.params.token;
    let id = req.params.id;
    let email = req.params.email;
    let code = req.params.code;
    let showOrderDetail= await orderModel.showOrderDetail(id);
    let showOrderProduct= await orderModel.showOrderProduct();
    let result = await c.order(token);
    if(result == 0){  
        res.json('Lỗi token');
    }
    let content = [];
    content.push({'view':'page/showOrder' ,
    'data':{        
    "showOrderDetail":showOrderDetail,
    'showOrderProduct':showOrderProduct
    ,'email':email
    ,'code':code
    }});
       res.render('Home', {
        'content': content,
    });
     }


     module.exports.showAdress = async function(req,res,next){ 
        let token = req.params.token; 
        let email = req.params.email; 

        let showUserAdress= await c.showUserAdress(email,1);
        if(showUserAdress==0){
            res.json('loi');    
        }
        else{
            let content = [];
            content.push({'view':'page/showAdress' ,
            'data':{'email':email,'token':token,
            'showUserAdress':showUserAdress
            }});
            res.render('Home', {
             'content': content,
            });
        }
    }

    module.exports.doShowAdress = async function(req,res,next){ 
        let default_address1="";
        let params=[];
        let surname=req.body.surname;
        let name=req.body.name;
        let adress=req.body.adress;
        let email=req.body.email;
        let phone=req.body.phone;
        let company=req.body.company;
        let default_address=req.body.default_address;
        let token=req.body.token;
        if(default_address==undefined){
            default_address1=0;
        }else{
            await c.editDefault_address(email);
            default_address1=1;   
        }   
        params.push(
          {'user_email':email},
          {'surname':surname},
          {'name':name},
          {'adress':adress},
          {'phone':phone},
          {'company':company},
          {'default_address':default_address1},
        );
        let result = await c.addRecord('user_adress',params);
        if(result == 0){  
            res.json('loi tt');
        }else{
            res.redirect(`/showAdress/${email}/${token}`);
        }
    }



    module.exports.search = async function(req,res,next){ 
        let search1=req.params.name;
        let search = await c.search('products',1,search1);
        if(search == 0){  
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
          content.push({'view':'page/endSearch' ,
          'data':{
          }});
          res.render('cartHome', {
           'content': content,
           'contentHeader':contentHeader,
           'contentMenu':contentMenu,
           'tb':tb
          });
        }else{
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
                    content.push({'view':'page/search' ,
                    'data':{
                    'search':search,
                }});
                    res.render('Home1', {
                        'content': content,
                        'contentHeader':contentHeader,
                        'contentMenu':contentMenu,
                        'key':search1,
                        'tb':tb,
                    });
        }
  
    }


    module.exports.doSearch = async function(req,res,next){ 
        let search=req.body.search; 
        await c.search('products',1,search);
        res.redirect(`/search/${search}`);
    }


    module.exports.addFavorite = async function(req,res,next){ 
        let params=[];
        let token=req.params.token; 
        let id=req.params.id; 
        let status=req.params.status;

        params.push(
          {'user_id':token},
          {'product_id':id},
          {'status':status},
        );

       let result= await c.showTableIDAuthority('favorite',token,id);
       if(result == 0){  
            await c.addRecord('favorite',params);
            res.redirect(`/favorite/${token}`);
        }else{
            res.json('Đã theo dõi');
        }
    }


    module.exports.favorite = async function(req,res,next){ 
        let token=req.params.token; 
       let show2Table = await c.show2Table('favorite','products',token);
       if(show2Table == 0){  
            res.json('Không có gì cả');
        }else{
            res.render('page/favorite', {
                'show2Table':show2Table
            });
        }

    }


    module.exports.delFavorite = async function(req,res,next){ 
        let token=req.params.token; 
        let id=req.params.id; 
        await c.delTable('favorite',token,id);
        res.redirect(`/favorite/${token}`);
    }









