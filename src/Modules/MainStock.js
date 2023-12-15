import React, { useEffect, useState } from 'react'
import "./stockitem.css"
import TradeNow from './TradeNow';
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
          {stocks.map((stock, index) => (
            <TradeNow key={index} stock={stock} />
          ))}
        </div>
  )
}

export default MainStock