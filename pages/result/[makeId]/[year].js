import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loader from '@/components/Loader';

export async function generateStaticParams() {
  const makesResponse = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
  );
  const makesData = await makesResponse.json();

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2015; year--) {
    years.push(year);
  }

  const paths = makesData.Results.flatMap((make) =>
    years.map((year) => ({
      params: { makeId: make.MakeID.toString(), year: year.toString() },
    })),
  );

  return paths;
}

const ResultPage = () => {
  const router = useRouter();
  const { makeId, year } = router.query;

  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (makeId && year) {
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setModels(data.Results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error getting models:', error);
          setIsLoading(false);
        });
    }
  }, [makeId, year]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-6 max-w-3xl mx-auto h-[100vh]">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Results for Model {makeId} - {year} year
          </h1>
          <div className="h-[80vh] overflow-y-auto ">
            {models.length > 0 ? (
              <ul className="space-y-4">
                {models.map((model) => (
                  <li
                    key={model.Model_ID}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-lg font-medium text-gray-800">
                      <strong>Brand:</strong> {model.Make_Name}
                    </div>
                    <div className="text-gray-600">
                      <strong>Model name:</strong> {model.Model_Name}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 my-[40%]">
                Models not found
              </p>
            )}
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Link href={'/'}>
              <button className="bg-green-500 py-2 px-10 rounded-md text-white">
                Go back
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultPage;
