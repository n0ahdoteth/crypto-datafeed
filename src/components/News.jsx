import React, {useState} from 'react'
import {Select, Typography, Row, Col, Avatar, Card} from 'antd'


import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Text, Title} = Typography;
const {Option} = Select;


const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 12});
  const {data} = useGetCryptosQuery(5);
  if(!cryptoNews?.value) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
          <Col span={24}>
              <Select
                showSearch
                className='select-news'  
                placeholder='Select a Crypto'
                optionFilterProp='children'
                onChange={(value) => setNewsCategory(value)}
                filderOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >

                <Option value="Cryptocurrency">Cryptocurrency</Option>
                {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}

              </Select>
          </Col>
      )}
        {cryptoNews.value.map((article, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card">
                <a href={article.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>{article.name}</Title>
                    <img style={{maxWidth:'200px', maxHeight: '100px'}} src={article?.image?.thumbnail?.contentUrl || demoImage} alt="news-image" />
                  </div>
                  <p>
                    {article.description > 100 ? `${article.description.substring(0, 100)}...` : article.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={article.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                      <Text className="provider-name">{article.provider[0]?.name}</Text>
                    </div>
                      <Text>{moment(article.datePublished).startOf('ss').fromNow()}</Text>

                  </div>
                </a>
              </Card>
            </Col>
        ))}
    </Row>
  )
}

export default News