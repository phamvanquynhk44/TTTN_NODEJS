
const productModel = require('../models/frontendModel')
const c =require('../helpers/common');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const fs = require('fs');


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
       req.session.idAuthority = result[0].idAuthority;
       req.session.surname = result[0].surname;
       req.session.name = result[0].name;
       req.session.email = result[0].email;
       req.session.phone = result[0].phone;
       req.session.cart = result[0].cart;
       req.session.id = result[0].id;
       res.redirect(`/Admin/${result[0].idAuthority}`);
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
        "token":id,
    });
     }
}
//
module.exports.catalog= async function(req,res,next){
    let id = req.params.id; 
    let catalog= await c.catalog(0);
    let allCat= await c.catalog(0);
    let result = await c.adminp('admin',id);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/category/catalog', {
        "catalog":catalog,
        "allCat":allCat,
        "token":id
    });
     }
}

module.exports.catalogAdd= async function(req,res,next){
    let token = req.params.token; 
    let allCat= await c.catalog();
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/category/catalogAdd', {
        "token":token,
        "allCat":allCat,
    });
     }
}

module.exports.doCatalogAdd = async function(req,res,next){
    let token=req.body.token;

    let file = req.files[0];
    await fs.rename(file.path, `public/img/logo/${file.originalname}`, function(err){});
     let params = [];
     let name=req.body.name;
     let parent=req.body.parent;
     let status=req.body.status;

     params.push(
        {'menu_name':name},
        {'parent':parent},
        {'status':status},   
        {'img_logo_menu':file.originalname},     
); 

let item = await c.addRecord('menu', params);
res.redirect(`/catalog/${token}`);
}

module.exports.catalogStatus = async function(req,res,next){
    let id = req.params.id; 
    let tt = req.params.tt; 
    let token = req.params.token; 
    if(tt==0){
        await c.catalogStatus(id, 1);
    }else{
        await c.catalogStatus(id, 0);
    }
res.redirect(`/catalog/${token}`);
}

module.exports.catalogDelete = async function(req,res,next){
    let id = req.params.id; 
    let token = req.params.token; 
    await c.catalogDelete(id,1);
    res.redirect(`/catalog/${token}`);
}


module.exports.catalogTrash= async function(req,res,next){
    let id = req.params.token; 
    let catalog= await c.catalog(1);
    if(catalog==0){
        res.render('backend/category/catalogTrashNull', {
            "token":id
        });
    }
    else{
        let allCat= await c.catalog(1);
        let result = await c.adminp('admin',id);
        if(result == 0){  
            res.json('Lỗi token');
         }else{
           res.render('backend/category/catalogTrash', {
            "catalog":catalog,
            "allCat":allCat,
            "token":id
        });
         }
    }

}

module.exports.catalogTrashRestore = async function(req,res,next){
    let id = req.params.id; 
    let token = req.params.token; 
    await c.catalogDelete(id,0);
    res.redirect(`/catalog/${token}`);
}

module.exports.catalogTrashDestroy = async function(req,res,next){
    let id = req.params.id; 
    let token = req.params.token; 
    await c.catalogTrashDestroy(id);
    res.redirect(`/catalog/${token}`);
}


module.exports.catalogEdit= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let allCat= await c.catalog();
    let catalogEdit= await c.catalogEdit(0,id);
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/category/catalogEdit', {
        "token":token,
        "id":id,
        "allCat":allCat,
        "catalogEdit":catalogEdit
    });
     }
}

module.exports.doCatalogEdit = async function(req,res,next){
    let id=req.body.id;
    let token=req.body.token;
    let name=req.body.name;
    let parent=req.body.parent;
    let img=req.body.img;
    let file = req.files[0];
    if(file == undefined){
        await c.doCatalogEdit(name,parent,id,img);
    }else{
        await fs.rename(file.path,`public/img/logo/${file.originalname}`, function(err){});
        await c.doCatalogEdit(name,parent,id,file.originalname);
    }  

res.redirect(`/catalog/${token}`);
}



///////////
module.exports.product= async function(req,res,next){
    let id = req.params.id; 
    let allCat= await c.catalog(0);
    let demsp=await c.demsp();
    let productBackend= await c.productBackend(0);
    let allproductBackend= await c.productBackend(0);
    let result = await c.adminp('admin',id);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/product/product', {
        "productBackend":productBackend,
        "allproductBackend":allproductBackend,
        "token":id,
        "demsp":demsp,
        "allCat":allCat
    });
     }
}

