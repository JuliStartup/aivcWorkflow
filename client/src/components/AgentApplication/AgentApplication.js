import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { styled } from '@mui/material/styles';
import * as api from '../../api/index.js';
import { saveAs } from 'file-saver';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';

import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextareaAutosize,
  TextField
} from '@mui/material';

import { Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';
import Iconify from '../Iconify';
import { useDispatch } from 'react-redux';
import { result } from 'lodash';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function AgentApplication() {
  const [applicant, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const email = user?.result;

  const { id } = useParams();
  useEffect(() => {
    const fetchDataByID = async () => {
      const result = await api.getPost(id);
      let myData = result.data;
      if (myData.length) setData(myData[0]);
    };

    // const fetchData = async () => {
    //   const result = await api.getPost(email);
    //   let myData = result.data;
    //   console.log(myData);
    //   if (myData.length) setData(myData[0]);
    // };
    fetchDataByID();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //  let notes1 = dispatch(createPost({ ...postData }));
  };
  const fetchMissing = (e) => {
    e.preventDefault();
    console.log(e);
  };
  const [state, setState] = React.useState({
    passport: false,
    education: false,
    workDoc: false,
    tuitionProof: false,
    ielts: false,
    GIC: false,
    LOA: false,
    photo: false,
    medicals: false,
    familyInfo: false,
    proofOfFunds: false,
    scholarship: false,
    sponsorship: false,
    employmentProof: false,
    affidavit: false
  });
  const [missingDocs, setMissingDocs] = React.useState([]);
  const handleChange = (event) => {
    event.preventDefault();
    console.log(missingDocs);
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
    if (event.target.checked && !missingDocs.includes(event.target.name)) {
      missingDocs.push(event.target.name);
    }
    if (
      event.target.checked === false &&
      missingDocs.findIndex((e) => e === event.target.name) > -1
    ) {
      setMissingDocs(missingDocs.filter((x) => x !== event.target.name));
    }
  };
  const [postData, setPostData] = useState({
    clientName: '',
    historicalNotes: [],
    assignee: '',
    fileStatus: 'FollowUp',
    emailSent: true,
    missingDocs: missingDocs
  });
  const [postData1, setPostData1] = useState({
    assignee: user?.result,
    fileStatus: 'MissingDocsNotify',
    emailSent: true,
    missingDocs: missingDocs
  });
  const handleClickOpen = async (e) => {
    // setOpenDialog(true);
    e.preventDefault();
    console.log(applicant);
    postData.missingDocs = missingDocs;
    let updatePost = await api.updatePost(applicant._id, {
      ...postData1,
      name: user?.result?.name
    });
  };
  const {
    passport,
    education,
    workDoc,
    tuitionProof,
    ielts,
    GIC,
    LOA,
    photo,
    medicals,
    familyInfo,
    proofOfFunds,
    scholarship,
    sponsorship,
    employmentProof,
    affidavit
  } = state;
  return (
    <div>
      <Navbar isClient="true" />
      <Grid container spacing={2} style={{ marginTop: '100px' }}>
        <Grid item xs={12}>
          {applicant && (
            <Container>
              <h1>{applicant.category} Application Details</h1>
              <p>Applicant Name: {applicant.clientName}</p>
              <p>Applicant Email: {applicant.email}</p>
              <p>File Status: {applicant.fileStatus}</p>

              {applicant.missingDocs && applicant.missingDocs.length ? (
                <p>Missing/Invalid Documents: {applicant.missingDocs}</p>
              ) : (
                <></>
              )}
              <p>Documents Provided: </p>
            </Container>
          )}
        </Grid>{' '}
        <Grid item xs={12}>
          <Item>
            {' '}
            <div>
              {applicant &&
                applicant.selectedFile.map((row, index) => {
                  return (
                    <>
                      <object
                        key={index}
                        data={row.fileC}
                        type="application/pdf"
                        width="50%"
                        aria-label={'Files'}
                        height="300"
                      />
                    </>
                  );
                })}
            </div>
            <Box sx={{ display: 'flex' }}>
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel
                  component="legend"
                  style={{ textAlign: 'left', fontSize: '20px', fontWeight: 600 }}
                >
                  Is any document missing or invalid?
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={passport} onChange={handleChange} name="passport" />
                    }
                    label="Passport and previous passport if any"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={education} onChange={handleChange} name="education" />
                    }
                    label="Recent Education Transcript"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={workDoc} onChange={handleChange} name="workDoc" />}
                    label="Evidence of Work Requirement in Study"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tuitionProof}
                        onChange={handleChange}
                        name="tuitionProof"
                      />
                    }
                    label="Proof of first year tuition payment"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={ielts} onChange={handleChange} name="ielts" />}
                    label="Proof of IELTS language test results"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={GIC} onChange={handleChange} name="GIC" />}
                    label="Proof of Guaranteed Investment Certificate (GIC)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={LOA} onChange={handleChange} name="LOA" />}
                    label="Letter of Acceptance"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={photo} onChange={handleChange} name="photo" />}
                    label="Digital photo"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={medicals} onChange={handleChange} name="medicals" />
                    }
                    label="Proof of upfront medical exam"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={familyInfo} onChange={handleChange} name="familyInfo" />
                    }
                    label="Family Information"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={proofOfFunds}
                        onChange={handleChange}
                        name="proofOfFunds"
                      />
                    }
                    label="Proof of Funds – ITR (Parents or student)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={scholarship} onChange={handleChange} name="scholarship" />
                    }
                    label=" Any scholarship from the Govt., if applicable"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={sponsorship} onChange={handleChange} name="sponsorship" />
                    }
                    label="Sponsorship Letters"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={employmentProof}
                        onChange={handleChange}
                        name="employmentProof"
                      />
                    }
                    label="Proof of employment, if applicable"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={affidavit} onChange={handleChange} name="affidavit" />
                    }
                    label="Supporting affidavit"
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Notify Client for Missing Docs
                </Button>
              </FormControl>
            </Box>
          </Item>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Reach out to us</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <Paper>
            <form onSubmit={handleSubmit}>
              <TextareaAutosize
                minRows={6}
                aria-label="Enter your query here"
                placeholder="Enter your query here"
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    historicalNotes: { note: e.target.value, createdAt: new Date().toISOString() }
                  });
                }}
                style={{ width: 500 }}
              />
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
    </div>
  );
}
