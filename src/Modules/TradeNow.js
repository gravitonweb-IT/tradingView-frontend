import React from 'react';
import "./trade.css";

const TradeNow = ({ stock }) => {
    const { symbol, change, percentageChange, volume } = stock;
    const changeClass = change >= 0 ? 'positive' : 'negative';
  
    return (
      <div className={`stock-item ${changeClass}`}>
        <div className="symbol">{symbol}</div>
        <div className="change">{change.toFixed(2)}</div>
        <div className="percentage-change">({percentageChange.toFixed(2)}%)</div>
        <div className="volume">Volume: {volume.toLocaleString()}</div>
      </div>
    );
};

export default TradeNow;