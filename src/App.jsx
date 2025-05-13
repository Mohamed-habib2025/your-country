import { useState } from 'react'
import axios from 'axios';
import { HashLoader } from 'react-spinners';

function App() {

  const [countryData, setCountryData] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSearch = async () => {
    try {

      if (!countryName.trim()) {
        setError('Please enter a country name');
        return;
      }

      setError('');
      setLoading(true);
      setCountryData(null);
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName.trim()}`);

      if (response.data[0].name.common.toLowerCase() === 'israel') {
        setLoading(false);
        setError('Country not found');
        return;
      } else {
        setCountryData(response.data[0]);
      }


    } catch (err) {
      setCountryData(null);
      setError('Country not found. Make sure you spell the name correctly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-lvh bg-[#1E293B] flex flex-col items-center pt-10 ">
      <h1 className="text-2xl font-medium text-[#E2E8F0] mb-6">Learn about any country with just a name</h1>
      <div className=" bg-[#334155] w-[500px] flex items-center justify-between rounded-3xl overflow-hidden mb-4">
        <input
          type="text"
          placeholder="Enter the country name "
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          className="py-2 px-4 w-[80%] text-blue-400 font-medium bg-transparent focus:outline-none focus:ring-0 focus:border-0"
        />
        <button
          onClick={handleSearch}
          className="bg-[#3B82F6] font-medium text-white px-6 py-2 rounded-l-3xl hover:bg-[#2563EB] duration-150"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 text-xl">{error}</p>}

      {loading ? (
        <div className='mt-20'>
          <HashLoader size={100} color="#3B82F6" />
        </div>
      ) : (
        countryData && (
          <div className="bg-[#F8FAFC] p-6 rounded-2xl shadow-lg w-full max-w-md text-center text-gray-800">
            <img
              src={countryData.flags.png}
              alt="flag"
              className="w-32 h-auto mx-auto mb-4 rounded-md shadow"
            />
            <h2 className="text-2xl font-semibold text-[#1E293B] mb-3">
              {countryData.name.common}
            </h2>
            <p className="mb-1">
              <strong>Capital:</strong> {countryData.capital?.[0]}
            </p>
            <p className="mb-1">
              <strong>Population:</strong> {countryData.population.toLocaleString()}
            </p>
            <p className="mb-1">
              <strong>Time zone:</strong> {countryData.timezones?.[0]}
            </p>
            <p className="mt-2">
              <strong>Currency:</strong>{' '}
              {Object.values(countryData.currencies)[0]?.name} (
              {Object.values(countryData.currencies)[0]?.symbol})
            </p>
          </div>
        )
      )}

    </div>
  )
}

export default App
