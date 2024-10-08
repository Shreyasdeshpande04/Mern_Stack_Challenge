app.get('/api/barchart', async (req, res) => {  
  const month = req.query.month;  
  
  try {  
   const ranges = [  
    { min: 0, max: 100 },  
    { min: 101, max: 200 },  
    { min: 201, max: 300 },  
    { min: 301, max: 400 },  
    { min: 401, max: 500 },  
    { min: 501, max: 600 },  
    { min: 601, max: 700 },  
    { min: 701, max: 800 },  
    { min: 801, max: 900 },  
    { min: 901, max: Infinity }  
   ];  
  
   const promises = ranges.map(range => {  
    return ProductTransaction.countDocuments({  
      dateOfSale: { $month: month },  
      price: { $gte: range.min, $lt: range.max }  
    }).exec();  
   });  
  
   const results = await Promise.all(promises);  
  
   res.status(200).json(results.map((count, index) => ({ range: `${ranges[index].min}-${ranges[index].max}`, count })));  
  } catch (error) {  
   console.error(error);  
   res.status(500).send('Failed to retrieve bar chart data');  
  }  
});
