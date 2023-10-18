import Chart from 'chart.js/auto';

import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const LineChart = ({currentPrice, coinName, timeperiod, coinId}) => {

  
  const [coinHistory, setCoinHistory] = useState([])

  useEffect(()=>{
    const detail = async () => {
      const url = `https://coinranking1.p.rapidapi.com/coin/${coinId}/history?timeperiod=${timeperiod}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '9b49701ef2msh0cf168f47fc890fp1429ccjsnfefff9a2bda6',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCoinHistory(result);
      } catch (error) {
        console.error(error);
      }
    }
    detail()

  },[])

  console.log(coinHistory?.data?.history);

  const coinPrice = [];
  const coinTimestamp = [];
  

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date((coinHistory?.data?.history[i].timestamp)*1000).toLocaleDateString());
  }
  let a = 1697037000 * 1000
  const d = new Date(a)
  console.log(d);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      
    },
  };



  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart
