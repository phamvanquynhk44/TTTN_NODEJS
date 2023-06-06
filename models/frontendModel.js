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
//
async function showCategory(table,status){
    let query = `SELECT * FROM ${table} WHERE status=${status}`;
    return await mysql.select(query);
}
async function showProductCategory(table,status,id){
    let query = `SELECT * FROM ${table} WHERE status=${status} and category_id=${id} LIMIT 8`;
    return await mysql.select(query);
}

module.exports={

    newProductPC:getNewProductPC

    ,newProductLaptop:getNewProductLaptop

    ,newMenu:getNewMenu
    
    ,getProductsByCat:getProductsByCat

    ,getProductDetails:getProductDetails

    ,getProductDetailsImg:getProductDetailsImg

    ,showCategory:showCategory

    ,showProductCategory:showProductCategory

}