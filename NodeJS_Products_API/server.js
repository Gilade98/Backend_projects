const express = require("express");
const mongoose = require("mongoose")
const Product = require("./models/productModel")
const app = express();
const PORT = 3000;


app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/',(req,res)=>{
    res.send("hello good sir ")
})

app.get('/blog',(req,res)=>{
    res.send("Hello blog")
})

app.get('/products',async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.put('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if (!product){
            return res.status(404).json({message: `product not found with id ${id}`})
        }
        const updated = await Product.findById(id);
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products',async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `product not found with id ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://jigjug:12345jig@cluster0.z3pyfwe.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`node api is running on ${PORT}`)
    })

    console.log("connected to MongoDB")
}).catch((e)=>{
    console.log(e)
})