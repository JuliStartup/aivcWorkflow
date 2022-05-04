import { Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as api from '../../api/index.js';
import FileBase from 'react-file-base64';
import { updatePost } from 'src/actions/posts';
import { fileSelected } from 'src/ui.js';
import { makeStyles } from '@mui/styles';
import './UploadDocs.scss';
export default function UploadSpousalDocs() {
  const [postData, setPostData] = useState({
    selectedFile: [],
    clientName: '',
    phone: '',
    email: ''
  });

  const useStyles = makeStyles((theme) => ({
    label: { color: '#38368a' }
  }));
  const fetchDataAction = async () => {
    // let newPost = await api.updatePost(st, { ...postData, name: user?.result?.name });
  };
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  let [selectedFile, setSelectedFile] = useState(null);
  return (
    <>
      <Paper style={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <Typography align="center" className={classes.label} style={{ padding: 10 }} variant="h4">
            Upload your files here
          </Typography>
          <form
          // onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <label className={classes.label}>Passport and Previous Passport if any</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  id="educ"
                  type="file"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('educ');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Recent Education Transcript</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  id="passport"
                  type="file"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('passport');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Evidence of Work Requirement in Study</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of first year tuition payment</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of IELTS language test results</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>
                  Proof of Guaranteed Investment Certificate (GIC){' '}
                </label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Letter of Acceptance</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Digital Photo</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of upfront medical exam</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Family Information</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of Funds - ITR (Parents or student) </label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>
                  Any scholarship from the Govt., if applicable
                </label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Sponsorship Letters</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Proof of employment, if applicable</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">If minor:</Typography>{' '}
              </Grid>
              <Grid item xs={6}>
                <label className={classes.label}>Supporting affidavit</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  id="ielts"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('ielts');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        // console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </Container>{' '}
        {/* <div style={{ marginTop: '10%' }}>
          <Typography variant="h5">OR</Typography>
        </div>
        <Container
          style={{
            width: '20%',
            padding: 0,
            margin: 0,
            marginLeft: '10px'
          }}
        >
          <Typography variant="h4">Merge all files and</Typography>
          <form
          // onSubmit={handleSubmit}
          >
            <Grid
              container
              spacing={2}
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Grid item xs={12}>
                <label className={classes.label}>Passport and Previous Passport if any</label>
              </Grid>
              <Grid item xs={12}>
                <input
                  id="educ"
                  type="file"
                  accept="image/*,.docx,.pdf"
                  onChange={(e) => {
                    var fileInput = document.getElementById('educ');
                    var maxSize = 4000000;
                    let filemy = e.target.files;
                    if (filemy.length) {
                      var fileSize = filemy[0].size;
                      console.log(filemy[0], fileInput);
                      if (fileSize > maxSize) {
                        console.log('file size is more then' + maxSize + ' bytes');
                        return false;
                      } else {
                        console.log('file size is correct- ' + fileSize + ' bytes');
                        if (!postData.selectedFile) {
                          postData.selectedFile = { name: filemy[0].name, size: filemy[0].size };
                        } else {
                          postData['selectedFile'].push({
                            name: filemy[0].name,
                            size: filemy[0].size
                          });
                          console.log(postData);
                        }
                        // let suc = fileSelected(postData.selectedFile, postData.clientName);
                        fetchDataAction();
                      }
                    } else {
                      console.log('choose file, please');
                      return false;
                    }
                  }}
                />
              </Grid>
            </Grid>
          </form>{' '}
        </Container> */}
      </Paper>
    </>
  );
}
