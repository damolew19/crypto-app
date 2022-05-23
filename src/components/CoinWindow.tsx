import { useEffect, useState } from 'react';
import { useStore } from '../entities/store';

function CoinWindow() {
  const store = useStore();
  const [isFetching, setIsFetching] = useState('pending');

  useEffect(() => {
    const getData = () => {
      const coinSelected = window.location.href.split('coin?=')[1];
      store.getCoinData(coinSelected);
      setIsFetching('done');
      console.log(isFetching);
    };
    getData();
  }, []);
  return (
    <div className='flex flex-column border p-4 bg-slate-200'>
      <div className='flex flex-col items-start'>
        <p className='text-sm p-1 bg-amber-400 rounded-lg w-24 font-bold'>
          Rank #{store.coinSelected.market_cap_rank}
        </p>
        <div className='flex items-center'>
          <img
            className='w-5 m--1'
            src={store.coinSelected.image}
            alt={store.coinSelected.id}
          />
          <h1 className='m-1 text-xl font-bold'>
            {store.coinSelected.id} ({store.coinSelected.symbol})
          </h1>
        </div>
        <div className='flex items-center'>
          <p className='text-3xl font-bold mr-2'>
            ${store.coinSelected.current_price}
          </p>
          <p
            className={`font-bold
              ${
                Math.sign(store.coinSelected.price_change_percentage_24h) === 1
                  ? 'text-emerald-500 positive-arrow'
                  : 'text-rose-500 negative-arrow'
              } 
            `}
          >
            {store.coinSelected.price_change_percentage_24h
              .toFixed(2)
              .toLocaleString()}
            %
          </p>
        </div>
        <hr className='my-2' />
        <div>
          <ul className='flex items-start flex-col'>
            <li>
              Market Cap: ${store.coinSelected.market_cap.toLocaleString()}
            </li>
            <li>
              Max Supply: ${store.coinSelected.total_supply.toLocaleString()}
            </li>
            <li>
              Circulating Supply: $
              {
                store.coinSelected.circulating_supply
                  .toLocaleString()
                  .split('.')[0]
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CoinWindow;
