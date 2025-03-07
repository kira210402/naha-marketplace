import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
const SearchAddProductCollection = ({handleSearch}) => {
  const [keyword, setKeyword] = useState('');
  // const navigate = useNavigate();
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   navigate(`/search/result?query=${keyword}`);
  // };
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };
  return (
    <form className='max-w-sm' onSubmit={handleSearch}>
      <label
        htmlFor='default-search'
        className='sr-only text-sm font-medium text-gray-900 dark:text-white'
      >
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            className='h-4 w-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Search...'
          value={keyword}
          onChange={handleInputChange}
          required
        />
        <button
          type='submit'
          className='absolute bottom-1 right-1.5 rounded-lg bg-blue-700 px-3 py-1 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchAddProductCollection;
