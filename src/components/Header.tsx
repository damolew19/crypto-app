import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../entities/store';

function Header() {
  const store = useStore();
  useEffect(() => {
    console.log(store);
  });
  return (
    <div className='m-4 flex'>
      <Link
        to='/'
        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      >
        Crypto Coins
      </Link>
    </div>
  );
}

export default Header;
