import * as React from 'react';

export type Data = {
  symbol: string;
  name: string;
  currentPrice: boolean;
  priceChange24h: string;
  img: string;
  marketCap: string;
}[];

export type Order = 'asc' | 'desc';

export interface TableHeaderProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  OrderDirection: Order;
  ValueToOrder: keyof Data | string;
}

export type HeadCells = {
  id: React.Key & string;
  numeric: boolean;
  disablePadding: boolean;
};
