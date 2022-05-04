import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as api from '../../../api/index.js';
import './UploadDocs.scss';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { Buffer } from 'buffer';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { makeStyles } from '@mui/styles';
import { getBase64 } from 'src/utils/getbase64.js';
export default function UploadNewStudyDocs() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [postData, setPostData] = useState({
    selectedFile: [],
    email: user.result
  });
  const useStyles = makeStyles((theme) => ({
    label: { color: '#38368a' }
  }));
  const fetchDataAction = async () => {
    let userData = await api.getFilePost(user.result);
    if (userData && !userData.data.length) {
      let newPost = await api.createFilePost({ ...postData });
      if (newPost) localStorage.setItem('enableBtn', true);
    } else {
      let updatePost = await api.updateFilePost(userData.data[0]._id, {
        ...postData,
        name: user?.result?.name
      });
      if (updatePost) localStorage.setItem('enableBtn', true);
    }
  };
  let counter = 0;
  const updateFileUpload = (fileItems, docLabel) => {
    let myFile = fileItems[0]['file'];
    if (fileItems && fileItems[0]['file'].size <= 4000000) {
      getBase64(myFile).then((data) => {
        counter++;

        if (counter === 1) {
          if (
            postData.selectedFile.length &&
            postData.selectedFile.findIndex((x) => x[docLabel] === myFile.name) < 0
          ) {
            let data1 = {
              fileC: new Buffer(data),
              type: myFile.type,
              size: myFile.size
            };
            data1[docLabel] = myFile.name;
            postData['selectedFile'].push(data1);
          } else {
            let data1 = {
              fileC: new Buffer(data),
              type: myFile.type,
              size: myFile.size
            };
            data1[docLabel] = myFile.name;
            postData['selectedFile'].push(data1);
          }
          fetchDataAction(postData);
        }
      });
    } else {
      console.log('File is too large');
    }
  };
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  registerPlugin(
    FilePondPluginFileValidateSize,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
  );
  return (
    <>
      <Paper style={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <Typography align="center" className={classes.label} style={{ padding: 10 }} variant="h4">
            Upload your files here
          </Typography>
          <form
          // onSubmit={fetchDataAction}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <label className={classes.label}>Passport and merge Previous Passport if any</label>
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'passport');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Recent Education Transcript</label>
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              {/* accept="image/*,.docx,.pdf" */}
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'education');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Evidence of Work Requirement in Study</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'workDoc');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of first year tuition payment</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'tuitionProof');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of IELTS language test results</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'ielts');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>
                  Proof of Guaranteed Investment Certificate (GIC){' '}
                </label>
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'GIC');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Letter of Acceptance</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'LOA');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Digital Photo</label>{' '}
                <a
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/temporary-resident-visa-application-photograph-specifications.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  <h5>Click to follow the specification for digital photo </h5>
                </a>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'photo');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of upfront medical exam</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'medicals');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Family Information</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'familyInfo');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of Funds - ITR (Parents or student) </label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'proofOfFunds');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>
                  Any scholarship from the Govt., if applicable
                </label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'scholarship');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Sponsorship Letters</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'sponsorship');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of employment, if applicable</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'employmentProof');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">If minor:</Typography>{' '}
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Supporting affidavit</label>{' '}
                <h5>Supported File Type: *.pdf max 4MB</h5>
              </Grid>
              <Grid item xs={6}>
                <FilePond
                  files={files}
                  allowFileSizeValidation={true}
                  maxFileSize="4MB"
                  dropValidation={true}
                  labelMaxFileSizeExceeded={'File is too large'}
                  onupdatefiles={(fileItems) => {
                    counter = 0;
                    updateFileUpload(fileItems, 'affidavit');
                  }}
                  labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
                />
              </Grid>
            </Grid>{' '}
            {/* <Button type="submit" color="primary" variant="contained">
              Upload
            </Button> */}
            {}
          </form>
        </Container>
      </Paper>
    </>
  );
}
