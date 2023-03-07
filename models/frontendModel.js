const { category } = require('../controllers/frontendController');
const mysql = require('../helpers/mysql');
// menu category 
async function getNewMenu(){
    let query = `SELECT id,menu_name,parent,img_logo_menu FROM menu WHERE status=1`;
    return await mysql.select(query);
}
//

//
async function getNewProductPC(){
    let query = `SELECT * FROM products WHERE alias="PC" LIMIT 0, 8`;
    return await mysql.select(query);
}
//
async function getNewProductLaptop(){
    let query = `SELECT * FROM products WHERE alias="Laptop" LIMIT 0, 8`;
    return await mysql.select(query);
}
//
async function getProductsByCat(categoryId=0){
    let query = `SELECT * FROM products WHERE status =1 and product_category = ${categoryId}`;
    return await mysql.select(query);
}
//
async function getProductDetails(id= 0){
    let query = `SELECT * FROM products WHERE id = ${id} `;
    return await mysql.select(query);
}
//
async function getProductDetailsImg(id= 0){
    let query = `SELECT * FROM order_details WHERE product_id = ${id} `;
    return await mysql.select(query);
}



/* 
async function getNewSlider(){
    let query = `SELECT * FROM slider WHERE 1`;
    return await mysql.select(query);
}
//





//
async function getNewProduct_Hot(){
    let query = `SELECT * FROM products WHERE product_detail="product hot"`;
    return await mysql.select(query);
}
//




async function getNew_Category(categoryId = 0  , page = 1,perpage = 18 ){
    let query = `SELECT * FROM products WHERE product_category = ${categoryId} and status=1 LIMIT ${(page -1)*perpage},${perpage}`;
    return await mysql.select(query);
}
//
async function getNew_Category_Seach(categoryId, curpage,perpage){
    let query = `SELECT * FROM products WHERE product_name LIKE '%${categoryId}%' and status=1 LIMIT ${(curpage -1)*perpage},${perpage}`;
    return await mysql.select(query);
}


async function countProductsByCat(categoryId = 0   ){
    let query = `SELECT * FROM products WHERE status =1 and product_category = ${categoryId}`;
    rows =await mysql.select(query);
    return rows.length;
}
//

async function countProductsByCatseach(categoryId){
    let query = `SELECT * FROM products WHERE status =1 and product_name LIKE '%${categoryId}%'`;
    rows =await mysql.select(query);
    return rows.length;
}

//
async function getProductDetails(id= 0){
    let query = `SELECT * FROM products WHERE id = ${id} `;
    return await mysql.select(query);
} */




module.exports={

/*     newSlider:getNewSlider
    //
    ,newProduct_Hot:getNewProduct_Hot

    ,category:getNew_Category
    
    ,countProductsByCat:countProductsByCat

    ,getDetails:getProductDetails,

    countProductsByCatseach:countProductsByCatseach,

    getNew_Category_Seach:getNew_Category_Seach */

    newProductPC:getNewProductPC

    ,newProductLaptop:getNewProductLaptop

    ,newMenu:getNewMenu
    
    ,getProductsByCat:getProductsByCat

    ,getProductDetails:getProductDetails

    ,getProductDetailsImg:getProductDetailsImg

    
}