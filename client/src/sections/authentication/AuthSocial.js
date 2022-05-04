import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const history = useNavigate();
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    localStorage.setItem('profile', JSON.stringify({ result, token }));
    console.log(res);
    result?.email.includes('aivc.ca') ? history('/dashboard/app') : history('/programs');
  };
  const googleFailure = (err) => {
    console.log(err);
    console.log('Google Sign In was unsuccessful. Try again later!');
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <GoogleLogin
          clientId="369115953995-4eattc1aohjleeiblbubdc7fnf2d43ac.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              size="large"
              color="inherit"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Iconify icon="eva:google-fill" color="#DF3E30" height={24} />}
              variant="contained"
            >
              Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:facebook-fill" color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" height={24} />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
