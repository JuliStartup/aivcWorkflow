import React, { useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper
} from '@mui/material';
import html2canvas from 'html2canvas';
import { Buffer } from 'buffer';
import jsPDf from 'jspdf';
import * as api from '../../api/index.js';
import styles from './style.module.css';
import { getBase64 } from 'src/utils/getbase64';
export default function PDFViewer() {
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const [sigPad, setSigPad] = useState({});
  const [signPad, setSignPad] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
    clear();
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const clear = () => {
    sigPad.clear();
  };
  const trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
    setSignPad(false);
    setOpenDialog(false);
  };
  const showSignPad = (e) => {
    setSignPad(true);
  };
  const [postData, setPostData] = useState({
    retainerFile: null,
    email: user?.result
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('myform');
    html2canvas(input, { width: 400, height: 400 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDf();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      uploadFile(pdf.output('blob'));
    });
  };
  const uploadFile = (pdfFile) => {
    let counter = 0;
    getBase64(pdfFile).then((data) => {
      counter++;
      if (counter === 1) {
        let data1 = {
          fileC: data,
          type: pdfFile.type,
          size: pdfFile.size
        };
        data1['retainFile'] = 'retainer-agreement.pdf';
        postData['retainerFile'] = data1;
        fetchDataAction(postData);
      }
    });
  };
  const showSignPad1 = () => {
    setSignPad(true);
    setOpenDialog(true);
  };
  const fetchDataAction = async () => {
    let userData = await api.getPost(user.result);
    if (userData && userData.data.length) {
      let newPost = await api.updatePost(userData.data[0]._id, {
        ...postData,
        name: user?.result
      });
      if (newPost) localStorage.setItem('isRetained', true);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit} id="myform">
        <Grid container spacing={2} columns={12}>
          <Grid item xs={10}>
            BETWEEN
            {/* <Item>xs=8</Item> */}
          </Grid>
          <Grid item xs={2}>
            <Box
              component="img"
              src="/static/AIVC-logos_transparent.png"
              sx={{ width: 40, height: 40 }}
            />
            {/* <Item>xs=8</Item> */}
          </Grid>
          <Grid item xs={12}>
            <div>CANOSCOPE IMMIGRATION LTD </div>
            <div>Unit-206, 12885 80 th AVENUE</div>
            <div> SURREY, BRITISH COLUMBIA, CANADA V3W 0E6 </div>
            <div>OFFICE MAIN 778-970-0007</div>
            <div> OFFICE FAX 778-404-1755</div>
            <div> EMAIL INFO@CANOSCOPE.COM</div>
          </Grid>
          <Grid item xs={12}>
            <div>(Together the “RCIC” and “CANOSCOPE”) </div>
            <div> AND </div>
          </Grid>
          <Grid item xs={12}>
            <div>FIRST NAME: </div>
            <div>LAST NAME:</div> <div>ADDRESS:</div> <div>CLIENT PHONE:</div>{' '}
            <div>CLIENT EMAIL ADDRESS:</div>
            <br />
            <div>(“Client”)</div>
            <br />
            <div>VIA EMAIL </div>
            <div> Client File Number:</div>
            <br></br>
            <div>Date: </div>
            <div>
              Thank you for retaining Canoscope Immigration Ltd. (“CANOSCOPE”) to act on your
              behalf.{' '}
            </div>
            <div>
              WHEREAS CANOSCOPE and the Client wish to enter into a written agreement which contains
              the agreed-upon terms and conditions upon which CANOSCOPE will provide services to the
              Client;{' '}
            </div>
            <div>
              AND WHEREAS CANOSCOPE is an incorporated entity owned by a Regulated Canadian
              Immigration Consultant (“RCIC”) duly authorized by the Immigration Consultants
              Regulatory Council of Canada (“ICCRC”), the regulator in Canada for immigration
              consultants;{' '}
            </div>
            <div>
              AND WHEREAS the RCIC or RCIC’s party to this agreement is/are Member(s) of the ICCRC.{' '}
            </div>
            <div>
              IN CONSIDERATION of the mutual covenants contained in this Agreement, the parties
              agree as follows:
            </div>{' '}
          </Grid>{' '}
          <Grid item xs={12}>
            {!trimmedDataURL ? (
              <input onChange={showSignPad1} type="text" id="fname" name="fname" value="John" />
            ) : (
              <img alt="title" className={styles.sigImage} src={trimmedDataURL} />
            )}
            <Button type="submit" color="primary" variant="contained">
              Send
            </Button>
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
              <SignaturePad
                canvasProps={{ className: styles.sigPad }}
                ref={(ref) => {
                  setSigPad(ref);
                }}
              />
              <DialogActions>
                <Button onClick={clear} type="button" color="grey" variant="contained">
                  Clear
                </Button>
                <Button type="submit" onClick={trim} color="primary" variant="contained">
                  Capture Signature
                </Button>
              </DialogActions>
            </Paper>
          </DialogContent>
        </Dialog>
        {/* <Grid>
          {' '}
          {signPad ? (
            <>
              <SignaturePad
                canvasProps={{ className: styles.sigPad }}
                ref={(ref) => {
                  setSigPad(ref);
                }}
              />
              <button className={styles.buttons} onClick={clear}>
                Clear
              </button>
              <button className={styles.buttons} onClick={trim}>
                Trim
              </button>
            </>
          ) : (
            <></>
          )}
        </Grid> */}
      </form>
    </Box>
  );
}
