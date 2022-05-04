import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { styled } from "@mui/material/styles";
import * as api from "../../api/index.js";
import { saveAs } from "file-saver";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router";
import { Buffer } from "buffer";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  TextField,
} from "@mui/material";

import { Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import Iconify from "../Iconify";
import { useDispatch } from "react-redux";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ClientApplication() {
  const [applicant, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const email = user?.result;
  const fetchDataByID = async (id) => {
    const result = await api.getPost(id);
    let myData = result.data;
    // myData = myData.find((x) => x.clientName === user?.result?.name);
    console.log(myData);
    if (myData.length) setData(myData[0]);
  };
  const { id } = useParams();
  if (id) fetchDataByID(id);
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.getPost(email);
      let myData = result.data;
      // myData = myData.find((x) => x.clientName === user?.result?.name);
      console.log(myData);
      if (myData.length) setData(myData[0]);
    };
    fetchData();
  }, []);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpenDialog(false);
  };
  const [postData, setPostData] = useState({
    clientName: "",
    historicalNotes: [],
    assignee: "",
    fileStatus: "FollowUp",
    emailSent: true,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    //  let notes1 = dispatch(createPost({ ...postData }));
  };
  return (
    <div>
      <Navbar isClient="true" />
      <Grid container spacing={2} style={{ marginTop: "100px" }}>
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
        </Grid>
        {/* {applicant && console.log(applicant.retainerFile.fileC)} */}
        <Button
          variant="contained"
          onClick={handleClickOpen}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Contact AIVC
        </Button>
        <Grid item xs={12}>
          <Item>
            {" "}
            <div>
              {applicant &&
                applicant.selectedFile.map((row, index) => {
                  const buffer = Buffer.from(row.fileC);
                  let base64String = buffer.toString();
                  return (
                    <>
                      <object
                        key={index}
                        data={base64String}
                        type="application/pdf"
                        width="50%"
                        aria-label={"Files"}
                        height="300"
                      />
                    </>
                  );
                })}
            </div>
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
                    historicalNotes: {
                      note: e.target.value,
                      createdAt: new Date().toISOString(),
                    },
                  });
                }}
                style={{ width: 500 }}
              />
              <DialogActions>
                <Button
                  onClick={handleClose}
                  type="button"
                  color="grey"
                  variant="contained"
                >
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
