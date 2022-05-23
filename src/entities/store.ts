import { action, makeObservable } from 'mobx';
import React, { createContext, useContext } from 'react';

export type TableData = {
  marketCapRank: number | string;
  img: string;
  name: string | React.ReactNode;
  currentPrice: number | string;
  marketCap: number | string;
  symbol: string;
  priceChangePercentage24h: number;
};

class Store {
  CoinGeckoData: any = [];

  TableData: TableData[] = [
    {
      marketCapRank: '',
      img: '',
      name: '',
      currentPrice: '',
      marketCap: '',
      symbol: '',
      priceChangePercentage24h: 0,
    },
  ];

  state: 'pending' | 'done' | 'error' = 'pending';

  coinSelected = {
    image: '',
    id: '',
    current_price: '',
    market_cap: '',
    price_change_percentage_24h: 0,
    total_supply: 0,
    name: '',
    symbol: '',
    circulating_supply: 0,
    market_cap_rank: '',
    rank: '',
  };

  constructor() {
    makeObservable(this);
  }

  @action
  getCoinData = (coinName: any) => {
    console.log('working');
    const result = this.CoinGeckoData.find(
      (index: any) => index.id === coinName,
    );
    this.coinSelected = result;
  };

  // API call to CoinGecko

  @action
  fetchProducts = async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    );
    const data = await response.json();

    this.CoinGeckoData = data;

    console.log('----', data);
    // initialize data store
    this.TableData = [];
    data.forEach((item: any) => {
      this.TableData.push({
        symbol: item.symbol,
        name: item.id,
        currentPrice: item.current_price.toFixed(2).toLocaleString('en-US'),
        priceChangePercentage24h: item.price_change_percentage_24h
          .toFixed(2)
          .toLocaleString('en-US'),
        img: item.image,
        marketCap: item.market_cap.toLocaleString('en-US'),
        marketCapRank: item.market_cap_rank,
      });
    });
    this.state = 'done';
    console.log('res', this.TableData);
  };
}

const store = new Store();

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export default StoreContext;
