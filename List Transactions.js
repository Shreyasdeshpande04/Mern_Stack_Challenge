app.get('/api/transactions', async (req, res) => {  
  const month = req.query.month;  
  const search = req.query.search;  
  const page = req.query.page || 1;  
  const perPage = req.query.perPage || 10;  
  
  try {  
   let query = ProductTransaction.find({ dateOfSale: { $month: month } });  
   if (search) {  
    query = query.find({  
      $or: [  
       { productTitle: { $regex: search, $options: 'i' } },  
       { productDescription: { $regex: search, $options: 'i' } },  
       { price: search }  
      ]  
    });  
   }  
   const transactions = await query.skip((page - 1) * perPage).limit(perPage).exec();  
   res.status(200).json(transactions);  
  } catch (error) {  
   console.error(error);  
   res.status(500).send('Failed to retrieve transactions');  
  }  
});
