import { ChangeEvent, useEffect, useState } from 'react';
import { Col, Input, Row, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

interface AddressFormProps {
  onChange: (address: string) => void;
}

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

interface Props {
  onChange: (address: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onChange }: Props) => {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(
    undefined,
  );
  const [selectedWard, setSelectedWard] = useState<string | undefined>(
    undefined,
  );
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    axios
      .get<City[]>(
        'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
      )
      .then(response => {
        const citiesData = response.data;
        setCities(citiesData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCity && selectedDistrict && address) {
      onChange(getAddressString());
    }
  }, [selectedCity, selectedDistrict, address, onChange]);

  const handleCityChange = (value: string) => {
    setSelectedCity(value);

    setWards([]);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setWards([]);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };

  const getAddressString = (): string => {
    let addressString = [];

    if (selectedCity) {
      const city = cities.find(city => city.Id === selectedCity);
      if (city) {
        addressString.unshift(city.Name);
      }
    }

    if (selectedDistrict) {
      const district = cities
        .find(city => city.Id === selectedCity)
        ?.Districts.find(district => district.Id === selectedDistrict);
      if (district) {
        addressString.unshift(district.Name);
      }
    }

    if (selectedWard) {
      const ward = cities
        .find(city => city.Id === selectedCity)
        ?.Districts.find(district => district.Id === selectedDistrict)
        ?.Wards.find(ward => ward.Id === selectedWard);
      if (ward) {
        addressString.unshift(ward.Name);
      }
    }

    addressString.unshift(address);

    return addressString.join(', ');
  };

  return (
    <div style={{ display: 'block' }}>
      <Row gutter={[16, 16]} style={{ display: 'flex' }}>
        <Col span={8}>
          <Select
            className="mb-3"
            placeholder="Chọn tỉnh thành"
            onChange={handleCityChange}
            value={selectedCity}
          >
            {cities.map(city => (
              <Option key={city.Id} value={city.Id}>
                {city.Name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          {' '}
          <Select
            className="mb-3"
            placeholder="Chọn quận huyện"
            onChange={handleDistrictChange}
            value={selectedDistrict}
            disabled={!selectedCity}
          >
            {selectedCity &&
              cities
                .find(city => city.Id === selectedCity)
                ?.Districts.map(district => (
                  <Option key={district.Id} value={district.Id}>
                    {district.Name}
                  </Option>
                ))}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            className="mb-3"
            placeholder="Chọn phường xã"
            value={selectedWard}
            disabled={!selectedDistrict}
            onChange={handleWardChange}
          >
            {selectedCity &&
              selectedDistrict &&
              cities
                .find(city => city.Id === selectedCity)
                ?.Districts.find(district => district.Id === selectedDistrict)
                ?.Wards.map(ward => (
                  <Option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </Option>
                ))}
          </Select>
        </Col>
      </Row>
      <Row className="mx-[8px]">
        <Input
          className="mb-3"
          placeholder="Số nhà, tên đường cụ thể"
          value={address}
          onChange={handleAddressChange}
        />
      </Row>
    </div>
  );
};

export default AddressForm;
