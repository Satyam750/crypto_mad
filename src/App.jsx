import "./App.css"

import {Routes,Route, Link} from 'react-router-dom'
import { Layout, Typography, Space } from 'antd';
import {CryptoDetails, Cryptocurrencies, Homepage, Navbar} from "./components";

const App = () => {
  return (
    <div className="app">
    <div className="navbar">
              <Navbar/>
      </div>
      <div className="main">
      <Layout>
        <div className="routes">
        <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        </Routes>
        <Routes>
        <Route exact path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
        </Routes>
        <Routes>
        <Route exact path="/crypto/:coinId" element={<CryptoDetails/>}/>
        </Routes>
         </div>
      </Layout>
        
      <div className="footer" >
      <Typography.Title level={5} style={{color:'white', textAlign:"center"}} >
            Cryptoverse <br/>
            All rights resevered
      </Typography.Title>
      <Space>
        <Link to="/">Home</Link>
      </Space>
        
      </div>
      </div>
    </div>
  )
}

export default App