module.exports.productStatus = async function(req,res,next){
    let id = req.params.id; 
    let tt = req.params.tt; 
    let token = req.params.token; 
    if(tt==0){
        await c.productStatus(id, 1);
    }else{
        await c.productStatus(id, 0);
    }
res.redirect(`/product/${token}`);
}

module.exports.productDelete = async function(req,res,next){
    let id = req.params.id; 
    let token = req.params.token; 
    await c.productDelete(id,1);
    res.redirect(`/product/${token}`);
}


module.exports.productBackendTrash= async function(req,res,next){
    let id = req.params.token; 
    let productBackend= await c.productBackend(1);
    if(productBackend==0){
        res.render('backend/product/productBackendTrashNull', {
            "token":id
        });
    }
    else{
        let result = await c.adminp('admin',id);
        if(result == 0){  
            res.json('Lỗi token');
         }else{
           res.render('backend/product/productBackendTrash', {
            "productBackend":productBackend,
            "token":id
        });
         }
    }

}

module.exports.productBackendTrashRestore = async function(req,res,next){
    let id = req.params.id; 
    let token = req.params.token; 
    await c.productDelete(id,0);
    res.redirect(`/product/${token}`);
}


module.exports.productBackendTrashDestroy = async function(req,res,next){
    let id = req.params.id; 
    let token = req.params.token; 
    await c.productBackendTrashDestroy(id);
    res.redirect(`/product/${token}`);
}


module.exports.doProductBackendAdd = async function(req,res,next){
    let token=req.body.token;

    let file = req.files[0];
    await fs.rename(file.path, `public/img/product/${file.originalname}`, function(err){});
     let params = [];
     let name=req.body.name;
     let price=req.body.price;
     let editor1=req.body.editor1;
     let product_category=req.body.product_category;
     let status=req.body.status;

     params.push(
        {'product_name':name},
        {'product_detail':editor1},
        {'product_category':product_category},
        {'status':status},   
        {'image':file.originalname},  
        {'price':price},     
); 

let item = await c.addRecord('products', params);
res.redirect(`/product/${token}`);
}


module.exports.productBackendAdd= async function(req,res,next){
    let token = req.params.token; 
    let allCat= await c.catalog();
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/product/productAdd', {
        "token":token,
        "allCat":allCat,
    });
     }
}


module.exports.productBackendEdit= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let productEdit= await c.productEdit(0,id);
    let allCat= await c.catalog();
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/product/productEdit', {
        "token":token,
        "allCat":allCat,
        "productEdit":productEdit,
        "id":id,
    });
     }
}


module.exports.doProductBackendEdit = async function(req,res,next){ 
    let id=req.body.id;
    let token=req.body.token;
    let name=req.body.name;
    let price=req.body.price;
    let editor1=req.body.editor1;
    let product_category=req.body.product_category;
    let img=req.body.img;
    let file = req.files[0];
    if(file == undefined){
       let item = await c.doProductBackendEdit(name,price,editor1,product_category,img,id);
    }else{
        await fs.rename(file.path,`public/img/product/${file.originalname}`, function(err){});
        let item = await c.doProductBackendEdit(name,price,editor1,product_category,file.originalname,id);
    }  

res.redirect(`/product/${token}`);
}



/////
module.exports.accountBackend= async function(req,res,next){
    let token = req.params.token; 
    let count =await c.count('users',0,1);
    let showUserAll= await c.showUserAll(0);
    if(showUserAll==0){
        res.redirect(`/accountNull/${token}`);
    }else{
        let result = await c.adminp('admin',token);
        if(result == 0){  
            res.json('Lỗi token');
         }else{
           res.render('backend/account/account', {
            "showUserAll":showUserAll,
            "token":token,
            'count':count[0].count
        });
         }
    }
}

module.exports.accountBackendStatus= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let tt = req.params.tt; 
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
        if(tt==1){
            await c.accountBackendStatus(id,0);
        }
        else{
            await c.accountBackendStatus(id,1);
        } 
        res.redirect(`/accountBackend/${token}`);
     }
}


module.exports.accountBackendDelete= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
        await c.accountBackendDelete(id,0,1);
     }
     res.redirect(`/accountBackend/${token}`);
}

module.exports.accountBackendTrash= async function(req,res,next){
    let token = req.params.token; 
    let showUserAll= await c.showUserAll(1);
    if(showUserAll==0){
        res.redirect(`/accountBackendTrashNull/${token}`);
    }else{
        let result = await c.adminp('admin',token);
        if(result == 0){  
            res.json('Lỗi token');
         }else{
           res.render('backend/account/accountBackendTrash', {
            "showUserAll":showUserAll,
            "token":token
        });
         }
    }
}

