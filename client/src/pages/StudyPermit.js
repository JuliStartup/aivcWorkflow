import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  TextField,
  MenuItem,
  DialogActions
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import * as api from '../api/index.js';
import { createPost } from 'src/actions/posts';
import { mockImgAvatar } from 'src/utils/mockImages';
import { eCategory, eFileStatus } from 'src/constants/actionTypes';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'clientName', label: 'Name', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'createdAt', label: 'Created On', alignRight: false },
  { id: 'isRetained', label: 'Retained', alignRight: false },
  { id: 'fileStatus', label: 'Status', alignRight: false },
  { id: 'assignee', label: 'Assigned', alignRight: false },
  { id: 'uploadedToOneDrive', label: 'In OneDrive', alignRight: false }
];

export default function StudyPermit() {
  const [USERLIST, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.fetchPosts();
      let myData = result.data;
      myData = myData.filter(
        (x) => x.category === (eCategory.StudyPermit || eCategory.ExtendStudyPermit)
      );
      myData.forEach((x, index) => {
        x.createdAt = new Date(x.createdAt).toDateString();
        x.id = x._id;
        x.avatarUrl = mockImgAvatar(index + 1);
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user?.clientName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const [mode, setMode] = useState('');

  const modeList = [
    {
      value: 'Walk-In',
      label: 'Walk-In'
    },
    {
      value: 'Reference',
      label: 'Reference'
    },
    {
      value: 'Phone',
      label: 'Phone'
    }
  ];
  const handleChangeFileStatus = (event) => {
    setFileStatus(event.target.value);
    let assigneeUpdate = event.target.value;
    setPostData({ ...postData, fileStatus: assigneeUpdate });
  };
  const [fileStatus, setFileStatus] = useState('');

  const fileStatusList = [
    {
      value: 'FollowUp',
      label: 'FollowUp'
    },
    {
      value: 'Retained',
      label: 'Retained'
    },
    {
      value: 'Client Not Interested',
      label: 'Client Not Interested'
    },
    {
      value: 'Client Yet To Decide',
      label: 'Client Yet To Decide'
    }
  ];
  const handleChangeMode = (event) => {
    setMode(event.target.value);
    let assigneeUpdate = event.target.value;
    setPostData({ ...postData, mode: assigneeUpdate });
  };
  const [category, setCategory] = useState('');

  const categoryList = [
    {
      value: 'Study Permit',
      label: 'Study Permit'
    },
    {
      value: 'TRV',
      label: 'TRV'
    },
    {
      value: 'Super Visa',
      label: 'Super Visa'
    },
    {
      value: 'BC PNP',
      label: 'BC PNP'
    },
    {
      value: 'Spousal Open Work Permit',
      label: 'Spousal Open Work Permit'
    },
    {
      value: 'Spousal PR',
      label: 'Spousal PR'
    },
    {
      value: 'CEC',
      label: 'CEC'
    },
    {
      value: 'FSW',
      label: 'FSW'
    }
  ];
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    let assigneeUpdate = event.target.value;
    setPostData({ ...postData, category: assigneeUpdate });
  };
  const [postData, setPostData] = useState({
    clientName: '',
    category: '',
    email: '',
    phone: '',
    address: '',
    fileStatus: 'FollowUp',
    note: [],
    mode: '',
    note1: ''
  });
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const filteredUsers =
    USERLIST && applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers?.length === 0;
  const handleSubmit = (event) => {
    event.preventDefault();

    postData?.historicalNotes.push({ note: postData.note1 });
    let notes1 = dispatch(createPost({ ...postData }));

    // if (notes1) {
    //   // handleClickEvent();
    // }
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const updatePage = (data) => {
    console.log(data);
    // setData(data);
  };
  const history = useNavigate();
  const goToApplication = (e, id) => {
    e.preventDefault();
    // updateDocs();
    history(`/applications/${id}`);
  };
  const getCellValue = (email) => {
    // e.preventDefault();
    // updateDocs();
    console.log(email);
    history(`/file/${email}`);
  };
  //  const       getCellValue function : onClick={() => setCellValue(cell.value)}
  return (
    <Page title="User | AIVC">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          {/* <Button
            variant="contained"
            // component={RouterLink}
            // to="#"

            onClick={handleClickOpen}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add User
          </Button> */}
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
                        .map((row) => {
                          const {
                            id,
                            email,
                            clientName,
                            createdAt,
                            fileStatus,
                            category,
                            avatarUrl,
                            isRetained,
                            assignee,
                            uploadedToOneDrive
                          } = row;
                          console.log(row);
                          const isItemSelected = selected.indexOf(clientName) !== -1;

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              assignee="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={clientName} src={avatarUrl} />
                                  <Typography variant="subtitle2" noWrap>
                                    {clientName}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{category}</TableCell>
                              <TableCell align="left">{createdAt}</TableCell>
                              <TableCell align="left">{isRetained ? 'Yes' : 'No'}</TableCell>
                              <TableCell align="left">{fileStatus}</TableCell>
                              <TableCell align="left">{assignee}</TableCell>
                              <TableCell align="left">
                                {uploadedToOneDrive ? 'Yes' : 'No'}
                              </TableCell>
                              <TableCell onClick={() => getCellValue(email)}>
                                <Button
                                  variant="contained"
                                  // onClick={goToApplication}
                                  // startIcon={<Iconify icon="eva:plus-fill" />}
                                >
                                  View Details
                                </Button>
                              </TableCell>
                              <TableCell align="right">
                                <UserMoreMenu
                                  updatePage={updatePage}
                                  rowId={row.id}
                                  rowData={row}
                                />
                              </TableCell>
                            </TableRow>
                          );
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
          <DialogTitle>Create New Study File</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
            <Paper>
              <form onSubmit={handleSubmit}>
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-basic"
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
                  value={postData.phone}
                  onChange={(e) => {
                    setPostData({ ...postData, phone: e.target.value });
                  }}
                  label="Phone"
                  variant="outlined"
                />
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-basic"
                  value={postData.email}
                  onChange={(e) => {
                    setPostData({ ...postData, email: e.target.value });
                  }}
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-basic"
                  value={postData.address}
                  onChange={(e) => {
                    setPostData({ ...postData, address: e.target.value });
                  }}
                  label="Address"
                  variant="outlined"
                />
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-select-currency"
                  select
                  label="Category"
                  value={category}
                  onChange={handleChangeCategory}
                  fullWidth
                  // helperText="Please select your currency"
                >
                  {categoryList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-select-currency"
                  select
                  label="Status/Action"
                  value={fileStatus}
                  onChange={handleChangeFileStatus}
                  fullWidth
                  // helperText="Please select your currency"
                >
                  {fileStatusList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-select-currency"
                  select
                  label="Mode of Contact"
                  value={mode}
                  onChange={handleChangeMode}
                  fullWidth
                  // helperText="Please select your currency"
                >
                  {modeList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  sx={{ m: 1 }}
                  id="outlined-basic"
                  value={postData.note1}
                  multiline
                  rows={4}
                  onChange={(e) => {
                    setPostData({ ...postData, note1: e.target.value });
                  }}
                  fullWidth
                  label="Additional Note"
                  variant="outlined"
                />
                <Typography />
                <DialogActions>
                  <Button onClick={handleClose} type="button" color="grey" variant="contained">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" variant="contained">
                    Create
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
