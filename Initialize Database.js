const express = require('express');  
const axios = require('axios');  
const mongoose = require('mongoose');  
  
const app = express();  
const ProductTransaction = mongoose.model('ProductTransaction', {  
  dateOfSale: Date,  
  productTitle: String,  
  productDescription: String,  
  price: Number,  
  category: String,  
  isSold: Boolean  
});  
  
app.get('/api/initdb', async (req, res) => {  
  try {  
   const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');  
   const transactions = response.data;  
   await ProductTransaction.insertMany(transactions);  
   res.status(200).send('Database initialized successfully');  
  } catch (error) {  
   console.error(error);  
   res.status(500).send('Failed to initialize database');  
  }  
});
