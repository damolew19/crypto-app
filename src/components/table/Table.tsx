// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
// import { alpha } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../entities/store';
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { Data, Order } from './table.types';
import TableHeader from './TableHeader';

const DataTable = observer(() => {
  // const [data, setData] = useState<Data>([]);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const [valueToOrder, setValueToOrderBy] = useState<keyof Data | string>(
    'name',
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const store = useStore();
  const [isFetching, setIsFetching] = useState('pending');

  // const [isFetching, setIsFetching] = useState(true);
  // const fetchProducts = async () => {
  //   const response = await axios
  //     .get(
  //       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false',
  //     )
  //     .catch((e) => console.log(e));

  //   if (response) {
  //     console.log('products', response);
  //     const array: Data = [];
  //     response.data.forEach((item: any) => {
  //       array.push({
  //         symbol: item.symbol,
  //         name: item.id,
  //         currentPrice: item.current_price.toFixed(2).toLocaleString('en-US'),
  //         priceChange24h: item.price_change_24h
  //           .toFixed(2)
  //           .toLocaleString('en-US'),
  //         img: item.image,
  //         marketCap: item.market_cap.toLocaleString('en-US'),
  //       });
  //     });
  //     console.log('array', array);
  //     setData(array);
  //     // setIsFetching(false);
  //   }
  // };

  // handle sorting request
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = valueToOrder === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setValueToOrderBy(property);
  };

  useEffect(() => {
    const getData = async () => {
      console.log('how many times');
      await store.fetchProducts();
      console.log('store -----', store.CoinGeckoData);
      if (store.state === 'done') {
        setIsFetching('done');
      } else {
        setIsFetching('error');
      }
    };
    getData();
  }, []);

  const descendingComparator: any = (a: any, b: any, orderBy: any) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator: any = (order: any, orderBy: any) => {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };

  const sortedData = (array: any, comparator: any) => {
    const stabilizeArray = array.map((el: any, index: any) => [el, index]);
    stabilizeArray.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizeArray.map((el: any) => el[0]);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {isFetching === 'pending' ? (
        <>
          <p>didnt work</p>
          <p>Sorry</p>
        </>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHeader
                OrderDirection={orderDirection}
                ValueToOrder={valueToOrder}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {sortedData(
                  store.CoinGeckoData,
                  getComparator(orderDirection, valueToOrder),
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <TableRow
                      key={row.name}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      className='bg-white text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'
                    >
                      <TableCell
                        sx={{ color: 'rgb(156 163 175)', display: 'flex' }}
                      >
                        <img
                          className='mr-2 w-5 h-5'
                          src={row.img}
                          alt={row.name}
                        />
                        {row.symbol}
                      </TableCell>
                      <TableCell
                        sx={{ color: 'rgb(156 163 175)' }}
                        align='right'
                      >
                        ${row.currentPrice}
                      </TableCell>
                      <TableCell
                        sx={{ color: 'rgb(156 163 175)' }}
                        align='right'
                      >
                        ${row.priceChange24h}
                      </TableCell>
                      <TableCell
                        sx={{ color: 'rgb(156 163 175)' }}
                        align='right'
                      >
                        ${row.marketCap}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component='div'
            rowsPerPage={rowsPerPage}
            page={page}
            count={store.CoinGeckoData.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
            sx={{ color: 'rgb(156 163 175)' }}
          />
        </>
      )}
    </div>
  );
});

export default DataTable;
