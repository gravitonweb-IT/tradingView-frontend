import React, { useEffect, useState } from 'react'
import "./stockitem.css"
import TradeNow from './TradeNow';
import UserDashboard from './Account/UserDashboard';
import axios from 'axios';
const MainStock = () => {
    const [stocks, setStocks] = useState([
        { symbol: 'AAPL', change: 2.67, percentageChange: 1.15, volume: 30000000 },
        { symbol: 'MSFT', change: -1.53, percentageChange: -0.89, volume: 25000000 },
        { symbol: 'GOOG', change: 4.12, percentageChange: 0.95, volume: 15000000 },
        { symbol: 'AMZN', change: -3.45, percentageChange: -1.25, volume: 5000000 },
        { symbol: 'FB', change: 1.76, percentageChange: 1.33, volume: 20000000 },
        // Add more stocks as needed
      ]);

    

      useEffect(() => {
          fetchStockData();
      }, []);
  
      const fetchStockData = async () => {
          try {
              const response = await axios.get('http://localhost:8000/rolebased/get_stocks/');
              // setStocks(response.data.stocks);
          } catch (error) {
              console.error('Error fetching stock data:', error);
          }
      };
  
      const handleDelete = async () => {
        try {
            await axios.delete('http://localhost:8000/delete_stocks/');
            alert('All stock data deleted successfully!');
            // Optionally, add logic to update the UI or state
        } catch (error) {
            console.error('Error deleting stock data:', error);
            alert('Error deleting stock data');
        }
    };
      useEffect(() => {
        const interval = setInterval(() => {
          // Update stocks with simulated data for demonstration purposes
          const updatedStocks = stocks.map(stock => ({
            ...stock,
            change: stock.change + (Math.random() - 0.5) * 2, // Random change
            percentageChange: stock.percentageChange + (Math.random() - 0.5) * 2, // Random change
          }));
    
          setStocks(updatedStocks);
        }, 2000);
    
        return () => clearInterval(interval);
      }, [stocks]);
    
      return (
        
        <div>
            <UserDashboard>
            <button onClick={handleDelete}>Delete All Stock Data</button>
          {stocks.map((stock, index) => (
            <TradeNow key={index} stock={stock} />
          ))}
          </UserDashboard>
        </div>
  )
}

export default MainStock