import { useEffect, useState } from 'react';
import { getCommune, getDistrict } from './../../../services/locations/index';
import { Select, Spin } from 'antd';
const { Option } = Select;

const provinces = [
  { value: '0', label: 'Chọn Tỉnh/Thành Phố...' },
  { value: '01', label: 'Thành phố Hà Nội' },
  { value: '79', label: 'Thành phố Hồ Chí Minh' },
  { value: '31', label: 'Thành phố Hải Phòng' },
  { value: '48', label: 'Thành phố Đà Nẵng' },
  { value: '92', label: 'Thành phố Cần Thơ' },
  { value: '02', label: 'Tỉnh Hà Giang' },
  { value: '04', label: 'Tỉnh Cao Bằng' },
  { value: '06', label: 'Tỉnh Bắc Kạn' },
  { value: '08', label: 'Tỉnh Tuyên Quang' },
  { value: '10', label: 'Tỉnh Lào Cai' },
  { value: '11', label: 'Tỉnh Điện Biên' },
  { value: '12', label: 'Tỉnh Lai Châu' },
  { value: '14', label: 'Tỉnh Sơn La' },
  { value: '15', label: 'Tỉnh Yên Bái' },
  { value: '17', label: 'Tỉnh Hoà Bình' },
  { value: '19', label: 'Tỉnh Thái Nguyên' },
  { value: '20', label: 'Tỉnh Lạng Sơn' },
  { value: '22', label: 'Tỉnh Quảng Ninh' },
  { value: '24', label: 'Tỉnh Bắc Giang' },
  { value: '25', label: 'Tỉnh Phú Thọ' },
  { value: '26', label: 'Tỉnh Vĩnh Phúc' },
  { value: '27', label: 'Tỉnh Bắc Ninh' },
  { value: '30', label: 'Tỉnh Hải Dương' },
  { value: '33', label: 'Tỉnh Hưng Yên' },
  { value: '34', label: 'Tỉnh Thái Bình' },
  { value: '35', label: 'Tỉnh Hà Nam' },
  { value: '36', label: 'Tỉnh Nam Định' },
  { value: '37', label: 'Tỉnh Ninh Bình' },
  { value: '38', label: 'Tỉnh Thanh Hóa' },
  { value: '40', label: 'Tỉnh Nghệ An' },
  { value: '42', label: 'Tỉnh Hà Tĩnh' },
  { value: '44', label: 'Tỉnh Quảng Bình' },
  { value: '45', label: 'Tỉnh Quảng Trị' },
  { value: '46', label: 'Tỉnh Thừa Thiên Huế' },
  { value: '49', label: 'Tỉnh Quảng Nam' },
  { value: '51', label: 'Tỉnh Quảng Ngãi' },
  { value: '52', label: 'Tỉnh Bình Định' },
  { value: '54', label: 'Tỉnh Phú Yên' },
  { value: '56', label: 'Tỉnh Khánh Hòa' },
  { value: '58', label: 'Tỉnh Ninh Thuận' },
  { value: '60', label: 'Tỉnh Bình Thuận' },
  { value: '62', label: 'Tỉnh Kon Tum' },
  { value: '64', label: 'Tỉnh Gia Lai' },
  { value: '66', label: 'Tỉnh Đắk Lắk' },
  { value: '67', label: 'Tỉnh Đắk Nông' },
  { value: '68', label: 'Tỉnh Lâm Đồng' },
  { value: '70', label: 'Tỉnh Bình Phước' },
  { value: '72', label: 'Tỉnh Tây Ninh' },
  { value: '74', label: 'Tỉnh Bình Dương' },
  { value: '75', label: 'Tỉnh Đồng Nai' },
  { value: '77', label: 'Tỉnh Bà Rịa - Vũng Tàu' },
  { value: '80', label: 'Tỉnh Long An' },
  { value: '82', label: 'Tỉnh Tiền Giang' },
  { value: '83', label: 'Tỉnh Bến Tre' },
  { value: '84', label: 'Tỉnh Trà Vinh' },
  { value: '86', label: 'Tỉnh Vĩnh Long' },
  { value: '87', label: 'Tỉnh Đồng Tháp' },
  { value: '89', label: 'Tỉnh An Giang' },
  { value: '91', label: 'Tỉnh Kiên Giang' },
  { value: '93', label: 'Tỉnh Hậu Giang' },
  { value: '94', label: 'Tỉnh Sóc Trăng' },
  { value: '95', label: 'Tỉnh Bạc Liêu' },
  { value: '96', label: 'Tỉnh Cà Mau' },
];

