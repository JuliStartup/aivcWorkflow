import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import * as api from '../../api/index.js';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import Success from './Success';
import SquarePayment from './SquarePayment.js';
import UploadNewVisitDocs from './UploadDocs/UploadNewVisitDocs.js';
import UploadExtendVisitDocs from './UploadDocs/UploadExtendVisitDocs.js';
import UploadNewStudyDocs from './UploadDocs/UploadNewStudyDocs.js';
import UploadExtendStudyDocs from './UploadDocs/UploadExtendStudyDocs.js';
import UploadExtendWorkDocs from './UploadDocs/UploadExtendWorkDocs.js';
import UploadPGWPDocs from './UploadDocs/UploadPGWPDocs.js';
import UploadSpousalDocs from './UploadDocs/UploadSpousalDocs.js';
import UploadCECDocs from './UploadDocs/UploadCECDocs.js';
import UploadPNPDocs from './UploadDocs/UploadPNPDocs.js';
import UploadFSWDocs from './UploadDocs/UploadFSWDocs.js';
import PDFViewer from './PDFViewer.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiStepIcon-root.Mui-completed': { color: '#007B55' },
    '& .MuiStepLabel-label': { color: '#38368a' }
  },
  StepLabel: {
    color: 'red'
  },
  button: {
    marginRight: theme.spacing(1),
    border: '1px solid #b2b1c1'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

// function getSteps() {
//   return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
// }

function getSteps() {
  return [
    // 'Approve Checklist',
    'Upload Documents',
    'Make Payment',
    'Sign Retainer Agreement'
  ];
}
const createNewPost = async (category) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  userData.category = category;
  let newPost = await api.createPost({ ...userData });
  console.log(newPost, userData);
};
function getStepContent(step, category) {
  switch (step) {
    case 0: {
      return category === 'NewVisit' ? (
        <UploadNewVisitDocs />
      ) : category === 'ExtendVisit' ? (
        <UploadExtendVisitDocs />
      ) : category === 'NewStudy' ? (
        <UploadNewStudyDocs />
      ) : category === 'ExtendStudy' ? (
        <UploadExtendStudyDocs />
      ) : category === 'ExtendWork' ? (
        <UploadExtendWorkDocs />
      ) : category === 'PGWP' ? (
        <UploadPGWPDocs />
      ) : category === 'Spousal' ? (
        <UploadSpousalDocs />
      ) : category === 'CEC' ? (
        <UploadCECDocs />
      ) : category === 'PNP' ? (
        <UploadPNPDocs />
      ) : category === 'FSW' ? (
        <UploadFSWDocs />
      ) : (
        <></>
      );
    }
    case 1:
      return <SquarePayment category={category} />;

    case 2:
      return <PDFViewer />;
    // case 1:
    //   // createNewPost(category);
    //   return (
    //     <Paper>
    //       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    //         {[0, 1, 2, 3].map((value) => {
    //           const labelId = `checkbox-list-label-${value}`;

    //           return (
    //             <ListItem
    //               key={value}
    //               secondaryAction={
    //                 <IconButton edge="end" aria-label="comments">
    //                   {/* <CommentIcon /> */}
    //                 </IconButton>
    //               }
    //               disablePadding
    //             >
    //               <ListItemButton
    //                 role={undefined}
    //                 //    onClick={handleToggle(value)}
    //                 dense
    //               >
    //                 <ListItemIcon>
    //                   <Checkbox
    //                     edge="start"
    //                     // checked={checked.indexOf(value) !== -1}
    //                     tabIndex={-1}
    //                     disableRipple
    //                     inputProps={{ 'aria-labelledby': labelId }}
    //                   />
    //                 </ListItemIcon>
    //                 <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
    //               </ListItemButton>
    //             </ListItem>
    //           );
    //         })}
    //       </List>
    //     </Paper>
    //   );
    // // case 4:
    // //   return <TermCondition />;

    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper({ category }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  localStorage.setItem('fileCategory', category);
  const [postData, setPostData] = useState({
    clientName: user?.name,
    category: category,
    emailSent: true,
    fileStatus: 'VerifyDocs',
    uploadedToOneDrive: false,
    isRetained: null,
    assignee: ''
  });
  const fetchDataAction = async () => {
    let userData = await api.getPost(user.result);
    if (userData && userData.data.length) {
      if (userData.data[0].retainerFile) {
        postData.isRetained = true;
      }
      postData.assignee =
        postData.category === 'Spousal' ||
        postData.category === 'CEC' ||
        postData.category === 'PNP' ||
        postData.category === 'FSW' ||
        postData.category === 'CECPNP'
          ? 'Monish'
          : postData.category === 'NewVisit' ||
            postData.category === 'ExtendVisit' ||
            postData.category === 'NewStudy' ||
            postData.category === 'ExtendStudy' ||
            postData.category === 'ExtendWork' ||
            postData.category === 'PGWP'
          ? 'Bishan'
          : '';
      localStorage.removeItem('payment');
      let updatePost = await api.updatePost(userData.data[0]._id, {
        ...postData,
        name: user?.result
      });
    }
  };
  const classes = useStyles();
  const [paymentNotDone, setPaymentNotDone] = React.useState(true);
  const [enable, setEnable] = useState(localStorage.getItem('enableBtn'));
  setInterval(() => {
    if (localStorage.getItem('payment')) {
      setPaymentNotDone(false);
      clearInterval();
      localStorage.removeItem('payment');
    }
  }, 1000);
  setInterval(() => {
    if (localStorage.getItem('enableBtn')) {
      setEnable(true);
      clearInterval();
      localStorage.removeItem('enableBtn');
    }
  }, 1000);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      fetchDataAction();
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper className={classes.root} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel className={classes.StepLabel} {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            {/* <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography> */}
            <Success />
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, category)}
            </Typography>
            <div style={{ margin: 20 }}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                // disabled={(activeStep === 1 && paymentNotDone) || !enable}
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
