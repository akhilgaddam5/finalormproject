"use client"
import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.apilayer.com/exchangerates_data/symbols', {
          headers: {
            'apikey': 'qL9Wqy4CbjhsmVCQd2g2pUuAroj0eEiQ'
          }
        });
        const json = await response.json();
        setSymbols(Object.entries(json.symbols));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <p className='text-white bg-gray-800 text-2xl py-2 px-3 font-bold'>Learn about Currencies and What they Mean</p>
    <p>Uses external API to fetch currencies and their symbols. </p>
      <div className='flex flex-col items-center justify-center px-6 mx-auto pt-4 lg:py-0'>
      <a href='https://apilayer.com/marketplace/exchangerates_data-api'>External API Link here </a>

      <table class="table-fixed table-bordered">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {symbols.map(([symbol, description]) => (
            <tr className='px-5' key={symbol}>
              <td className='border py-2 px-5'>{symbol}</td>
              <td className='border py-2 px-10'>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    </>
      
  );
};

export default YourComponent;
