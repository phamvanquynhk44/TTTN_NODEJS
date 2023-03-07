const productModel = require('../models/frontendModel');
const paginator =require('../helpers/paginator');
const frontendModel = require('../models/frontendModel');

const c =require('../helpers/common');

module.exports.addToCart = async function(req,res,next){
    let id=req.params.id
    let result = await c.addCart(id);
    if(result == 0){  
      res.redirect(`/details/${id}`)
    }else{
      req.session.name = result[0].name;
      req.session.email = result[0].email;
      req.session.role = result[0].role;
      req.session.cart = result[0].cart;
      req.session.id = result[0].id;
      res.redirect('cart')
    }
}

