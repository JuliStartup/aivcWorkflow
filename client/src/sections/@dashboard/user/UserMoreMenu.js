import { useRef, useState } from 'react';
// material
import * as api from '../../../api/index.js';
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Paper,
  Typography,
  DialogTitle,
  ListItem
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { updatePost, getPosts } from '../../../actions/posts';
import { displayUI, fileSelected } from 'src/ui';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ rowId, rowData, updatePage }) {
  const ref = useRef(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [isOpen, setIsOpen] = useState(false);
  const onToggleEditMode = (rowId) => {
    handleClickOpen();
  };
  const onToggleUploadMode = (row) => {
    let suc = fileSelected(row.selectedFile, row.clientName, rowId);
  };
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenEditDialog(true);
  };

  const handleClose = () => {
    setOpenEditDialog(false);
  };
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    clientName: rowData?.clientName,
    category: rowData?.category,
    email: rowData?.email,
    phone: rowData?.phone,
    // address: rowData?.address,
    fileStatus: rowData?.fileStatus,
    selectedFile: rowData?.selectedFile,
    // gender: rowData?.gender,
    // mode: rowData?.mode,
    historicalNotes: rowData?.historicalNotes,
    id: rowData?.id,
    assignee: rowData?.assignee,
    myVal: ''
  });
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
  const [assignee, setAssignee] = useState(rowData?.assignee);
  const handleChange = (event) => {
    setAssignee(event.target.value);
    let assigneeUpdate = event.target.value;
    setPostData({ ...postData, assignee: assigneeUpdate });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    rowData?.historicalNotes.push({ note: postData.myVal, createdAt: new Date().toISOString() });
    setPostData({ ...postData, historicalNotes: rowData.history });
    let note = dispatch(updatePost(rowId, { ...postData, name: user?.result?.name }));

    // if (note) {
    //   const fetchData = async () => {
    //     const result = await api.fetchPosts();
    //     let myData = result.data;
    //     updatePage(myData);
    //   };
    // }
    handleClose();
  };
  const [toUpload, setUpload] = useState(localStorage.getItem('toUpload'));
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem>
          {toUpload ? (
            <></>
          ) : (
            <a id="signin" onClick={displayUI} href="#">
              <img src="./images/ms-symbollockup_signin_light.png" alt="Sign in with Microsoft" />
            </a>
          )}
        </MenuItem>

        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            onToggleUploadMode(rowData);
          }}
        >
          {rowData.uploadedToOneDrive ? (
            <></>
          ) : (
            <>
              <ListItemIcon>
                <Iconify icon="eva:cloud-upload-outline" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Upload" primaryTypographyProps={{ variant: 'body2' }} />
            </>
          )}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onToggleEditMode(rowId);
          }}
          // component={RouterLink}
          // to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <Dialog open={openEditDialog} onClose={handleClose}>
        <DialogTitle>Edit record</DialogTitle>
        <DialogContent>
          <Paper>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ m: 1 }}
                id="outlined-basic"
                fullWidth
                value={postData?.clientName}
                onChange={(e) => {
                  setPostData({ ...postData, clientName: e.target.value });
                }}
                label="Client Name"
                variant="outlined"
              />

              <TextField
                sx={{ m: 1 }}
                id="outlined-basic"
                multiline
                rows={4}
                value={postData?.myVal}
                onChange={(e) => {
                  setPostData({ ...postData, myVal: e.target.value });
                }}
                fullWidth
                label="Follow-up Note"
                variant="outlined"
              />
              <TextField
                sx={{ m: 1 }}
                id="outlined-select-currency"
                select
                label="Select"
                value={rowData?.assignee}
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
              <Typography />
              <DialogActions>
                <Button onClick={handleClose} type="button" color="grey" variant="contained">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Update
                </Button>
              </DialogActions>
            </form>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  );
}
