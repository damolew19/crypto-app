import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import { HeadCells, TableHeaderProps } from './table.types';

function TableHeader(props: TableHeaderProps) {
  const { OrderDirection, ValueToOrder, onRequestSort } = props;
  // handle the sorting request
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

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
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={
              ValueToOrder === headCell.id ? OrderDirection : false
            }
          >
            <TableSortLabel
              active={ValueToOrder === headCell.id}
              direction={ValueToOrder === headCell.id ? OrderDirection : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.id}
              {ValueToOrder === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {OrderDirection === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