const Address = ({ onAddressChange }) => {
  const [districtList, setDistrictList] = useState([]);
  const [communeList, setCommuneList] = useState([]);
  const [provinceValue, setProvinceValue] = useState('');
  const [districtValue, setDistrictValue] = useState('');
  const [communeValue, setCommuneValue] = useState('');
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false);
  const [isLoadingCommune, setIsLoadingCommune] = useState(false);

  useEffect(() => {
    const provinceLabel =
      provinces.find((p) => p.value === provinceValue)?.label ||
      'Tỉnh/Thành phố';
    const districtLabel =
      districtList.find((d) => d.idDistrict === districtValue)?.name ||
      'Quận/Huyện';
    const communeLabel =
      communeList.find((c) => c.idCommune === communeValue)?.name ||
      'Phường/Xã';
    onAddressChange({ provinceLabel, districtLabel, communeLabel });
  }, [provinceValue, districtValue, communeValue]);

  const handleChangeProvince = async (value) => {
    setProvinceValue(value);
    if (value === '0') {
      setDistrictList([]);
      setCommuneList([]);
      setDistrictValue('Chọn quận / huyện');
      setCommuneValue('Chọn phường / xã');
      return;
    }
    setIsLoadingDistrict(true);
    const districtList = await getDistrict(value);
    setDistrictList(districtList);
    setIsLoadingDistrict(false);
    setDistrictValue('Chọn quận / huyện');
    setCommuneValue('Chọn phường / xã');
  };

  const handleChangeDistrict = async (value) => {
    setDistrictValue(value);
    if (value === '0') {
      setCommuneList([]);
      setCommuneValue('Chọn phường / xã');
    } else {
      setIsLoadingCommune(true);
      const communeList = await getCommune(value);
      setCommuneList(communeList);
      setIsLoadingCommune(false);
      setCommuneValue('Chọn phường / xã...');
    }
  };

  const handleChangeCommune = (value) => {
    setCommuneValue(value);
  };

  return (
    <div className='rounded-lg bg-white p-6 shadow-lg'>
      <h3 className='mb-5 text-2xl font-bold text-gray-700'>My Delivery Address</h3>
      <div className='mb-4'>
        <label htmlFor='city-province' className='mb-2 block text-gray-700'>
          Tỉnh/Thành Phố:
        </label>
        <Select
          id='city-province'
          placeholder='Chọn Tỉnh / Thành Phố...'
          onChange={handleChangeProvince}
          value={provinceValue}
          className='w-full'
        >
          {provinces.map((province) => (
            <Option key={province.value} value={province.value}>
              {province.label}
            </Option>
          ))}
        </Select>
      </div>

      <div className='mb-4'>
        <label htmlFor='district-town' className='mb-2 block text-gray-700'>
          Quận/Huyện:
        </label>
        <Select
          id='district-town'
          placeholder='Chọn quận / huyện...'
          onChange={handleChangeDistrict}
          value={districtValue}
          className='w-full'
        >
          {districtList.map((district) => (
            <Option key={district.idDistrict} value={district.idDistrict}>
              {district.name}
            </Option>
          ))}
        </Select>
        {isLoadingDistrict && (
          <div className='mt-2'>
            <Spin />
          </div>
        )}
      </div>

      <div>
        <label htmlFor='ward-commune' className='mb-2 block text-gray-700'>
          Xã/Phường:
        </label>
        <Select
          id='ward-commune'
          placeholder='Chọn phường / xã...'
          onChange={handleChangeCommune}
          value={communeValue}
          className='w-full'
        >
          {communeList.map((commune) => (
            <Option key={commune.idCommune} value={commune.idCommune}>
              {commune.name}
            </Option>
          ))}
        </Select>
        {isLoadingCommune && (
          <div className='mt-2'>
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
