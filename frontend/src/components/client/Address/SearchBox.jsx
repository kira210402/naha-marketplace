import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, List, Typography, Row, Col } from 'antd';

const { Search } = Input;
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

function SearchBox({ setSelectPosition }) {
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);

  useEffect(() => {
    if (searchText) {
      handleSearch();
    }
  }, [searchText]);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: 'json',
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('result', result);
        setListPlace(result);
      })
      .catch((err) => console.log('err: ', err));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
      <Search
        placeholder='Tìm kiếm địa điểm'
        enterButton='Search'
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onSearch={handleSearch}
        style={{ flex: 1 }}
      />
      {listPlace.length > 0 && (
        <List
          itemLayout='horizontal'
          style={{ marginTop: 20 }}
          dataSource={listPlace}
          renderItem={(item) => (
            <List.Item
              key={item.place_id}
              onClick={() => setSelectPosition(item)}
              style={{ cursor: 'pointer' }}
            >
              <List.Item.Meta
                // avatar={
                //   <img
                //     src='./placeholder.png'
                //     alt='Placeholder'
                //     style={{ width: 38, height: 38 }}
                //   />
                // }
                title={item.display_name}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

SearchBox.propTypes = {
  setSelectPosition: PropTypes.func.isRequired,
};

export default function OrderForm() {
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSelectPosition = (position) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      address: position.display_name,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Order Details:', formValues);
  };
  return (
    <div>
      <Typography.Title level={4}>Order Form</Typography.Title>
      <form onSubmit={handleSubmit}>
        <Row gutter={24}>
          <Col span={24}>
            <Input
              placeholder='Địa chỉ nhận hàng'
              name='address'
              value={formValues.address}
              onChange={handleChange}
              required
            />
          </Col>
          <Col span={24}>
            <SearchBox setSelectPosition={handleSelectPosition} />
          </Col>
          <Col span={24}>
            <Button type='primary' htmlType='submit' block>
              Đặt hàng
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}
