import React, {useState, useEffect} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = ({simplified}) => {
  let i = 1;
  const count = simplified ? 10 : 100;
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(cryptosList);

  useEffect(() => {
      const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setCryptos(filteredData);
  },[cryptosList, searchTerm])

  if(isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
           <Input placeholder='Search for a Coin' onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      )}
      
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency, index) => (
          
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            
                  <Card title={`${currency.rank}. ${currency.name}`}
                        extra={<img className="crypto-image" src={currency.iconUrl}/> } 
                  >
                    <p>Price: ${Math.round(currency.price *100) /100}</p>
                    <p>Market Cap: {millify(currency.marketCap)}</p>
                    <p>Daily Change: {Math.round(currency.change * 100) /100}%</p>
                  </Card>

          </Col>
          
<<<<<<< HEAD
=======

          
>>>>>>> 3e332a8faa53fbb1e9b334139cc53798462b4834

          
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies