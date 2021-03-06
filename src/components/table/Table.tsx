import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../entities/store';
import TableHeader from './TableHeader';

const DataTable = observer(() => {
  const store = useStore();
  const [data, setData] = useState(store.TableData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

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
    console.log('number', rowsPerPage);
  };

  // const requestSearch = (searchedVal: string): any => {
  //   const filteredRows = originalRows.filter((row) => {
  //     return row.name.toLowerCase().includes(searchedVal.toLowerCase());
  //   });
  //   setRows(filteredRows);
  // };

  // const cancelSearch = () => {
  //   setSearched('');
  //   requestSearch(searched);
  // };

  const searchCoin = (e: any) => {
    const filterCoins = store.TableData.filter((coin: any) => {
      if (coin.name) {
        return coin.name.includes(e.target.value.toLowerCase());
      }
      return null;
    });
    setData(filterCoins);
  };

  return (
    <div id='tableComponent'>
      <hr />
      <div className='flex m-4 justify-end'>
        <TextField
          id='search-coin'
          label='Search Coin'
          variant='outlined'
          onChange={searchCoin}
          size='small'
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHeader />
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow
                  key={row.name}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className='bg-white text-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <TableCell
                    sx={{
                      color: 'rgb(156 163 175)',
                    }}
                  >
                    <div className='flex'>
                      <img
                        className='mr-2 w-5 h-5'
                        src={row.img}
                        alt={row.name}
                      />
                      {row.symbol}
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: 'rgb(156 163 175)' }} align='right'>
                    ${row.currentPrice}
                  </TableCell>
                  <TableCell
                    sx={{ color: 'rgb(156 163 175)' }}
                    align='right'
                    className={`${
                      Math.sign(row.priceChangePercentage24h) === -1
                        ? 'text-rose-500 negative-arrow'
                        : 'text-emerald-500 positive-arrow'
                    } `}
                  >
                    {row.priceChangePercentage24h}%
                  </TableCell>
                  <TableCell sx={{ color: 'rgb(156 163 175)' }} align='right'>
                    ${row.marketCap}
                  </TableCell>
                  <TableCell sx={{ color: 'rgb(156 163 175)' }} align='right'>
                    <Link
                      className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                      to={`coin?=${row.name}`}
                    >
                      See More
                    </Link>
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
        count={store.TableData.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
        sx={{ color: 'rgb(156 163 175)' }}
      />
    </div>
  );
});

export default DataTable;
