import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

/**
 * Custom MUI Button wrapper with default props
 * Extends all MUI Button props
 */
export const MuiButton = (props: ButtonProps) => {
  return <Button variant="contained" {...props} />;
};

export default MuiButton;

