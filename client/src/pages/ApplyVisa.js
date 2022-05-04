import { CardHeader, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HorizontalLinearStepper from 'src/components/StepForm/StepsPages';
import './Stepper.scss';
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
export default function ApplyVisa({ title, category }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    // let notes1 = dispatch(createPost({ ...postData }));
    console.log(event);
    // if (notes1) {
    //   // handleClickEvent();
    // }
  };
  let history = useNavigate();
  const goToPreviousPath = (e) => {
    e.preventDefault();
    history(-1);
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
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
    <>
      <CardHeader className="main-card-header" title={title} />{' '}
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <HorizontalLinearStepper category={category} />
        </Paper>
      </Container>
    </>
  );
}
