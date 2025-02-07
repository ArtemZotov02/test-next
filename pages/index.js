import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Select from '../components/Select';
import SuspendedBrandSelect from '@/components/suspense/BrandSelect';

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let year = currentYear; year >= 2015; year--) {
      yearsList.push(year);
    }
    setYears(yearsList);
    setLoading(false);
  }, []);

  const isButtonEnabled = selectedBrand && selectedYear;

  const href = useMemo(
    () => (isButtonEnabled ? `/result/${selectedBrand}/${selectedYear}` : '/'),
    [isButtonEnabled, selectedBrand, selectedYear],
  );

  return (
    <div className="mt-20 p-6 bg-white shadow-xl rounded-md max-w-xs mx-auto">
      <h2 className="text-xl font-semibold mb-4">Select brand and year</h2>

      <SuspendedBrandSelect
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        loading={loading}
      />

      <Select
        id="year"
        label="Model year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        options={
          loading ? [] : years.map((year) => ({ value: year, label: year }))
        }
        disabled={loading}
      />

      <div className="mt-4 flex items-center justify-center">
        <Link href={href}>
          <button
            disabled={!isButtonEnabled}
            className={`${isButtonEnabled ? 'bg-green-500' : 'bg-gray-500'} py-2 px-10 rounded-md text-white`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
