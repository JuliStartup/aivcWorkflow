import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as api from '../../../api/index.js';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorBlock, setErrorBlock] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const goToRoute = (email) => {
    // result.includes('aivc.ca') ? history('/dashboard/app') : history('/programs');
    switch (email) {
      case 'office@aivc.ca':
        history('/dashboard/casePR');
        break;
      case 'bishan@aivc.ca':
        history('/dashboard/caseStudy');
        break;
      case 'juli@aivc.ca':
        history('/dashboard/caseStudy');
        break;
      default:
        goToClientRoute(email);
    }
  };
  const setRole = (email) => {
    let admin = email.toLocaleLowerCase().includes('robin');
    let bishan = email.toLocaleLowerCase().includes('juli');
    let monish = email.toLocaleLowerCase().includes('office');
    let dev = email.toLocaleLowerCase().includes('bishan');
    let loggedInUserRole = admin
      ? 'admin'
      : bishan
      ? 'bishan'
      : monish
      ? 'monish'
        ? dev
        : 'dev'
      : '';
    localStorage.setItem('role', loggedInUserRole);
  };
  const goToClientRoute = async (email) => {
    let userData = await api.getPost(email);
    // userData.data[0]['retainerFile'] = null;
    if (!userData.data.length) {
      history('/programs');
    } else if (userData.data.length) {
      console.log(userData.data);
      if (userData.data[0].paid && userData.data[0]['retainerFile']) {
        history('/applications');
      } else {
        history('/pending-documents');
        // let path = getCategoryRoutePath(userData.data[0].category);
        // if (path) history(`/${path}`);
      }
    }
  };
  const history = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
      // remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      try {
        let userData = await api.signIn(values);
        setErrorBlock(false);
        const name = userData?.data?.result.name;
        const result = userData?.data?.result.email;
        const token = userData?.data?.token;
        localStorage.setItem('profile', JSON.stringify({ name, result, token }));
        goToRoute(result);
        setRole(result);
      } catch (error) {
        console.log(error);
        setErrorBlock(true);
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errorBlock && (
            <Typography variant="subtitle1" color="#f23641">
              Please check your credentials and login again !
            </Typography>
          )}
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}

          {/* <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