module.exports.accountBackendRestore= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
        await c.accountBackendRestore(id,1,0);
     }
     res.redirect(`/accountBackendTrash/${token}`);
}

module.exports.accountNull= async function(req,res,next){
    let token = req.params.token; 
    let count =await c.count('users',0,1);
        let result = await c.adminp('admin',token);
        if(result == 0){  
            res.json('Lỗi token');
         }else{
           res.render('backend/account/accountNull', {
            "token":token,
            'count':count[0].count
        });
         }
    }

    module.exports.accountBackendTrashNull= async function(req,res,next){
        let token = req.params.token; 
            let result = await c.adminp('admin',token);
            if(result == 0){  
                res.json('Lỗi token');
             }else{
               res.render('backend/account/accountBackendTrashNull', {
                "token":token
            });
             }
        }
        ///
module.exports.accountBackendShow= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let showUserId= await c.showUserId(id);
    if(showUserId==0){
        res.redirect(`/accountBackendTrashNull/${token}`);
    }else{
        let result = await c.adminp('admin',token);
        if(result == 0){  
            res.json('Lỗi token');
         }else{
           res.render('backend/account/accountBackendShow', {
            "showUserId":showUserId,
            "token":token
        });
         }
    }
}
module.exports.accountEdit= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let showUserId= await c.showUserId(id);
    if(showUserId==0){
        res.redirect(`/accountBackendTrashNull/${token}`);
    }else{
        let result = await c.adminp('admin',token);
        if(result == 0){  
            res.json('Lỗi token');
         }else{
           res.render('backend/account/accountEdit', {
            "showUserId":showUserId,
            "token":token
        });
         }
    }
}
//////contactBackend
module.exports.contactBackend= async function(req,res,next){
    let id = req.params.token; 
    let showTable= await c.showTable('contact',0);
    let result = await c.adminp('admin',id);
    let demsp=await c.demTable('contact',1);
    if(showTable == 0){  
        res.render('backend/contactBackend/contactBackendNull', {
            "token":id,
            'demsp':demsp
        });
     }else{
       res.render('backend/contactBackend/contactBackend', {
        "showTable":showTable,
        "token":id,
        'demsp':demsp
    });
     }
}


////
module.exports.contactBackendStatus= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let statusId = req.params.statusId; 
    await c.updateStatusTable('contact',statusId,id);
    res.redirect(`/contactBackend/${token}`);
}
//
module.exports.contactBackendDelete= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    await c.updateDeleteTable('contact',0,1,id);
    res.redirect(`/contactBackend/${token}`);
}


module.exports.contactBackendShow= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let showTableID= await c.showTableID('contact',id);
    let result = await c.adminp('admin',token);
    let demsp=await c.demTable('contact',1);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/contactBackend/contactBackendShow', {
        "showTable":showTableID,
        "token":token,
        'demsp':demsp
    });
     }
}

module.exports.contactBackendTrash= async function(req,res,next){
    let id = req.params.token; 
    let showTable= await c.showTable('contact',1);
    let demsp=await c.demTable('contact',1);
    if(showTable == 0){  
        res.render('backend/contactBackend/contactBackendTrashNull', {
            "token":id,
            'demsp':demsp
        });
     }else{
       res.render('backend/contactBackend/contactBackendTrash', {
        "showTable":showTable,
        "token":id,
        'demsp':demsp
    });
     }
}

module.exports.contactBackendRestore= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    await c.updateDeleteTable('contact',0,0,id);
    res.redirect(`/contactBackend/${token}`);
}

module.exports.contactBackendDestroy= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    await c.DeleteTable('contact',id,1);
    res.redirect(`/contactBackend/${token}`);
}
//////////chart


module.exports.chart= async function(req,res,next){
    let id = req.params.token; 
    let showTable= await c.showTable('contact',0);
    let result = await c.adminp('admin',id);
    let demSL=await c.demSL('order_details','product_id',1);

    let showTableNullStatus = await c.showTableNullStatus('products',1);
    let showTableNullStatusK = await c.showTableNullStatusK('order_details',1);

    let showMinDateOrder = await c.showMinDateOrder('order_details');
    let showMaxDateOrder = await c.showMaxDateOrder('order_details');
    let showDateToday = await c.showDateToday();
    
    
    if(showTable == 0){  
        res.render('backend/contactBackend/contactBackendNull', {
            "token":id,
            'demSL':demSL
        });
     }else{
       res.render('backend/chart/chart', {
        "showTable":showTable,
        "token":id,
        'demSL':demSL,
        'showTableNullStatus':showTableNullStatus,
        'showTableNullStatusK':showTableNullStatusK,
        'min':showMinDateOrder,
        'max':showMaxDateOrder,
        'today':showDateToday
    });
     }
    /* console.log(chart); */
}

