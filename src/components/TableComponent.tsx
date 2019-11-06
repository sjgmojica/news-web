import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';


const columns = [
  { id: 'name', label: 'Article Title', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'image', label: 'Image', minWidth: 100 }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '2%',
    position: 'sticky'
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

export default function TableComponent(value : any ) {
  const { data } = value;
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event : any , newPage : any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event : any ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table" size="medium">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 1 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row : any ) => {
              return (
                <TableRow key={row.id}>
                  {columns.map((column : any ) => {
                    const value = row[column.id] ? row[column.id] : '';
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }) : null}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[20, 25, 100]}
        component="div"
        count={data && data.length > 1 ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
