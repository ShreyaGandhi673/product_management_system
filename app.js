const express=require('express');
const mysql=require("mysql");
const bodyparser=require("body-parser");
const {connect} = require('http2');
const path=require('path');
const app=express();
const port=3000;

app.use(bodyparser.json());

//mysql connection configuration
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'piya',
    database:'nodejs'
});

//connect to mysql
connection.connect((err)=>{
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log("connected to MySQL");
});

app.use(express.static(path.join(__dirname,'/public')));


//get all products
app.get('/products',(req,res)=>{
    let sql=`select id, prod_name,prod_description,price, category, stock_quantity, manufacturer,DATE_FORMAT(release_date,"%Y-%c-%d"), rating from products`;
    connection.query(sql,(err,results)=>{
        if(err){
            console.error('failed to create product');
            return res.status(500).json({status:'error',message:'Failed to retrieve product'});
        }
        res.status(200).json(results);
    });
});

//get single product
app.get('/products/:id',(req,res)=>{
    let sql=`select * from products where id=${req.params.id}`;
    connection.query(sql,(err,result)=>{
        if(err){
            console.error("failed to retrieve product:",err);
        
        return res.status(500).json({status:'error',message:'failed to retrieve product'});
        }
       if(result.length===0){
        return res.status(404).json({status:'fail',message:'product not found'});
       }
       res.status(200).json(result);
   
    });
});

//insert new product
app.post('/products',(req,res)=>{
    let newProd=req.body;
    let sql='INSERT INTO products SET?';
    connection.query(sql,newProd,(err,result)=>{
        if(err){
            console.error("failed to add product:",err);
        
        return res.status(500).json({status:'error',message:'failed to add new product'});
        }
        res.status(201).json({id:result.id, ...newProd});
    })
})

//update product
app.put('/products/:id',(req,res)=>{
    let updatedProd=req.body;
    let sql=`UPDATE products SET? WHERE id=${req.params.id}`;
    connection.query(sql,updatedProd,(err,result)=>{
        if(err){
            console.error('failed to update product:',err);
            return res.status(500).json({status:'error',message:"failed to update Product"});
        }
        res.status(200).json(result);
    })
})

//delete product
app.delete('/products/:id', (req, res) => {
    // console.log("to server");
    
    let sql = `DELETE FROM products WHERE id=${req.params.id}`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Failed to delete products:', err);
            return res.status(500).json({ status: 'error', message: 'Failed to delete products' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'fail', message: 'product not found' });
        }
        res.status(204).json(result);
    });
});

app.listen(port,()=>{
    console.log("server started");
});
