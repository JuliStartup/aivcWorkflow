import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Paper,
  Select,
  MenuItem,
  TextField,
  Typography,
  TextareaAutosize
} from '@mui/material';
import React from 'react';

export default function NewClient() {
  return (
    <div>
      <Paper>
        <form
          autoComplete="off"
          noValidate
          // onSubmit={handleSubmit}
        >
          <Typography variant="h6">New Client</Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Client name" variant="outlined" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Email" type="email" variant="outlined" />
            <TextField id="outlined-basic" label="Phone" variant="outlined" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status/Action</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <TextareaAutosize aria-label="Enter address" minRows={5} placeholder="Address" />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              //   size="small"
              //    onClick={clear}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}
