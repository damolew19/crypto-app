import { action, makeObservable } from 'mobx';
import { createContext, useContext } from 'react';

type CoinGeckoDataTypes = {
  marketCapRank: number | string;
  img: string;
  name: string;
  currentPrice: number | string;
  marketCap: number | string;
  symbol: string;
  priceChangePercentage24h: number;
};

class Store {
  CoinGeckoData: CoinGeckoDataTypes[] = [];

  state: 'pending' | 'done' | 'error' = 'pending';

  //   static fetchProducts: any;

  constructor() {
    makeObservable(this);
  }

  @action
  fetchProducts = async () => {
    console.log('here');
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    );
    const data = await response.json();

    data.forEach((item: any) => {
      this.CoinGeckoData.push({
        symbol: item.symbol,
        name: item.id,
        currentPrice: item.current_price.toFixed(2).toLocaleString('en-US'),
        priceChangePercentage24h: item.price_change_24h
          .toFixed(2)
          .toLocaleString('en-US'),
        img: item.image,
        marketCap: item.market_cap.toLocaleString('en-US'),
        marketCapRank: item.market_cap_rank,
      });
    });

    console.log('res', this.CoinGeckoData);
  };
}

const store = new Store();

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export default StoreContext;
