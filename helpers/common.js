const {query} = require('express');
const mysql = require('./mysql');
async function getOne(table, id)
{
    let query = `SELECT * FROM ${table} WHERE id = ${id}`;
    return await mysql.select(query);
}
async function addRecord(table,params=[]){
    txtKey = '';
    txtValue = '';
    i=0;
    n=params.length;

    params.forEach(function(item){
        Object.keys(item).forEach(function(key)
        {
            if(i<n-1){
                txtKey += key + ",";
                txtValue += "'" + item[key] + "',";
            }
            else{
                txtKey += key;
                txtValue += "'" + item[key] + "'";
            }
        });
        i++;
    });

    let query = "INSERT INTO " + table + "(" + txtKey +") VALUES (" + txtValue +")";
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function testphone(email,phone)
{
    let query = `SELECT * FROM users WHERE email='${email}' or phone='${phone}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;  
}
//
async function doLogin(ep,pass,user)
{
    let query = `SELECT * FROM users WHERE (email = '${ep}' OR phone='${ep}') AND user='${user}' AND status='1' AND password='${pass}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

///
async function doLoginAdmin(ep,pass,user)
{
    let query = `SELECT * FROM users WHERE (email = '${ep}' OR phone='${ep}') AND user='${user}' AND status='1' AND password='${pass}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//

async function adminp(user,pass)
{
    let query = `SELECT * FROM users WHERE password='${pass}' AND user='${user}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function emailVerification(token)
{
    let query = `SELECT * FROM users WHERE email_verification='${token}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function sendMail(ep)
{
    let query = `SELECT * FROM users WHERE email = '${ep}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function sendMailToken(token,email)
{
    let query = `UPDATE users SET email_verification = '${token}' WHERE email='${email}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function doResetpass(pass,token)
{
    let query = `UPDATE users SET password='${pass}' WHERE email_verification='${token}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function delEmailVeri(pass)
{
    let query = `UPDATE users SET email_verification = '' WHERE password='${pass}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}





async function editRecord(table, params=[],id)
{
    txtSet = '';
    txtValue = '';
    i=0;
    n = params.length;

    params.forEach(function(item){
        Object.keys(item).forEach(function(key)
        {
            if(i<n-1){
                txtSet += key ;
                txtSet += " = '" + item[key] + "', ";
            }
            else{
                txtSet += key;
                txtSet += " = '" + item[key] + "'";               
            }
        });
        i++;
    });

    let query = "UPDATE " + table + " SET " +  txtSet + " WHERE id = " + id;
    return await mysql.select(query);
}




/* async function countRows(table, page = 1,trash=0)
{
    let query = `SELECT * FROM ${table} WHERE trash = ${trash}`;
    rows =await mysql.select(query);
    return rows.length;
}
//
async function countRows1(table,email)
{
    let query = `SELECT * FROM ${table} WHERE email = '${email}'`;
    rows =await mysql.select(query);
    return rows.length;
}
//
async function countRows_orders(table,order_status)
{
    let query = `SELECT * FROM ${table} WHERE email = order_status='${order_status}'`;
    rows =await mysql.select(query);
    return rows.length;
}
//
async function countRows_contact(table)
{
    let query = `SELECT * FROM ${table} WHERE status=1`;
    rows =await mysql.select(query);
    return rows.length;
}
//


async function getRecordByTrash(table, trash = 0)
{
    let query = `SELECT * FROM ${table} WHERE trash = ${trash}`;
    return await mysql.select(query);
}
//

async function cartAll(table1,table2,email,email_tk)
{
    let query = `SELECT * FROM ${table1} As u, ${table2} AS p WHERE u.${email}=p.${email} AND p.${email}='${email_tk}' `;
    return await mysql.select(query);
}
//
async function show_CartAll(table,email)
{
    let query = `SELECT * FROM ${table} WHERE email='${email}' `;
    return await mysql.select(query);
}
// xac nhan don hang
async function cartAll_s(table1,table2,token)
{
    let query = `SELECT * FROM ${table1} As u, ${table2} AS p WHERE u.email=p.email AND p.token_product='${token}' `;
    return await mysql.select(query);
}
//
async function show_CartAll_s(table,token)
{
    let query = `SELECT * FROM ${table} WHERE token_product='${token}' `;
    return await mysql.select(query);
}
//


async function getRecordByPage(table,page = 1,perPage=10)
{
    let query = `SELECT * FROM ${table} WHERE trash = 0  LIMIT ${(page-1)*perPage},${perPage}`;
    return await mysql.select(query);
}

///
async function delTempRestore(table,id, trash)
{
    let query = `UPDATE ${table} SET trash = ${trash} WHERE id = ${id}`;
    return await mysql.select(query);
}
//
async function delCart(table,id, email)
{
    let query = `UPDATE ${table} SET email ='${email}' WHERE id = ${id}`;
    return await mysql.select(query);
}
//
async function add_email_p(table,id, email)
{
    let query = `UPDATE ${table} SET email = '${email}',quantity=1 WHERE id = ${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function delRecord(table,id)
{
    let query = `DELETE FROM ${table} WHERE id = ${id}`;
    return await mysql.select(query);
   
}

async function changeStatus(table,id,status)
{
    let query = `UPDATE ${table} SET status = ${status} WHERE id = ${id}`;
    return await mysql.select(query);
   
}

async function getRecordByStatus(email,pass)
{
    let query = `SELECT * FROM users WHERE status = 1  AND email = '${email}' AND password = '${pass}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
     
}


// login admin
async function doLogin_admin(email,pass,role)
{
    let query = `SELECT * FROM users WHERE email = '${email}' AND password = '${pass}' AND role='${role}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function doResetPass(pass,token)
{
    let query = `UPDATE users SET password = '${pass}' WHERE email_verified = '${token}';`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function users(table,email)
{
    let query = `SELECT * FROM ${table} WHERE email='${email}'`;
    return await mysql.select(query);  
}
//
async function email_token(table,id)
{
    let query = `SELECT * FROM ${table} WHERE email_verified='${id}'`;
    return await mysql.select(query);  
}

async function save(name,email)
{
    let query = `UPDATE users SET name = '${name}' WHERE email = '${email}';`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function seach(categoryId,page=1,perpage=4)
{
    let query = `SELECT * FROM products WHERE product_name LIKE '%${categoryId}%' and status=1 LIMIT ${(page -1)*perpage},${perpage}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
    // rows =await mysql.select(query);
   // return rows.length;   
}
//
async function seach2(categoryId)
{
    let query = `SELECT * FROM products WHERE product_name LIKE '%${categoryId}%' and status=1`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
    // rows =await mysql.select(query);
   // return rows.length;   
}
//
async function add_update_cart(table,id)
{
    let query = `UPDATE ${table} SET quantity=1 WHERE id=${id} and trash=1`;
    return await mysql.select(query);
}
async function addCart(email)
{
    let query = `SELECT * FROM products WHERE email='${email}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function update_cart(table,quantity,id,email)
{
    let query = `UPDATE ${table} SET quantity=${quantity} WHERE id='${id}' and email='${email}' `;
    return await mysql.select(query);
}
async function sum_cart(c,table)
{
    let query = `SELECT SUM(${c}) AS "Tong so bai" FROM ${table} WHERE trash=1`;
    return await mysql.select(query);
}
//
async function add_token_product(table,token,email)
{
    let query = `UPDATE ${table} SET token_product='${token}' WHERE email='${email}'`;
    return await mysql.select(query);  
}
//
async function add_token_product_or(table,token,email,name,address,phone,Shipping_method,Payment_methods)
{
    let query = `INSERT INTO ${table} (order_code,email,delivered,fullname,address,phone,PAYMENT_STATUS,Shipping_method,Payment_methods) VALUES ('${token}', '${email}','not fulfilled','${name}','${address}','${phone}','unpaid','${Shipping_method}','${Payment_methods}')`;
    return await mysql.select(query);  
}
//xoa  orders du
async function del_or(table,email)
{
    let query = `DELETE FROM ${table} WHERE PAYMENT_STATUS='unpaid' AND email='${email}' `;
    return await mysql.select(query);  
}
//
async function del_product(table,email,token)
{
    let query = `UPDATE ${table} SET email='',token_product='' WHERE email='${email}' and token_product='${token}'`;
    return await mysql.select(query);  
}
//
async function add_token_product_or1(table,token,email,name,address,phone,Shipping_method,Payment_methods,product_name,tongtien)
{
    let query = `INSERT INTO ${table} (order_code,email,delivered,fullname,address,phone,PAYMENT_STATUS,Shipping_method,Payment_methods,product_name,tongtien,order_status) VALUES ('${token}', '${email}','not fulfilled','${name}','${address}','${phone}','paid','${Shipping_method}','${Payment_methods}','${product_name}','${tongtien}','ĐƠN HÀNG MỚI')`;
    return await mysql.select(query); 
}
//
async function all_p()
{
    let query = `SELECT * FROM products Limit 0,6`;
    return await mysql.select(query);  
}
//
async function sum(email)
{
    let query = `SELECT SUM(price*quantity)AS tong FROM products WHERE email='${email}'`;
    return await mysql.select(query);  
}
async function sum_token(token)
{
    let query = `SELECT SUM(price*quantity)AS tong FROM products WHERE token_product='${token}'`;
    return await mysql.select(query);  
}
/// BACK END TB DON HANG
async function show_orders(table)
{
    let query = `SELECT * FROM ${table} WHERE PAYMENT_STATUS='paid'`;
    return await mysql.select(query);  
}
//
async function show_orders_code(table,order_code)
{
    let query = `SELECT * FROM ${table} WHERE order_code='${order_code}'`;
    return await mysql.select(query);  
}
//
async function show_tt(table,order_code)
{
    let query = ` SELECT ROUND(tongtien, 3) as tongtien FROM ${table} WHERE order_code='${order_code}' `;
    return await mysql.select(query);  
}
//
async function show_tt_email(table,email)
{
    let query = ` SELECT ROUND(tongtien, 3) as tongtien FROM ${table} WHERE email='${email}' `;
    return await mysql.select(query);  
}
async function phanhoi(table)
{
    let query = `SELECT * FROM ${table} `;
    return await mysql.select(query);  
}
///
    async function do_contact(table,contact_name,email,subject,message)
    {
        let query = `INSERT INTO ${table} (contact_name,email,subjects,message) VALUES ('${contact_name}','${email}','${subject}','${message}')`;
        return await mysql.select(query);  
    }
//
async function formphanhoi(table,email)
{
    let query = `SELECT * FROM ${table} WHERE email ='${email}' `;
    return await mysql.select(query);  
}
//
async function show_orders_email(table,email)
{
    let query = `SELECT * FROM ${table} WHERE email='${email}'`;
    return await mysql.select(query);  
} */
    
    
module.exports = {
/*     countRows:countRows,
    delTempRestore:delTempRestore,
    delRecord:delRecord,
    changeStatus:changeStatus,
    email_token: email_token,
    doResetPass:doResetPass,
    save:save,
    seach:seach,
    seach2:seach2,
    addCart:addCart,
    sum_cart:sum_cart,
    update_cart:update_cart,
    add_update_cart:add_update_cart,
    cartAll:cartAll,
    add_email_p:add_email_p,
    countRows1:countRows1,
    delCart:delCart,
    show_CartAll:show_CartAll,
    add_token_product:add_token_product,
    add_token_product_or,
    cartAll_s:cartAll_s,
    show_CartAll_s:show_CartAll_s,
    del_or:del_or,
    add_token_product_or1:add_token_product_or1,
    del_product:del_product,
    all_p:all_p,
    sum:sum,
    sum_token:sum_token,
    show_orders:show_orders,
    show_orders_code: show_orders_code,
    show_tt:show_tt,
    doLogin_admin:doLogin_admin,
    countRows_orders:countRows_orders,
    phanhoi:phanhoi,
    do_contact:do_contact,
    countRows_contact:countRows_contact,
    formphanhoi,formphanhoi,
    show_orders_email:show_orders_email,
    show_tt_email:show_tt_email,
    getRecordByPage:getRecordByPage,
    getRecordByTrash:getRecordByTrash,
    getRecordByStatus:getRecordByStatus,
    users:users, */

    doLogin:doLogin,
    editRecord:editRecord,
    getOne:getOne,
    addRecord:addRecord,
    sendMail:sendMail,
    testphone:testphone,
    adminp:adminp,
    doLoginAdmin:doLoginAdmin,
    emailVerification:emailVerification,
    sendMailToken,sendMailToken,
    doResetpass:doResetpass,
    delEmailVeri:delEmailVeri
}