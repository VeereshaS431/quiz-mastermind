import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, Typography, useMediaQuery, useTheme, IconButton, Box } from '@mui/material';
import { get, getDatabase, ref, remove } from "firebase/database";
import { app } from '../firebase/firebaseConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';


const columns = [
  { id: 'questions', label: 'Questions', minWidth: 170 },
  { id: 'option A', label: 'Option A', minWidth: 100 },
  { id: 'option B', label: 'Option B', minWidth: 100 },
  { id: 'option C', label: 'Option C', minWidth: 100 },
  { id: 'option D', label: 'Option D', minWidth: 100 },
  { id: 'answer', label: 'Answers', minWidth: 100 },
  { id: 'action', label: 'Actions', minWidth: 100 }
 
];



export default function JavaScriptTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows]=React.useState([])
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  React.useEffect(()=>{
    fetchData()
  },[])
  const fetchData=async()=>{
    const db=getDatabase(app)
    const dbRef=ref(db, "quize/javascript");
    const snapshot= await get(dbRef);
    if(snapshot.exists()){
        const mydata=snapshot.val()
        console.log(mydata)
        const tempArry=Object.keys(mydata).map(each=>{
            return {
                ...mydata[each],id:each
            }
        })
        console.log(tempArry)
        setRows(tempArry)
    }else{
        alert("No data")
    }
}

const deleteQuestion=async(firebaseId)=>{
    console.log(firebaseId)
    const db=getDatabase(app)
    const dbref=ref(db,"quize/javascript/"+firebaseId);
    await remove(dbref);
    fetchData();
}

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflowX: 'auto', marginTop: "20px" }}>
      <Typography variant="h5" component="h5" style={{ padding: "20px" }}>
        javascript Questions
      </Typography>
      <Divider component="h5" />
      {isSmallScreen ? (
        rows.map((row) => (
          <Paper key={row.id} sx={{ margin: '10px', padding: '10px' }}>
            <Typography variant="h6">{row.question}</Typography>
            {row.options.map((option, index) => (
              <Typography key={index} variant="body1">{`Option ${String.fromCharCode(65 + index)}: ${option}`}</Typography>
            ))}
            <Typography variant="body1">{`Answer: ${row.answer}`}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <IconButton onClick={() => deleteQuestion(row.id)}>
                <DeleteIcon sx={{ "&:active": { color: "#FFBF00" } }} />
              </IconButton>
              <IconButton component={Link} to={`/htmlupdate/${row.id}`}>
                <EditIcon />
              </IconButton>
            </Box>
          </Paper>
        ))
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="left">{row.question}</TableCell>
                  {row.options.map((option, index) => (
                    <TableCell key={index} align="left">{option}</TableCell>
                  ))}
                  <TableCell align="left">{row.answer}</TableCell>
                  <TableCell align="left">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <IconButton onClick={() => deleteQuestion(row.id)}>
                        <DeleteIcon sx={{ "&:active": { color: "#FFBF00" } }} />
                      </IconButton>
                      <IconButton component={Link} to={`/jsupdate/${row.id}`}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
