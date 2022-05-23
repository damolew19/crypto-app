import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { HeadCells } from './table.types';

function TableHeader() {
  // const [searched, setSearched] = useState<string>('');

  const headCells: HeadCells[] = [
    {
      id: 'Name',
      numeric: false,
      disablePadding: false,
    },
    {
      id: 'Current Price',
      numeric: true,
      disablePadding: false,
    },
    {
      id: 'Price Change 24 Hr',
      numeric: true,
      disablePadding: false,
    },
    {
      id: 'Market Cap',
      numeric: true,
      disablePadding: false,
    },
    {
      id: '',
      numeric: true,
      disablePadding: false,
    },
  ];

  return (
    <TableHead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{ color: 'rgb(156 163 175)' }}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