module.exports.chartToday= async function(req,res,next){
    let id = req.params.token; 
    let date = req.params.date; 
    
    let showTable= await c.showTable('contact',0);
    let result = await c.adminp('admin',id);
    let demSL=await c.demSL('order_details','product_id',1);

    let showTableNullStatus = await c.showTableNullStatus('products',1);

    
    let showTableNullStatusK = await c.showTableNullStatusKWhere('order_details',1,date);

    let showMinDateOrder = await c.showMinDateOrder('order_details');
    let showMaxDateOrder = await c.showMaxDateOrder('order_details');
    let showDateToday = await c.showDateToday();
    
    
    if(showTableNullStatusK ==0){  
        res.render('backend/chart/chartTodayNull', {
            "showTable":showTable,
            "token":id,
            'demSL':demSL,
            'min':showMinDateOrder,
            'max':showMaxDateOrder,
            'today':showDateToday,
            'date':date
        });
     }else{
       res.render('backend/chart/chartToday', {
        "showTable":showTable,
        "token":id,
        'demSL':demSL,
        'showTableNullStatus':showTableNullStatus,
        'showTableNullStatusK':showTableNullStatusK,
        'min':showMinDateOrder,
        'max':showMaxDateOrder,
        'today':showDateToday,
        'date':date
    });
     }
    /* console.log(chart); */
}
module.exports.doChartToday = async function(req,res,next){ 
    let token=req.body.token;
    let date=req.body.date;

res.redirect(`/chartToday/${token}/${date}`);
}

module.exports.chartProduct= async function(req,res,next){
    let id = req.params.token; 
    let showTable= await c.showTable('contact',0);
    let result = await c.adminp('admin',id);
    let demSL=await c.demSL('order_details','product_id',1);

    let showTableNullStatus = await c.showTableNullStatus('products',1);
    let showTableNullStatusK = await c.showTableNullStatusK('order_details',1);

    let showMinDateOrder = await c.showMinDateOrder('order_details');
    let showMaxDateOrder = await c.showMaxDateOrder('order_details');
    let showDateToday = await c.showDateToday();
    
    
    if(showTable == 0){  
        res.render('backend/contactBackend/contactBackendNull', {
            "token":id,
            'demSL':demSL
        });
     }else{
       res.render('backend/chart/chartProduct', {
        "showTable":showTable,
        "token":id,
        'demSL':demSL,
        'showTableNullStatus':showTableNullStatus,
        'showTableNullStatusK':showTableNullStatusK,
        'min':showMinDateOrder,
        'max':showMaxDateOrder,
        'today':showDateToday
    });
     }
    /* console.log(chart); */
}

//
module.exports.chartProductToday= async function(req,res,next){
    let id = req.params.token; 
    let date = req.params.date; 
    
    let showTable= await c.showTable('contact',0);
    let result = await c.adminp('admin',id);
    let demSL=await c.demSL('order_details','product_id',1);

    let showTableNullStatus = await c.showTableNullStatus('products',1);
    let showTableNullStatusK = await c.showTableNullStatusK('order_details',1);
    let showMinDateOrder = await c.showMinDateOrder('order_details');
    let showMaxDateOrder = await c.showMaxDateOrder('order_details');
    let showDateToday = await c.showDateToday();
    
    
    if(showTable == 0){  
        res.render('backend/chart/chartTodayNull', {
            "showTable":showTable,
            "token":id,
            'demSL':demSL,
            'min':showMinDateOrder,
            'max':showMaxDateOrder,
            'today':showDateToday,
            'date':date
        });
     }else{
       res.render('backend/chart/chartProductToday', {
        "showTable":showTable,
        "token":id,
        'demSL':demSL,
        'showTableNullStatus':showTableNullStatus,
        'showTableNullStatusK':showTableNullStatusK,
        'min':showMinDateOrder,
        'max':showMaxDateOrder,
        'today':showDateToday,
        'date':date
    });
     }
    /* console.log(chart); */
}
module.exports.doChartProductToday = async function(req,res,next){ 
    let token=req.body.token;
    let date=req.body.date;

res.redirect(`/chartProductToday/${token}/${date}`);
}

