import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { HeadCells } from './table.types';

function TableHeader() {
  const headCells: HeadCells[] = [
    {
      title: 'Name',
      numeric: false,
      disablePadding: false,
    },
    {
      title: 'Current Price',
      numeric: true,
      disablePadding: false,
    },
    {
      title: 'Price Change 24 Hr',
      numeric: true,
      disablePadding: false,
    },
    {
      title: 'Market Cap',
      numeric: true,
      disablePadding: false,
    },
    {
      title: '',
      numeric: true,
      disablePadding: false,
    },
  ];

  return (
    <TableHead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.title}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{ color: 'rgb(156 163 175)' }}
          >
            {headCell.title}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
