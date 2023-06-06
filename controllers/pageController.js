const productModel = require('../models/frontendModel');
const c =require('../helpers/common');
const cartModel = require('../models/cartModel');
//const { cart } = require('../models/cartModel');
var nodemailer = require('nodemailer');
var crypto = require('crypto');



module.exports.contact = async function(req,res,next){
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
  content.push({'view':'page/contact' ,
  'data':{
  }});
  res.render('cartHome', {
   'content': content,
   'contentHeader':contentHeader,
   'contentMenu':contentMenu,
   'tb':tb,
  });
  }

  module.exports.doContact = async function(req,res,next){
    let params=[];
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    let content=req.body.content;
    params.push(
      {'name':name},
      {'email':email},
      {'phone':phone},
      {'content':content},
      {'status':1},
    );
    let result = await c.addRecord('contact',params);
    if(result == 0){  
        res.json('loi tt');
    }else{
        res.redirect(`/contact`);
    }
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



module.exports.news = async function(req,res,next){
  let menu1 = await c.showAlltable('menu1',1,'menumain');
  let newMenu = await productModel.newMenu();
  let tb='';

  let contentHeader = [];
  contentHeader.push({'view':'../partial/header' ,
  'data':{
  'menu':newMenu,
  'menu1':menu1
}});

  
  let showNews = await c.showNews('news',1);
  if(showNews==0){
    res.json('ko co bai viet');
  }
res.render('page/news', {
  'showNews':showNews,
  'contentHeader':contentHeader,
  'tb':tb,
});
}

module.exports.newsDetail = async function(req,res,next){
  let menu1 = await c.showAlltable('menu1',1,'menumain');
  let newMenu = await productModel.newMenu();
  let tb='';

  let contentHeader = [];
  contentHeader.push({'view':'../partial/header' ,
  'data':{
  'menu':newMenu,
  'menu1':menu1
}});
  let id= req.params.id;
  let showNewsID = await c.showNewsID('news',1,id);
  if(showNewsID==0){
    res.json('ko co bai viet');
  }
res.render('page/newsDetail', {
  'showNewsID':showNewsID,
  'contentHeader':contentHeader,
  'tb':tb,
});
}