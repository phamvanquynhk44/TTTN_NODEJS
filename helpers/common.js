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

async function adminp(user,id)
{
    let query = `SELECT * FROM users WHERE 	idAuthority='${id}' AND user='${user}' `;
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

async function catalog(trash)
{
    let query = `SELECT * FROM menu where trash='${trash}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function catalogDistinct()
{
    let query = `SELECT DISTINCT parent FROM menu`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function catalogStatus(id,tt)
{
    let query = `UPDATE menu SET status = '${tt}' WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}


async function catalogDelete(id,trash)
{
    let query = `UPDATE menu SET trash = '${trash}' WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}


async function catalogEdit(trash,id)
{
    let query = `SELECT * FROM menu where trash='${trash}' and id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function doCatalogEdit(name,parent,id,img)
{
    let query = `UPDATE menu SET menu_name = '${name}',parent='${parent}' ,img_logo_menu='${img}' WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function catalogTrashDestroy(id)
{
    let query = `DELETE FROM menu WHERE id=${id}`;
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




async function productBackend(trash)
{
    let query = `SELECT * FROM products where trash='${trash}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function productStatus(id,tt)
{
    let query = `UPDATE products SET status = '${tt}' WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}


async function productDelete(id,trash)
{
    let query = `UPDATE products SET trash = '${trash}' WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function demsp(id,trash)
{
    let query = `SELECT COUNT(status=1) as demsp
    FROM products where trash=1`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
    

async function productBackendTrashDestroy(id)
{
    let query = `DELETE FROM products WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function productEdit(trash,id)
{
    let query = `SELECT * FROM products where trash='${trash}' and id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function doProductBackendEdit(name,price,product_detail,product_category,image,id)
{
    let query = `UPDATE products SET product_name = '${name}',price='${price}',product_detail='${product_detail}',product_category='${product_category}',image='${image}' WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function doNewsBackendEdit(title,NDN,content,image,id)
{
    let query = `UPDATE news SET title = '${title}',short_description='${NDN}',content='${content}',avatar='${image}',modified_at=CURRENT_TIMESTAMP() WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function doCart(id)
{
    let query = `SELECT * FROM products where id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function lastId(table)
{
    let query =`SELECT Max(id) as id From ${table}`;
    return await mysql.select(query);
}


async function showUser(id)
{
    let query = `SELECT * FROM users WHERE idAuthority='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

//
async function showUserAll(trash)
{
    let query = `SELECT * FROM users where trash='${trash}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function userConfirm(id)
{
    let query = `SELECT * FROM users WHERE email_verification='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showOrder(email)
{
    let query = `SELECT * FROM orders WHERE email='${email}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function order(token)
{
    let query = `SELECT * FROM orders WHERE order_code='${token}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function accountBackendStatus(id,status)
{
    let query = `UPDATE users SET status = '${status}' WHERE id='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function accountBackendDelete(id,status,trash)
{
    let query = `UPDATE users SET status = '${status}',trash='${trash}' WHERE id='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
} 
async function accountBackendRestore(id,status,trash)
{
    let query = `UPDATE users SET status = '${status}',trash='${trash}' WHERE id='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function count(table,status,trash)
{
    let query = `SELECT COUNT(status=${status}) as count
    FROM ${table} where trash=${trash}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
//
async function showUserId(id)
{
    let query = `SELECT * FROM users WHERE id='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function showUserAdress(email,status)
{
    let query = `SELECT * FROM user_adress WHERE user_email='${email}' and status=${status} ORDER BY user_adress.default_address DESC`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function editDefault_address(email)
{
    let query = `UPDATE user_adress SET default_address =0 WHERE user_email='${email}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showAlltable(table,status,type)
{
    let query = `SELECT * FROM ${table} where status='${status}' and type='${type}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function search(table,status,where)
{
    let query = `SELECT * FROM ${table} where status='${status}' and product_name LIKE '%${where}%'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function showAlltableId(table,status,id)
{
    let query = `SELECT * FROM ${table} where status='${status}' and id='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function showAlltableOrderByProduct(table,status,product_categor,table1,orderBy)
{
    let query = `SELECT * FROM ${table} where status='${status}' and product_category='${product_categor}' ORDER BY ${table1} ${orderBy}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function checkUser(table1,table,status,email)
{
    let query = `SELECT ${table1} FROM ${table} where status='${status}' and email='${email}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function updateUsers(table,status,otp,id)
{
    let query = `UPDATE ${table} SET password_otp = '${otp}' where idAuthority ='${id}' and status='${status}' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}
async function checkPassOTP(status,otp,id)
{
    let query = `SELECT * FROM users WHERE password_otp = '${otp}' and idAuthority ='${id}' and status='${status}'; `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}


async function showNews(table,status)
{
    let query = `SELECT * FROM ${table} WHERE status=${status} ORDER BY created_at DESC`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showNewsID(table,status,id)
{
    let query = `SELECT * FROM ${table} WHERE status=${status} AND id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}


async function showTable(table,trash)
{
    let query = `SELECT * FROM ${table} WHERE trash=${trash}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showTableID(table,id)
{
    let query = `SELECT * FROM ${table} WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function updateStatusTable(table,status,id)
{
    let query = `UPDATE ${table} SET status = '${status}' where id ='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function updateDeleteTable(table,status,trash,id)
{
    let query = `UPDATE ${table} SET status = '${status}', trash=${trash} where id ='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function DeleteTable(table,id,trash)
{
    let query = `DELETE FROM ${table} where id ='${id}' AND trash=${trash}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function demTable(table,trash)
{
    let query = `SELECT COUNT(trash=${trash}) as demsp
    FROM ${table} where trash=1`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}


async function showTableIDAuthority(table,user_id,product_id)
{
    let query = `SELECT * FROM ${table} WHERE user_id='${user_id}' AND product_id=${product_id} `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function show2Table(table1,table2,token)
{
    let query = `SELECT * FROM ${table1}, ${table2} WHERE ${table1}.product_id=${table2}.id AND favorite.user_id='${token}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}



async function showTableNull(table)
{
    let query = `SELECT * FROM ${table}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function delTable(table,token,id)
{
    let query = `DELETE FROM ${table} where user_id ='${token}' AND product_id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function demSL(table,cot,id)
{
    let query = `SELECT COUNT(${cot}) as demsl FROM ${table} where product_id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showTableNullStatus(table,status)
{
    let query = `SELECT * FROM ${table} WHERE status=${status}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showTableNullStatusK(table,status)
{
    let query = `SELECT * FROM ${table} WHERE status=${status} AND product_id!=''`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function sumTable(table,table1,status)
{
    let query = `SELECT *, SUM(qty) AS "sl" FROM ${table} WHERE status=${status} AND product_id!='' GROUP BY ${table1}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function sumTableDate(table,table1,status,date)
{
    let query = `SELECT *, SUM(qty) AS "sl" FROM ${table} WHERE status=${status} AND product_id!='' AND created_at BETWEEN '${date} 00:00:00' AND '${date} 23:59:59' GROUP BY ${table1}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showTableNullStatusKWhere(table,status,date)
{
    let query = `SELECT * FROM ${table} WHERE status=${status} AND product_id!='' AND created_at BETWEEN '${date} 00:00:00' AND '${date} 23:59:59' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showMinDateOrder(table)
{
    let query = `SELECT MIN(Date(created_at)) as NN FROM ${table} WHERE product_id!='' `;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showMaxDateOrder(table)
{
    let query = `SELECT MAX(Date(created_at)) as LN FROM ${table} WHERE product_id!=''`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showDateToday()
{
    let query = `SELECT max(CURDATE()) today`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showFavorite(id)
{
    let query = `SELECT * FROM favorite,products,users WHERE favorite.product_id=products.id AND users.idAuthority=favorite.user_id AND favorite.user_id='${id}'`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}



module.exports = {
    showFavorite:showFavorite,
    doNewsBackendEdit:doNewsBackendEdit,
    sumTable:sumTable,
    sumTableDate:sumTableDate,
    showTableNullStatusKWhere:showTableNullStatusKWhere,
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
    delEmailVeri:delEmailVeri,
    catalog:catalog,
    catalogDistinct:catalogDistinct,
    catalogStatus:catalogStatus,
    catalogDelete:catalogDelete,
    catalogEdit:catalogEdit,
    doCatalogEdit:doCatalogEdit,
    catalogTrashDestroy:catalogTrashDestroy,
    productBackend:productBackend,
    productStatus:productStatus,
    productDelete:productDelete,
    demsp:demsp,
    productBackendTrashDestroy:productBackendTrashDestroy,
    productEdit:productEdit,
    doProductBackendEdit:doProductBackendEdit,
    doCart:doCart,
    lastId:lastId,
    showUser:showUser,
    userConfirm:userConfirm,
    showOrder:showOrder,
    order:order,
    showUserAll:showUserAll,
    accountBackendStatus:accountBackendStatus,
    accountBackendDelete:accountBackendDelete,
    accountBackendRestore:accountBackendRestore,
    count:count,
    showUserId:showUserId,
    showUserAdress:showUserAdress,
    editDefault_address:editDefault_address,
    showAlltable:showAlltable,
    search:search,
    showAlltableId:showAlltableId,
    showAlltableOrderByProduct:showAlltableOrderByProduct,
    checkUser:checkUser,
    updateUsers:updateUsers,
    checkPassOTP:checkPassOTP,
    showNews:showNews,
    showNewsID:showNewsID,
    showTable:showTable,
    updateStatusTable:updateStatusTable,
    updateDeleteTable:updateDeleteTable,
    demTable:demTable,
    showTableID:showTableID,
    DeleteTable:DeleteTable,
    showTableIDAuthority:showTableIDAuthority,
    showTableNull:showTableNull,
    show2Table:show2Table,
    delTable:delTable,
    demSL:demSL,
    showTableNullStatus:showTableNullStatus,
    showTableNullStatusK:showTableNullStatusK,
    showMinDateOrder:showMinDateOrder,
    showMaxDateOrder:showMaxDateOrder,
    showDateToday:showDateToday
}