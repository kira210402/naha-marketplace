// const Search = () => {
//   return (
//     <>
//       <form className='mx-auto max-w-lg'>
//         <div className='flex'>
//           <label
//             htmlFor='search-dropdown'
//             className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'
//           >
//             Your Email
//           </label>
//           <button
//             id='dropdown-button'
//             data-dropdown-toggle='dropdown'
//             className='z-10 inline-flex flex-shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700'
//             type='button'
//           >
//             All categories{' '}
//             <svg
//               className='ms-2.5 h-2.5 w-2.5'
//               aria-hidden='true'
//               xmlns='http://www.w3.org/2000/svg'
//               fill='none'
//               viewBox='0 0 10 6'
//             >
//               <path
//                 stroke='currentColor'
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 strokeWidth='2'
//                 d='m1 1 4 4 4-4'
//               />
//             </svg>
//           </button>

//           <div
//             id='dropdown'
//             className='z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700'
//           >
//             <ul
//               className='py-2 text-sm text-gray-700 dark:text-gray-200'
//               aria-labelledby='dropdown-button'
//             >
//               <li>
//                 <button
//                   type='button'
//                   className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
//                 >
//                   Mockups
//                 </button>
//               </li>
//               <li>
//                 <button
//                   type='button'
//                   className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
//                 >
//                   Templates
//                 </button>
//               </li>
//               <li>
//                 <button
//                   type='button'
//                   className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
//                 >
//                   Design
//                 </button>
//               </li>
//               <li>
//                 <button
//                   type='button'
//                   className='inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
//                 >
//                   Logos
//                 </button>
//               </li>
//             </ul>
//           </div>
//           <div className='relative w-full'>
//             <input
//               type='search'
//               id='search-dropdown'
//               className='z-20 block w-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500'
//               placeholder='Search Mockups, Logos, Design Templates...'
//               required
//             />
//             <button
//               type='submit'
//               className='absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
//             >
//               <svg
//                 className='h-4 w-4'
//                 aria-hidden='true'
//                 xmlns='http://www.w3.org/2000/svg'
//                 fill='none'
//                 viewBox='0 0 20 20'
//               >
//                 <path
//                   stroke='currentColor'
//                   strokeLinecap='round'
//                   strokeLinejoin='round'
//                   strokeWidth='2'
//                   d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
//                 />
//               </svg>
//               <span className='sr-only'>Search</span>
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Search;

import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
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
          value={query}
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

export default Search;
