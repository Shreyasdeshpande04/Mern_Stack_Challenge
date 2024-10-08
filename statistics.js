app.get('/api/statistics', async (req, res) => {  
  const month = req.query.month;  
  
  try {  
   const totalSaleAmount = await ProductTransaction.aggregate([  
    { $match: { dateOfSale: { $month: month }, isSold: true } },  
    { $group: { _id: null, total: { $sum: '$price' } } }  
   ]).exec();  
   const totalSoldItems = await ProductTransaction.countDocuments({ dateOfSale: { $month: month }, isSold: true }).exec();  
   const totalNotSoldItems = await ProductTransaction.countDocuments({ dateOfSale: { $month: month }, isSold: false }).exec();  
  
   res.status(200).json({  
    totalSaleAmount: totalSaleAmount[0] ? totalSaleAmount[0].total : 0,  
    totalSoldItems,  
    totalNotSoldItems  
   });  
  } catch (error) {  
   console.error(error);  
   res.status(500).send('Failed to retrieve statistics');  
  }  
});
