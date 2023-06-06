const mysql =require('../helpers/mysql');

///
async function showOrder()
{
    let query = `SELECT * FROM orders`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showOrderId(id)
{
    let query = `SELECT * FROM orders WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function UpdateOrder(table,status,delivered,id)
{
    let query = `UPDATE ${table} SET status='${status}',delivered='${delivered}' WHERE id=${id}`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showOrderDetail(id)
{
    let query = `SELECT * FROM order_details WHERE order_id=${id}  AND product_id!=''`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

async function showOrderProduct()
{
    let query = `SELECT * FROM products`;
    rows =  await mysql.select(query);
    if(rows.length != 0)
    {
    return rows;
    }
    return 0;
}

module.exports={
    UpdateOrder:UpdateOrder,
    showOrderId:showOrderId,
    showOrder:showOrder,
    showOrderDetail:showOrderDetail,
    showOrderProduct:showOrderProduct
}