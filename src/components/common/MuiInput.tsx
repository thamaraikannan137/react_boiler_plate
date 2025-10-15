import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

/**
 * Custom MUI TextField wrapper with default props
 * Extends all MUI TextField props
 */
export const MuiInput = (props: TextFieldProps) => {
  return <TextField variant="outlined" fullWidth {...props} />;
};

export default MuiInput;

