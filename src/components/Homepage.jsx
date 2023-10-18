import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;
import Cryptocurrencies from './Cryptocurrencies';


const Homepage = () => {
  const [global, setGlobal] = useState([])

  useEffect(() => {
    const stats = async () => {
      const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '9b49701ef2msh0cf168f47fc890fp1429ccjsnfefff9a2bda6',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const globalstats = data?.data?.stats
        setGlobal(globalstats)
      } catch (error) {
        console.error(error);
      }
    }
    stats()

  }, [])

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>

        <Col span={12}><Statistic title='Total Cryptocurrencies' value={global.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(global.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={millify(global.totalMarketCap)
        } /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(global.total24hVolume)
        } /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(global.totalMarkets)
        } /></Col>
      </Row>
      <div className='home-heading-container'>
      <Title level={2} className="home-title">Top 100 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />

    </>
  )
}

export default Homepage
