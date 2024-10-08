app.get('/api/combined', async (req, res) => {  
  const month = req.query.month;  
  
  try {  
   const statistics = await axios.get(`http://localhost:3000/api/statistics?month=${month}`);  
   const barChart = await axios.get(`http://localhost:3000/api/barchart?month=${month}`);  
   const pieChart = await axios.get(`http://localhost:3000/api/piechart?month=${month}`);  
  
   res.status(200).json({  
    statistics: statistics.data,  
    barChart: barChart.data,  
    pieChart: pieChart.data  
   });  
  } catch (error) {  
   console.error(error);  
   res.status(500).send('Failed to retrieve combined data');  
  }  
});
