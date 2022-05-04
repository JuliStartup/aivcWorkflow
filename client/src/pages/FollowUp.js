import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
  DialogActions,
  Paper,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  MenuItem,
  Radio,
  FormControlLabel,
  RadioGroup
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Page from '../components/Page';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/posts';
import * as api from '../api/index.js';
import { mockImgAvatar } from 'src/utils/mockImages';
import { eFileStatus } from 'src/constants/actionTypes';
import { FILTER_CATEGORY_OPTIONS } from 'src/sections/@dashboard/products/ProductFilterSidebar';
const TABLE_HEAD = [
  { id: 'clientName', label: 'Client Name', alignRight: false },
  { id: 'note', label: 'Note', alignRight: false },
  { id: 'createdBy', label: 'Created By', alignRight: false },
  { id: 'createdAt', label: 'Created On', alignRight: false },
  { id: 'fileStatus', label: 'Status', alignRight: false },
  { id: 'assignee', label: 'Assignee', alignRight: false }
];

export default function FollowUp() {
  const [USERLIST, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.fetchPosts();
      let myData = result.data;
      myData = myData.filter((x) => x.fileStatus === eFileStatus.FollowUp);
      myData.forEach((x, index) => {
        x.createdAt = new Date(x.createdAt).toDateString();
        x.id = x._id;
        x.avatarUrl = mockImgAvatar(index + 1);
        x.isRetained = x.fileStatus === eFileStatus.Retained;
        x.historicalNotes.forEach((y) => (y.createdAt = new Date(x.createdAt).toDateString()));
      });
      setData(myData);
    };
    fetchData();
  }, []);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('clientName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const assigneeList = [
    {
      value: 'Bishan',
      label: 'Bishan'
    },
    {
      value: 'Monish',
      label: 'Monish'
    }
  ];
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query) {
    if (USERLIST) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      if (query) {
        return filter(
          array,
          (_user) => _user?.clientName?.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      }
      return stabilizedThis.map((el) => el[0]);
    }
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.clientName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, clientName) => {
    const selectedIndex = selected.indexOf(clientName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, clientName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [postData, setPostData] = useState({
    clientName: '',
    historicalNotes: [],
    assignee: '',
    fileStatus: 'FollowUp',
    emailSent: true
  });
  const [assignee, setAssignee] = useState('');

  const handleChange = (event) => {
    setAssignee(event.target.value);
    let assigneeUpdate = event.target.value;
    setPostData({ ...postData, assignee: assigneeUpdate });
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    let notes1 = dispatch(createPost({ ...postData }));
  };
  const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const isItemSelected = selected.indexOf(row.clientName) !== -1;
    return (
      <>
        <TableRow
          hover
          tabIndex={-1}
          role="checkbox"
          selected={isItemSelected}
          aria-checked={isItemSelected}
        >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.clientName}
          </TableCell>
          {/* <TableCell component="th" scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* <Avatar alt={clientName} src={avatarUrl} /> 
              <Typography variant="subtitle2" noWrap>
                {row.clientName}
              </Typography>
            </Stack>
          </TableCell> */}
          <TableCell align="left">{row.category}</TableCell>
          <TableCell align="left">{row.createdAt}</TableCell>
          <TableCell align="left">{row.isRetained ? 'Yes' : 'No'}</TableCell>

          <TableCell align="left">{row.fileStatus}</TableCell>
          <TableCell align="left">{row.assignee}</TableCell>

          {/* <TableCell align="left">
            <Label variant="ghost" color={(row.status === 'banned' && 'error') || 'success'}>
              {sentenceCase(row.status)}
            </Label>
          </TableCell> */}
          <TableCell align="right">
            <UserMoreMenu rowId={row.id} rowData={row} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Historical Notes
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Note</TableCell>
                      <TableCell>Created On</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row &&
                      !!row?.historicalNotes &&
                      row?.historicalNotes?.length &&
                      row?.historicalNotes.map((historyRow, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {historyRow.note}
                          </TableCell>
                          <TableCell>{historyRow.createdAt}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers?.length === 0;

  const [followUpTarget, setFollowUpTarget] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <Page title="User | AIVC">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Follow Users
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add FollowUp
          </Button>
        </Stack>
        {USERLIST && (
          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />

                  <TableBody>
                    {filteredUsers &&
                      filteredUsers.length &&
                      filteredUsers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          return row && <Row key={index} row={row} />;
                        })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Add Follow-up</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            <Paper>
              <form onSubmit={handleSubmit}>
                <Typography variant="subtitle1" gutterBottom>
                  Select FollowUp Target
                </Typography>
                <RadioGroup id="radiomy">
                  {['Office', 'Client'].map((item) => (
                    <FormControlLabel
                      onChange={(e, val) => setFollowUpTarget(e.target.value)}
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
                {followUpTarget && followUpTarget === 'Office' ? (
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-select-currency"
                    select
                    label="Select Assignee"
                    value={assignee}
                    onChange={handleChange}
                    fullWidth
                    // helperText="Please select your currency"
                  >
                    {assigneeList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : followUpTarget && followUpTarget === 'Client' ? (
                  <TextField
                    sx={{ m: 1 }}
                    id="outlined-basic"
                    fullWidth
                    value={postData.clientName}
                    onChange={(e) => {
                      setPostData({ ...postData, email: e.target.value });
                    }}
                    label="Client Email"
                    variant="outlined"
                  />
                ) : (
                  <></>
                )}
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-basic"
                  fullWidth
                  value={postData.clientName}
                  onChange={(e) => {
                    setPostData({ ...postData, clientName: e.target.value });
                  }}
                  label="Client Name"
                  variant="outlined"
                />
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-basic"
                  value={postData.historicalNotes[0]}
                  multiline
                  rows={4}
                  onChange={(e) => {
                    setPostData({
                      ...postData,
                      historicalNotes: { note: e.target.value, createdAt: new Date().toISOString() }
                    });
                  }}
                  fullWidth
                  label="Follow-up Note"
                  variant="outlined"
                />{' '}
                <Typography />
                <DialogActions>
                  <Button onClick={handleClose} type="button" color="grey" variant="contained">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" variant="contained">
                    Send
                  </Button>
                </DialogActions>
              </form>
            </Paper>
          </DialogContent>
        </Dialog>
      </Container>
    </Page>
  );
}
