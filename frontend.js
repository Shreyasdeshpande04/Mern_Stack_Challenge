import React, { useState, useEffect } from 'react';  
import axios from 'axios';  
import { makeStyles } from '@material-ui/core/styles';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  
import TextField from '@material-ui/core/TextField';  
import Button from '@material-ui/core/Button';  
import Select from '@material-ui/core/Select';  
import MenuItem from '@material-ui/core/MenuItem';  
import BarChart from './BarChart';  
  
const useStyles = makeStyles((theme) => ({  
  table: {  
   minWidth: 650,  
  },  
  container: {  
   maxHeight: 440,  
  },  
}));  
  
function App() {  
  const classes = useStyles();  
  const [transactions, setTransactions] = useState([]);  
  const [month, setMonth] = useState('March');  
  const [search, setSearch] = useState('');  
  const [page, setPage] = useState(1);  
  const [statistics, setStatistics] = useState({});  
  const [barChartData, setBarChartData] = useState({});  
  
  useEffect(() => {  
   fetchTransactions();  
   fetchStatistics();  
   fetchBarChartData();  
  }, [month, search, page]);  
  
  const fetchTransactions = async () => {  
   try {  
    const response = await axios.get(`http://localhost:3000/api/transactions?month=${month}&search=${search}&page=${page}`);  
    setTransactions(response.data);  
   } catch (error) {  
    console.error(error);  
   }  
  };  
  
  const fetchStatistics = async () => {  
   try {  
    const response = await axios.get(`http://localhost:3000/api/statistics?month=${month}`);  
    setStatistics(response.data);  
   } catch (error) {  
    console.error(error);  
   }  
  };  
  
  const fetchBarChartData = async () => {  
   try {  
    const response = await axios.get(`http://localhost:3000/api/barchart?month=${month}`);  
    setBarChartData(response.data);  
   } catch (error) {  
    console.error(error);  
   }  
  };  
  
  const handleMonthChange = (event) => {  
   setMonth(event.target.value);  
  };  
  
  const handleSearchChange = (event) => {  
   setSearch(event.target.value);  
  };  
  
  const handlePageChange = (event) => {  
   setPage(event.target.value);  
  };  
  
  return (  
   <div>  
    <h1>Transactions Table</h1>  
    <Select value={month} onChange={handleMonthChange}>  
      <MenuItem value="January">January</MenuItem>  
      <MenuItem value="February">February</MenuItem>  
      <MenuItem value="March">March</MenuItem>  
      <MenuItem value="April">April</MenuItem>  
      <MenuItem value="May">May</MenuItem>  
      <MenuItem value="June">June</MenuItem>  
      <MenuItem value="July">July</MenuItem>  
      <MenuItem value="August">August</MenuItem>  
      <MenuItem value="September">September</MenuItem>  
      <MenuItem value="October">October</MenuItem>  
      <MenuItem value="November">November</MenuItem>  
      <MenuItem value="December">December</MenuItem>  
    </Select>  
    <TextField label="Search" value={search} onChange={handleSearchChange} />  
    <Button onClick={() => setPage(page - 1)}>Previous</Button>  
    <Button onClick={() => setPage(page + 1)}>Next</Button>  
    <TableContainer component={Paper} className={classes.container}>  
      <Table className={classes.table} aria-label="simple table">  
       <TableHead>  
        <TableRow>  
          <TableCell>Product Title</TableCell>  
          <TableCell>Product Description</TableCell>  
          <TableCell>Price</TableCell>  
        </TableRow>  
       </TableHead>  
       <TableBody>  
        {transactions.map((transaction) => (  
          <TableRow key={transaction._id}>  
           <TableCell>{transaction.productTitle}</TableCell>  
           <TableCell>{transaction.productDescription}</TableCell>  
           <TableCell>{transaction.price}</TableCell>  
          </TableRow>  
        ))}  
       </TableBody>  
      </Table>  
    </TableContainer>  
    <h1>Transactions Statistics</h1>  
    <div>  
      <p>Total Amount of Sale: {statistics.totalSaleAmount}</p>  
      <p>Total Sold Items: {statistics.totalSoldItems}</p>  
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>  
    </div>  
    <h1>Transactions Bar Chart</h1>  
    <BarChart data={barChartData} />  
   </div>  
  );  
}  
  
export default App;