module.exports.chartCustumer= async function(req,res,next){
    let showTableNullStatus = await c.showTableNullStatus('products',1);
    let showTableNullStatusK = await c.showTableNullStatusK('order_details',1);
    let sumTable = await c.sumTable('order_details','product_id',1);
    let c1 = await c.demSL('order_details','product_id',1);
    
           res.render('backend/chart/chartAll', {
            'c':c1,
            'showTableNullStatusK':showTableNullStatusK,
            'showTableNullStatus':showTableNullStatus,
            'sumTable':sumTable
                
        });
    }


    module.exports.AllProduct= async function(req,res,next){
        let date = req.params.date; 
        let showTableNullStatus = await c.showTableNullStatus('products',1);
        let sumTableDate = await c.sumTableDate('order_details','product_id',1,date);
        
               res.render('backend/chart/AllProduct', {
                'showTableNullStatus':showTableNullStatus,
                'sumTableDate':sumTableDate        
            });
        }


//newsBackend
module.exports.newsBackend= async function(req,res,next){
    let id = req.params.token; 
    let showTable= await c.showTable('news',0);
    let result = await c.adminp('admin',id);
    let demsp=await c.demTable('news',1);
    if(showTable == 0){  
        res.render('backend/news/newsBackendNull', {
            "token":id,
            'demsp':demsp
        });
     }else{
       res.render('backend/news/newsBackend', {
        "showTable":showTable,
        "token":id,
        'demsp':demsp
    });
     }
}


module.exports.newsBackendStatus= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let statusId = req.params.statusId; 
    await c.updateStatusTable('news',statusId,id);
    res.redirect(`/newsBackend/${token}`);
}


module.exports.newsBackendDelete= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    await c.updateDeleteTable('news',0,1,id);
    res.redirect(`/newsBackend/${token}`);
}


module.exports.newsBackendTrash= async function(req,res,next){
    let id = req.params.token; 
    let showTable= await c.showTable('news',1);
    let demsp=await c.demTable('news',1);
    if(showTable == 0){  
        res.render('backend/news/newsBackendTrashNull', {
            "token":id,
            'demsp':demsp
        });
     }else{
       res.render('backend/news/newsBackendTrash', {
        "showTable":showTable,
        "token":id,
        'demsp':demsp
    });
     }
}

module.exports.newsBackendRestore= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    await c.updateDeleteTable('news',0,0,id);
    res.redirect(`/newsBackend/${token}`);
}

module.exports.newsBackendDestroy= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    await c.DeleteTable('news',id,1);
    res.redirect(`/newsBackendTrash/${token}`);
}


module.exports.newsBackendShow= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let showTableID= await c.showTableID('news',id);
    let result = await c.adminp('admin',token);
    let demsp=await c.demTable('news',1);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/news/newsBackendShow', {
        "showTable":showTableID,
        "token":token,
        'demsp':demsp
    });
     }
}



module.exports.doNewsBackendAdd = async function(req,res,next){
    let token=req.body.token;

    let file = req.files[0];
    await fs.rename(file.path, `public/news/images/avatar/${file.originalname}`, function(err){});
     let params = [];
     let title=req.body.title;
     let NDN=req.body.NDN;
     let editor1=req.body.editor1;
     let status=req.body.status;

     params.push(
        {'title':title},
        {'short_description':NDN},
        {'content':editor1},
        {'avatar':file.originalname},    
        {'status':status},   
); 

let item = await c.addRecord('news', params);
res.redirect(`/newsBackend/${token}`);
}


module.exports.newsBackendAdd= async function(req,res,next){
    let token = req.params.token; 
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/news/newsBackendAdd', {
        "token":token,
    });
     }
}


module.exports.newsBackendEdit= async function(req,res,next){
    let token = req.params.token; 
    let id = req.params.id; 
    let showTableID = await c.showTableID('news',id);
    let result = await c.adminp('admin',token);
    if(result == 0){  
        res.json('Lỗi token');
     }else{
       res.render('backend/news/newsBackendEdit', {
        "token":token,
        "id":id,
        'showTableID':showTableID
    });
     }
}


module.exports.doNewsBackendEdit = async function(req,res,next){ 
    let id=req.body.id;
    let token=req.body.token;
    let title=req.body.title;
    let NDN=req.body.NDN;
    let editor1=req.body.editor1;
    let img=req.body.img;
    let file = req.files[0];
    if(file == undefined){
       let item = await c.doNewsBackendEdit(title,NDN,editor1,img,id);
    }else{
        await fs.rename(file.path,`public/news/images/avatar/${file.originalname}`, function(err){});
        let item = await c.doNewsBackendEdit(title,NDN,editor1,file.originalname,id);
    }  

res.redirect(`/newsBackend/${token}`);
}
    






