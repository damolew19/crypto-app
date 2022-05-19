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
import axios from 'axios';
import { useEffect, useState } from 'react';
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { Data, Order } from './table.types';
import TableHeader from './TableHeader';

function DataTable() {
  const [data, setData] = useState<Data>([]);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const [valueToOrder, setValueToOrderBy] = useState<keyof Data | string>(
    'name',
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  // const [isFetching, setIsFetching] = useState(true);
  const fetchProducts = async () => {
    const response = await axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false',
      )
      .catch((e) => console.log(e));

    if (response) {
      console.log('products', response);
      const array: Data = [];
      response.data.forEach((item: any) => {
        array.push({
          symbol: item.symbol,
          name: item.id,
          currentPrice: item.current_price,
          priceChange24h: item.price_change_24h,
          img: item.image,
          marketCap: item.market_cap,
        });
      });
      console.log('array', array);
      setData(array);
      // setIsFetching(false);
    }
  };

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
    fetchProducts();
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
    console.log('her');
    const stabilizeArray = array.map((el: any, index: any) => [el, index]);
    stabilizeArray.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    console.log(
      'stable',
      stabilizeArray.map((el: any) => el[0]),
    );
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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHeader
            OrderDirection={orderDirection}
            ValueToOrder={valueToOrder}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortedData(data, getComparator(orderDirection, valueToOrder))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='right'>{row.currentPrice}</TableCell>
                  <TableCell align='right'>{row.priceChange24h}</TableCell>
                  <TableCell align='right'>{row.marketCap}</TableCell>
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
        count={data.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default DataTable;
