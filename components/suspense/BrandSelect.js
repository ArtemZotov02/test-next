import { Suspense, useState, useEffect } from 'react';
import Select from '../Select';

const fetchBrands = async () => {
  const response = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
  );
  const data = await response.json();
  return data.Results;
};
const BrandSelect = ({ selectedBrand, setSelectedBrand, loading }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (!loading) {
      fetchBrands().then((data) => setBrands(data));
    }
  }, [loading]);

  return (
    <Select
      id="brand"
      label="Car brand"
      value={selectedBrand}
      onChange={(e) => setSelectedBrand(e.target.value)}
      options={brands.map((brand) => ({
        value: brand.MakeId,
        label: brand.MakeName,
      }))}
      disabled={loading}
    />
  );
};

const SuspendedBrandSelect = ({ selectedBrand, setSelectedBrand, loading }) => {
  return (
    <Suspense fallback={<div>Loading brands...</div>}>
      <BrandSelect
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        loading={loading}
      />
    </Suspense>
  );
};

export default SuspendedBrandSelect;
