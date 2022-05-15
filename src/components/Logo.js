import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  // return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
  return <Box component="img" src="/static/sally-logo.png" sx={{ width: 155, height: 40, ...sx }} style={{ marginLeft: "40px" }} />;
}
