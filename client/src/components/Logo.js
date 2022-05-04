import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Logo.css';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <Link to="/" className="login-logo">
      AIVC
      <Box
        component="img"
        src="/static/AIVC-logos_transparent.png"
        sx={{ width: 40, height: 40 }}
      />
      {/* <i className="fab fa-typo3" /> */}
    </Link>
  );
}
