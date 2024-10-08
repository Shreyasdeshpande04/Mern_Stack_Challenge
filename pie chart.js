app.get('/api/piechart', async (req, res) => {  
  const month = req.query.month;  
  
  try {  
   const categories = await ProductTransaction.aggregate([  
    { $match: { dateOfSale: { $month: month } } },  
    { $group: { _id: '$category', count: { $sum: 1 } } }  
   ]).exec();  
  
   res.status(200).json(categories);  
  } catch (error) {  
   console.error(error);  
   res.status(500).send('Failed to retrieve pie chart data');  
  }  
});
