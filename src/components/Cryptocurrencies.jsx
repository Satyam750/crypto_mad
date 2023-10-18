import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

const Cryptocurrencies = ({simplified}) => {
 
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const stats = async () => {
      const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=0';
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
        const globalstats = data?.data?.coins
        setCryptos(globalstats)
      } catch (error) {
        console.error(error);
      }
    }
    stats()

    const filteredData = cryptos.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);

  }, [searchTerm])
  
  return (
    <>
    {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
<Row gutter={[32, 32]} className="crypto-card-container">
{cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
    </Row>
    
    </>
  )
}

export default Cryptocurrencies
